using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Konscious.Security.Cryptography;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using RaisingTheBAR.BLL.Models.RequestModels;
using RaisingTheBAR.Core.Models;

namespace RaisingTheBAR.BLL.Controllers
{
    [Produces("application/json")]
    [Route("api/User")]
    public class UserController : Controller
    {
        public IConfiguration Configuration { get; }
        private readonly DbContext _dbContext;

        public UserController(IConfiguration configuration, DbContext dbContext)
        {
            Configuration = configuration;
            _dbContext = dbContext;
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("[action]")]
        public IActionResult RequestToken([FromBody]TokenRequest request)
        {
            var userContext = _dbContext.Set<User>().Include("Roles");
            var user = userContext.FirstOrDefault(x => x.Email == request.Email);

            if (user == null)
            {
                BadRequest("No user found with this E-mail");
            }

            string hashedString = GenerateHash(request.Password, user.Id);

            if (request.Password == hashedString && user.Role.RoleName == request.Role)
            {
                var token = GenerateToken(request.Email, request.Role);

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token)
                });
            }

            return BadRequest("Could not verify username and password");
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("[action]")]
        public IActionResult RegisterUser([FromBody]RegistrationRequest request)
        {
            var userContext = _dbContext.Set<User>();
            var roleContext = _dbContext.Set<Role>();

            var user = userContext.FirstOrDefault(x => x.Email == request.Email);

            if (user != null)
            {
                BadRequest("User with this E-mail already exists");
            }
            var id = Guid.NewGuid();

            var role = roleContext.FirstOrDefault(x => x.RoleName == request.Role);

            string hashedString = GenerateHash(request.Password, id);

            var newUser = new User
            {
                Id = id,
                Email = request.Email,
                Role = role,
                RoleId = role.Id,
                Password = hashedString
            };

            userContext.Add(user);
            var result = _dbContext.SaveChanges();

            if (result <= 0)
            {
                return BadRequest("Something went bad in the DB");
            }

            var token = GenerateToken(request.Email, request.Role);

            return Ok(new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token)
            });
        }

        [Authorize]
        [HttpPost]
        public IActionResult UpdateUserData([FromBody]ChangeUserRequest request)
        {
            var userContext = _dbContext.Set<User>();

            var userEmail = User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Name)?.Value;

            if (userEmail == null)
            {
                return BadRequest("Your session has ended please try to login again");
            }

            var user = userContext.FirstOrDefault(x => x.Email == userEmail);

            if(user == null)
            {
                return BadRequest("Your session has ended");
            }

            user.FirstName = request.FirstName;
            user.LastName = request.LastName;

            var result = _dbContext.SaveChanges();

            if(result > 0)
            {
                return Ok();
            }

            return BadRequest("Nothing changed");
        }
        [Authorize]
        [HttpPost]
        public IActionResult ChangePassword([FromBody]PasswordChangeRequest request)
        {
            var userContext = _dbContext.Set<User>();
            var userEmail = User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Name)?.Value;

            if(userEmail == null)
            {
                return BadRequest("Your session has expired");
            }

            var user = userContext.FirstOrDefault(x => x.Email == userEmail);
            var oldPassword = GenerateHash(request.OldPassword, user.Id);

            if(oldPassword != user.Password)
            {
                return BadRequest("Incorrect old password!");
            }

            var newPassword = GenerateHash(request.NewPassword, user.Id);

            user.Password = newPassword;

            var result = _dbContext.SaveChanges();

            if (result > 0)
            {
                return Ok();
            }
            return BadRequest("Nothing changed");
        }

        private static string GenerateHash(string password, Guid id)
        {
            var argon2 = new Argon2d(Encoding.UTF8.GetBytes(password))
            {
                DegreeOfParallelism = 8,
                MemorySize = 8192,
                Iterations = 20,
                Salt = Encoding.UTF8.GetBytes(id.ToString())
            };

            var hash = argon2.GetBytes(128);
            var hashedString = Convert.ToBase64String(hash);
            return hashedString;
        }

        private JwtSecurityToken GenerateToken(string email, string role)
        {
            var claims = new[]
            {
                    new Claim(ClaimTypes.Name, email),
                    new Claim(ClaimTypes.Role, role)
                };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["SecurityKey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: "RaiseTheBAR",
                audience: "RaiseTheBAR",
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: creds);

            return token;
        }

    }
}