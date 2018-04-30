using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RaisingTheBAR.BLL.Models.RequestModels;
using RaisingTheBAR.BLL.Models.ResponseModels;
using RaisingTheBAR.Core.Models;
using System.Collections.Generic;
using System.Linq;

namespace RaisingTheBAR.BLL.Controllers
{
    [Authorize(Roles = "administrator")]
    [Produces("application/json")]
    [Route("api/Administrator")]
    public class AdministratorController : Controller
    {
        private readonly DbContext _dbContext;
        public AdministratorController(DbContext dbContext)
        {
            _dbContext = dbContext;
        }
        [HttpPost]
        [ProducesResponseType(200)]
        [ProducesResponseType(typeof(string), 400)]
        [ProducesResponseType(401)]
        [ProducesResponseType(403)]
        public IActionResult ChangeBlock([FromBody]BlockRequest request)
        {
            var userContext = _dbContext.Set<User>();
            var user = userContext.FirstOrDefault(x => x.Email == request.Email);

            if (user == null)
            {
                return BadRequest($"User with email: {request.Email} not found");
            }

            if (user.Blocked == request.Blocked)
            {
                var str = user.Blocked ? "already Blocked" : "not Blocked";
                return BadRequest($"This user is { str }");
            }

            user.Blocked = request.Blocked;

            var result = _dbContext.SaveChanges();
            if (result > 0)
            {
                return Ok();
            }

            return BadRequest("Something wrong in db");
        }

        [HttpGet("[action]")]
        [ProducesResponseType(typeof(IEnumerable<UserResponse>), 200)]
        [ProducesResponseType(typeof(string), 400)]
        [ProducesResponseType(401)]
        [ProducesResponseType(403)]
        public IActionResult GetUsers()
        {
            var userContext = _dbContext.Set<User>().Include(x => x.Orders).ThenInclude(o => o.ProductOrders).ThenInclude(po => po.Product);

            var userResponses = userContext.Select(x => new UserResponse
            {
                FirstName = x.FirstName,
                LastName = x.LastName,
                Blocked = x.Blocked,
                Email = x.Email,
                Orders = x.Orders.Select(y => new OrderViewResponse
                {
                    Amount = y.ProductOrders.Count,
                    TotalPrice = y.ProductOrders.Sum(z => z.Amount * z.Product.Price),
                    OrderDate = y.StartedDate,
                    OrderState = y.State.ToString()
                }).ToList()
            });

            return Ok(userResponses);
        }

        [HttpGet("[action]")]
        [ProducesResponseType(typeof(IEnumerable<FullProductResponse>), 200)]
        [ProducesResponseType(typeof(string), 400)]
        [ProducesResponseType(401)]
        [ProducesResponseType(403)]
        public IActionResult GetProducts()
        {
            var productContext = _dbContext.Set<Product>().Include(x => x.Discount);

            var products = productContext.Select(x => new FullProductResponse()
            {
                DisplayName = x.DisplayName,
                Price = x.Price,
                Id = x.Id.ToString(),
                Description = x.Description,
                Image = x.Image,
                IsEnabled = x.IsEnabled,
                Thumbnail = x.Thumbnail,
                DiscountPrice = x.Discount != null ? x.Discount.DiscountedPrice : (decimal?)0,
                Timestamp = x.Timestamp
            });

            return Ok(products);
        }
    }
}