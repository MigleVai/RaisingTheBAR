using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RaisingTheBAR.BLL.Models.RequestModels;
using RaisingTheBAR.BLL.Models.ResponseModels;
using RaisingTheBAR.Core.Models;
using System.Collections.Generic;
using System.Linq;
using RaisingTheBAR.Core.Enums;
using System.IO;
using OfficeOpenXml;

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
        [HttpPost("[action]")]
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
            var userContext = _dbContext.Set<User>().Include(x => x.Orders).ThenInclude(o => o.ProductOrders);

            var userResponses = userContext.Select(x => new UserResponse
            {
                Blocked = x.Blocked,
                Email = x.Email,
                OrderCount = x.Orders != null ? x.Orders.Count() : 0,
                TotalCostOfOrders = x.Orders != null && x.Orders.Any(p=>p.ProductOrders.Any()) ? x.Orders.Sum(z => z.ProductOrders.Sum(y => y.Amount * y.SinglePrice)) : 0M,
                AverageCostOfOrders = x.Orders != null && x.Orders.Any(p => p.ProductOrders.Any()) ? x.Orders.Average(z => z.ProductOrders.Sum(y => y.Amount * y.SinglePrice)) : 0M
            });

            return Ok(userResponses);
        }
        [HttpGet("[action]")]
        [ProducesResponseType(typeof(IEnumerable<UserResponse>), 200)]
        [ProducesResponseType(typeof(string), 400)]
        [ProducesResponseType(401)]
        [ProducesResponseType(403)]
        public IActionResult GetOrders()
        {
            var orderContext = _dbContext.Set<Order>().Include(x=>x.ProductOrders).ThenInclude(o=>o.Product);

            var orderResponses = orderContext.OrderBy(x => x.State).Select(x => new OrderResponse
            {
                StartedDate = x.StartedDate,
                LastUpdateDate = x.LastModifiedDate,
                OrderState = x.State.ToString(),
                Products = x.ProductOrders.Select(z=> new ProductListResponse
                {
                    Id = z.ProductId.ToString(),
                    Amount = z.Amount,
                    Name = z.Product.DisplayName,
                    Price = z.SinglePrice,
                    TotalPrice = z.SinglePrice * z.Amount
                }).ToList(),
                TotalPrice = x.ProductOrders.Sum(z=>z.SinglePrice * z.Amount)
            });

            return Ok(orderResponses);
        }
        [HttpGet("[action]")]
        [ProducesResponseType(typeof(IEnumerable<FullProductResponse>), 200)]
        [ProducesResponseType(typeof(string), 400)]
        [ProducesResponseType(401)]
        [ProducesResponseType(403)]
        public IActionResult GetProducts()
        {
            var productContext = _dbContext.Set<Product>().Include(x => x.Images);

            var products = productContext.Select(x => new FullProductResponse()
            {
                DisplayName = x.DisplayName,
                Price = x.Price,
                Id = x.Id.ToString(),
                Description = x.Description,
                Image = x.Images.FirstOrDefault(y => y.Type == ImageTypeEnum.MainImage).ImageBase64,
                IsEnabled = x.IsEnabled,
                Thumbnail = x.Images.FirstOrDefault(y => y.Type == ImageTypeEnum.Thumbnail).ImageBase64,
                DiscountedPrice = x.DiscountedPrice,
                Timestamp = x.Timestamp,
                IsFeatured = x.IsFeatured
            });

            return Ok(products);
        }
        [HttpGet("[action]")]
        [ProducesResponseType(typeof(FileStreamResult), 200)]
        [ProducesResponseType(typeof(string), 400)]
        [ProducesResponseType(401)]
        [ProducesResponseType(403)]
        public IActionResult GenerateExcel()
        {
            var productContext = _dbContext.Set<Product>();

            var products = productContext.Select(x => new FullProductResponse()
            {
                DisplayName = x.DisplayName,
                Price = x.Price,
                Description = x.Description,
                IsEnabled = x.IsEnabled,
                DiscountedPrice = x.DiscountedPrice,
                IsFeatured = x.IsFeatured
            }).ToArray();
            using (var stream = new FileStream(@"temp.xlsx", FileMode.Create))
            {
                using (var ep = new ExcelPackage(stream))
                {
                    var ws = ep.Workbook.Worksheets.Add("Products");
                    ws.Column(1).Width = 50;
                    ws.Column(2).Width = 50;
                    ws.Column(3).Width = 20;
                    ws.Column(4).Width = 20;
                    ws.Column(5).Width = 20;
                    ws.Column(6).Width = 20;
                    ws.Cells[1, 1].Value = "Name";
                    ws.Cells[1, 2].Value = "Description";
                    ws.Cells[1, 3].Value = "Price";
                    ws.Cells[1, 4].Value = "Discounted Price";
                    ws.Cells[1, 5].Value = "Is it featured";
                    ws.Cells[1, 6].Value = "Is it enabled";

                    for (int i = 2; i < products.Length + 2; i++)
                    {
                        ws.Cells[i, 1].Value = products[i - 2].DisplayName;
                        ws.Cells[i, 2].Value = products[i - 2].Description;
                        ws.Cells[i, 3].Value = products[i - 2].Price;
                        ws.Cells[i, 4].Value = products[i - 2].DiscountedPrice;
                        ws.Cells[i, 5].Value = products[i - 2].IsFeatured;
                        ws.Cells[i, 6].Value = products[i - 2].IsEnabled;
                    }

                    ep.Save();
                }
            }
            var outputStream = new FileStream(@"temp.xlsx", FileMode.Open);
            return new FileStreamResult(outputStream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        }
    }
}