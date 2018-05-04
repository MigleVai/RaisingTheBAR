using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using RaisingTheBAR.BLL.Models.RequestModels;
using RaisingTheBAR.BLL.Services;
using RaisingTheBAR.Core.Enums;
using RaisingTheBAR.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using RaisingTheBAR.BLL.Models.ResponseModels;

namespace RaisingTheBAR.BLL.Controllers
{
    [Produces("application/json")]
    [Route("api/Order")]
    public class OrderController : Controller
    {
        public IConfiguration Configuration { get; }

        private readonly DbContext _dbContext;
        public OrderController(IConfiguration configuration, DbContext dbContext)
        {
            Configuration = configuration;
            _dbContext = dbContext;
        }

        [Authorize]
        [HttpPost("[action]")]
        public IActionResult FinishOrder([FromBody]OrderRequest request)
        {
            var userContext = _dbContext.Set<User>()
                .Include(x => x.Cart)
                .Include(x => x.Cart.ProductCarts)
                .ThenInclude(pc => pc.Product);

            var userEmail = User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Name)?.Value;

            if (userEmail == null)
            {
                return BadRequest("Your session has ended please try to login again");
            }

            var user = userContext.FirstOrDefault(x => x.Email == userEmail);

            if (user == null)
            {
                return BadRequest("Your session has ended");
            }

            if (user.Cart == null || !user.Cart.ProductCarts.Any())
            {
                return BadRequest("Cart is empty");
            }

            var amountToPay = Math.Round(user.Cart.ProductCarts.Sum(y => y.Product.Price * y.Amount) * 100);

            //Get this error in PaymentService later
            if (amountToPay > 999999)
            {
                return BadRequest("You don't have enough funds in your bank");
            }
            var credentials = new PaymentServiceCredentials()
            {
                UserName = Configuration["PaymentServiceUserName"],
                Password = Configuration["PaymentServicePassword"]
            };

            var paymentData = new PaymentServiceRequest()
            {
                amount = Convert.ToInt32(amountToPay),
                holder = request.PaymentRequest.Holder,
                cvv = request.PaymentRequest.Cvv,
                exp_month = request.PaymentRequest.ExpMonth,
                exp_year = request.PaymentRequest.ExpYear,
                number = request.PaymentRequest.Number
            };

            var paymentResult = PaymentService.ExecutePayment(paymentData, credentials);
            if (!paymentResult)
            {
                return BadRequest("Your Payment was cancelled please check your data");
            }

            var newOrder = new Order()
            {
                UserId = user.Id,
                Address = request.Address,
                StartedDate = DateTimeOffset.Now,
                State = OrderStateEnum.Ordered,
                FirstName = request.FirstName,
                LastName = request.LastName,
                ProductOrders = user.Cart.ProductCarts.Select(x => new ProductOrder()
                {
                    Amount = x.Amount,
                    ProductId = x.ProductId,
                    SinglePrice = x.Product.DiscountedPrice == 0 ? x.Product.Price : x.Product.DiscountedPrice
                }).ToList()
            };

            _dbContext.Add(newOrder);
            _dbContext.Remove(user.Cart);

            var result = _dbContext.SaveChanges();

            if (result > 0)
            {
                return Ok("Payment successful, thank you for your patronage!");
            }

            return BadRequest("Nothing changed");
        }

        [Authorize(Roles = "Administrator")]
        [HttpPost("[action]")]
        [ProducesResponseType(200)]
        [ProducesResponseType(typeof(string), 400)]
        [ProducesResponseType(401)]
        [ProducesResponseType(403)]
        public IActionResult EditOrder([FromBody]OrderChangeRequest request)
        {
            var parseResult = Enum.TryParse(request.OrderState, true, out OrderStateEnum orderState);
            if (parseResult == false)
            {
                return BadRequest("Bad OrderState supplied");
            }

            var orderContext = _dbContext.Set<Order>();

            var order = orderContext.FirstOrDefault(x => x.Id == Guid.Parse(request.OrderId));
            if (order == null)
            {
                return BadRequest("No such order");
            }

            order.State = orderState;

            order.LastModifiedDate = DateTimeOffset.Now;
            var user = _dbContext.Set<User>().FirstOrDefault(x => x.Email == User.Claims.FirstOrDefault(y => y.Type == ClaimTypes.Name).Value);
            order.ModifiedBy = user;
            order.ModifiedById = user?.Id;

            if (orderState == OrderStateEnum.Completed || orderState == OrderStateEnum.Rejected)
            {
                order.FinishedDate = DateTimeOffset.Now;
            }

            return Ok();
        }
        [Authorize]
        [HttpGet("[action]")]
        [ProducesResponseType(typeof(OrderResponse), 200)]
        [ProducesResponseType(typeof(string), 400)]
        [ProducesResponseType(401)]
        public IActionResult GetSingleOrder(string orderId)
        {
            var userContext = _dbContext.Set<User>()
                .Include(x => x.Orders)
                .ThenInclude(x => x.ProductOrders)
                .ThenInclude(x => x.Product)
                .ThenInclude(x => x.Images);

            var userEmail = User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Name)?.Value;

            if (userEmail == null)
            {
                return BadRequest("Your session has ended please try to login again");
            }

            var user = userContext.FirstOrDefault(x => x.Email == userEmail);

            if (user == null)
            {
                return BadRequest("Your session has ended");
            }

            var order = user.Orders.FirstOrDefault(x => x.Id == Guid.Parse(orderId));
            if (order == null)
            {
                return BadRequest("No such order");
            }

            var orderDisplay = new OrderResponse
            {
                StartedDate = order.StartedDate,
                OrderState = order.State.ToString(),
                TotalPrice = order.ProductOrders.Sum(y => y.Amount * y.SinglePrice),
                LastUpdateDate = order.LastModifiedDate,
                Products = order.ProductOrders.Select(x => new ProductListResponse()
                {
                    Price = x.SinglePrice,
                    Id = x.Product.Id.ToString(),
                    Image = x.Product.Images.FirstOrDefault(y => y.Type == ImageTypeEnum.Thumbnail).ImageBase64,
                    Name = x.Product.DisplayName,
                    Amount = x.Amount,
                    TotalPrice = x.SinglePrice * x.Amount
                }).ToList()
            };

            return Ok(orderDisplay);
        }
        [Authorize]
        [HttpGet("[action]")]
        [ProducesResponseType(typeof(IEnumerable<OrderListResponse>), 200)]
        [ProducesResponseType(typeof(string), 400)]
        [ProducesResponseType(401)]
        public IActionResult GetAllOrders()
        {
            var userContext = _dbContext.Set<User>()
                .Include(x => x.Orders)
                .ThenInclude(x => x.ProductOrders);

            var userEmail = User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Name)?.Value;

            if (userEmail == null)
            {
                return BadRequest("Your session has ended please try to login again");
            }

            var user = userContext.FirstOrDefault(x => x.Email == userEmail);

            if (user == null)
            {
                return BadRequest("Your session has ended");
            }

            var orders = user.Orders.Select(x => new OrderListResponse
            {
                StartedDate = x.StartedDate,
                OrderState = x.State.ToString(),
                OrderPrice = x.ProductOrders.Sum(y => y.Amount * y.SinglePrice),
                ProductAmount = x.ProductOrders.Count(),
                OrderId = x.Id
            });

            return Ok(orders);
        }
    }
}