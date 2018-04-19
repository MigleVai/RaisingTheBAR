using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RaisingTheBAR.BLL.Models.RequestModels;
using RaisingTheBAR.BLL.Models.ResponseModels;
using RaisingTheBAR.Core.Models;

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

        [Authorize]
        [HttpPost("[action]")]
        public IActionResult AddTemporaryCartToDatabase([FromBody] List<ProductToCartRequest> request)
        {
            var userContext = _dbContext.Set<User>()
                .Include(x => x.Cart)
                .Include(x => x.Cart.ProductCarts);

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

            if (user.Cart == null)
            {
                user.Cart = new Cart {ProductCarts = new List<ProductCart>()};
                foreach (var product in request)
                {
                    user.Cart.ProductCarts.Add(new ProductCart()
                    {
                        Amount = product.Amount,
                        ProductId = Guid.Parse(product.Id),
                        Cart = user.Cart
                    });
                }
            }
            else
            {
                if (user.Cart.ProductCarts.Any())
                {
                    foreach (var product in request)
                    {
                        var productCart =
                            user.Cart.ProductCarts.FirstOrDefault(x => x.ProductId == Guid.Parse(product.Id));
                        if (productCart == null)
                        {
                            user.Cart.ProductCarts.Add(new ProductCart()
                            {
                                Amount = product.Amount,
                                ProductId = Guid.Parse(product.Id),
                                Cart = user.Cart
                            });
                        }
                        else
                        {
                            productCart.Amount += product.Amount;
                        }
                    }
                }
                else
                {
                    foreach (var product in request)
                    {
                        user.Cart.ProductCarts.Add(new ProductCart()
                        {
                            Amount = product.Amount,
                            ProductId = Guid.Parse(product.Id),
                            Cart = user.Cart
                        });
                    }
                }
            }

            var result = _dbContext.SaveChanges();

            if (result > 0)
            {
                return Ok();
            }

            return BadRequest("Nothing changed");
        }

        [Authorize]
        [HttpPost("[action]")]
        public IActionResult AddProductToCart([FromBody] ProductToCartRequest request)
        {
            var userContext = _dbContext.Set<User>()
                .Include(x => x.Cart)
                .Include(x => x.Cart.ProductCarts);

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

            if (user.Cart == null)
            {
                user.Cart = new Cart {ProductCarts = new List<ProductCart>()};
                user.Cart.ProductCarts.Add(new ProductCart()
                {
                    Amount = request.Amount,
                    ProductId = Guid.Parse(request.Id),
                    Cart = user.Cart
                });
            }
            else
            {
                if (user.Cart.ProductCarts.Any())
                {
                    var productCart = user.Cart.ProductCarts.FirstOrDefault(x => x.ProductId == Guid.Parse(request.Id));
                    if (productCart == null)
                    {
                        user.Cart.ProductCarts.Add(new ProductCart()
                        {
                            Amount = request.Amount,
                            ProductId = Guid.Parse(request.Id),
                            Cart = user.Cart
                        });
                    }
                    else
                    {
                        productCart.Amount += request.Amount;
                    }
                }

                else
                {

                    user.Cart.ProductCarts.Add(new ProductCart()
                    {
                        Amount = request.Amount,
                        ProductId = Guid.Parse(request.Id),
                        Cart = user.Cart
                    });
                }
            }

            var result = _dbContext.SaveChanges();

            if (result > 0)
            {
                return Ok();
            }

            return BadRequest("Nothing changed");
        }

        [Authorize]
        [HttpPost("[action]")]
        public IActionResult EditProduct([FromBody]ProductToCartRequest request)
        {
            var userContext = _dbContext.Set<User>()
                .Include(x => x.Cart)
                .Include(x => x.Cart.ProductCarts);

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

            var productCart = user.Cart.ProductCarts.FirstOrDefault(x => x.ProductId == Guid.Parse(request.Id));

            if (productCart == null)
            {
                return BadRequest("No such product in cart");
            }

            if (request.Amount < 1)
            {
                _dbContext.Remove(productCart);
            }
            else
            {
                productCart.Amount = request.Amount;
            }

            var result = _dbContext.SaveChanges();

            if (result > 0)
            {
                return Ok();
            }

            return BadRequest("Nothing changed");
        }

        [Authorize]
        [HttpPost("[action]")]
        public IActionResult EmptyCart()
        {
            var userContext = _dbContext.Set<User>()
                .Include(x => x.Cart)
                .Include(x => x.Cart.ProductCarts);

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

            var productCarts = user.Cart.ProductCarts;
            if (!productCarts.Any())
            {
                return BadRequest("Cart is already empty");
            }
            
            _dbContext.RemoveRange(productCarts);

            var result = _dbContext.SaveChanges();

            if (result > 0)
            {
                return Ok();
            }

            return BadRequest("Nothing changed");
        }

        [Authorize]
        [HttpGet("[action]")]
        public IActionResult GetCart()
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

            var products = user.Cart.ProductCarts.Select(x => new CartProduct
            {
                Name = x.Product.DisplayName,
                Amount = x.Amount,
                ProductId = x.ProductId.ToString(),
                Price = x.Product.Price,
                Total = x.Product.Price * x.Amount
            }).ToList();

            var cart = new CartResponse()
            {
                Products = products,
                CompletePrice = products.Sum(y=>y.Total) 
            };

            return Ok(cart);
        }

        [Authorize]
        [HttpGet("[action]")]
        public IActionResult GetProductAmountInCart()
        {
            var userContext = _dbContext.Set<User>()
                .Include(x => x.Cart)
                .Include(x => x.Cart.ProductCarts);

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

            var amount = user.Cart.ProductCarts.Count();

            return Ok(amount);
        }
    }
}