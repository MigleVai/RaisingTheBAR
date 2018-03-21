using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RaisingTheBAR.Core.Models;

namespace RaisingTheBAR.BLL.Controllers
{
    
    [Route("api/[controller]")]
    public class ValuesController : Controller
    {
        DbContext _dbContext;
        public ValuesController(DbContext dbContext)
        {
            _dbContext = dbContext;
        }
        // GET api/values
        [HttpGet]
        public string Get()
        {
            var roles = _dbContext.Set<Role>();

            var role = roles.FirstOrDefault();

            if(role != null)
            {
                return role.RoleName;
            }
            else
            {
                return "Db is empty";
            }
        }
        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }
    }
}
