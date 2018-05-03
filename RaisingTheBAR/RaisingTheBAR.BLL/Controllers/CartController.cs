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
        [ProducesResponseType(200)]
        [ProducesResponseType(typeof(string), 400)]
        [ProducesResponseType(401)]
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
                user.Cart = new Cart { ProductCarts = new List<ProductCart>() };
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
                return GetProductAmountInCart();
            }

            return BadRequest("Nothing changed");
        }

        [Authorize]
        [HttpPost("[action]")]
        [ProducesResponseType(typeof(int), 200)]
        [ProducesResponseType(typeof(string), 400)]
        [ProducesResponseType(401)]
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
                user.Cart = new Cart { ProductCarts = new List<ProductCart>() };
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
                return GetProductAmountInCart();
            }

            return BadRequest("Nothing changed");
        }

        [Authorize]
        [HttpPost("[action]")]
        [ProducesResponseType(typeof(CartResponse), 200)]
        [ProducesResponseType(typeof(string), 400)]
        [ProducesResponseType(401)]
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

            return result > 0 ? GetCart() : BadRequest("Nothing changed");
        }

        [Authorize]
        [HttpPost("[action]")]
        [ProducesResponseType(200)]
        [ProducesResponseType(typeof(string), 400)]
        [ProducesResponseType(401)]
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
        [ProducesResponseType(typeof(CartResponse), 200)]
        [ProducesResponseType(typeof(string), 400)]
        [ProducesResponseType(401)]
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
            if (user.Cart == null)
            {
                var emptyCart = new CartResponse()
                {
                    Products = new List<CartProduct>(),
                    CompletePrice = 0
                };
                return Ok(emptyCart);
            }
            var products = user.Cart.ProductCarts.Select(x => new CartProduct
            {
                Name = x.Product.DisplayName,
                Amount = x.Amount,
                ProductId = x.ProductId.ToString(),
                DiscountedPrice = x.Product.DiscountedPrice,
                Total = (x.Product.DiscountedPrice == 0 ? x.Product.Price : x.Product.DiscountedPrice) * x.Amount,
                Price = x.Product.Price
            }).ToList();

            var cart = new CartResponse()
            {
                Products = products,
                CompletePrice = products.Sum(y => y.Total)
            };

            return Ok(cart);
        }

        [Authorize]
        [HttpGet("[action]")]
        [ProducesResponseType(typeof(int), 200)]
        [ProducesResponseType(typeof(string), 400)]
        [ProducesResponseType(401)]
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
            if (user.Cart?.ProductCarts == null)
            {
                return Ok(0);
            }
            var amount = user.Cart.ProductCarts.Count();

            return Ok(amount);
        }
        [ProducesResponseType(typeof(CartResponse), 200)]
        [ProducesResponseType(typeof(string), 400)]
        [HttpPost("[action]")]
        public IActionResult GenerateCart([FromBody]List<ProductToCartRequest> request)
        {
            var productContext = _dbContext.Set<Product>();

            var products = new List<CartProduct>();
            foreach (var req in request)
            {
                var dbProduct = productContext.FirstOrDefault(x => string.Equals(x.Id.ToString(), req.Id, StringComparison.OrdinalIgnoreCase));

                if (dbProduct != null)
                {
                    products.Add(new CartProduct
                    {
                        Name = dbProduct.DisplayName,
                        Amount = req.Amount,
                        ProductId = dbProduct.Id.ToString(),
                        DiscountedPrice = dbProduct.DiscountedPrice,
                        Total = (dbProduct.DiscountedPrice == 0 ? dbProduct.Price : dbProduct.DiscountedPrice) * req.Amount,
                        Price = dbProduct.Price
                    });
                }
            }
            var cart = new CartResponse()
            {
                Products = products,
                CompletePrice = products.Sum(y => y.Total)
            };

            return Ok(cart);
        }
    }
}