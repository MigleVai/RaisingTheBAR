using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace RaisingTheBAR.BLL.Controllers
{
    [Produces("application/json")]
    [Route("api/Cart")]
    public class CartController : Controller
    {
        private readonly DbContext _dbContext;
        public CartController(DbContext dbContext)
        {
            _dbContext = dbContext;
        }
    }
}