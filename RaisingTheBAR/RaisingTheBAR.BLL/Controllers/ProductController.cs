using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RaisingTheBAR.BLL.Models.RequestModels;
using RaisingTheBAR.BLL.Models.ResponseModels;
using RaisingTheBAR.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace RaisingTheBAR.BLL.Controllers
{
    [Produces("application/json")]
    [Route("api/Product")]
    public class ProductController : Controller
    {
        private readonly DbContext _dbContext;
        public ProductController(DbContext dbContext)
        {
            _dbContext = dbContext;
        }
        [HttpGet("[action]")]
        [ProducesResponseType(typeof(IEnumerable<ProductResponse>),200)]
        public IActionResult GetProducts()
        {
            var productContext = _dbContext.Set<Product>();

            var products = productContext
                .Select(y => new ProductResponse
                {
                    Featured = false,
                    Id = y.Id.ToString(),
                    Image = y.Thumbnail,
                    Name = y.DisplayName,
                    Price = y.Price,
                    Description = y.Description,
                    DiscountPrice = y.Discount != null ? y.Discount.DiscountedPrice : (decimal?)null
                })
                .ToList();

            return Ok(products);
        }

        [HttpGet("[action]")]
        [ProducesResponseType(typeof(IEnumerable<ProductResponse>), 200)]
        public IActionResult GetProductsByCategories(string categoryName)
        {
            var pcContext = _dbContext.Set<ProductCategory>()
                .Include(p => p.Product)
                .ThenInclude(prod => prod.Discount)
                .Include(c => c.Category)
                .Include(cc => cc.Category.ChildCategories);


            var products = pcContext.Where(x => x.Category.Name == categoryName || x.Category.ParentCategory.Name == categoryName)
                .Select(y => new ProductResponse
                {
                    Featured = false,
                    Id = y.Product.Id.ToString(),
                    Image = y.Product.Thumbnail,
                    Name = y.Product.DisplayName,
                    Price = y.Product.Price,
                    DiscountPrice = y.Product.Discount != null ? y.Product.Discount.DiscountedPrice : (decimal?)null
                })
                .ToList();

            return Ok(products);
        }
        [HttpGet("[action]")]
        [ProducesResponseType(typeof(ProductResponse), 200)]
        [ProducesResponseType(typeof(string),400)]
        public IActionResult GetProduct(string productId)
        {
            var productContext = _dbContext.Set<Product>().Include(x=>x.Discount);
            var product = productContext.FirstOrDefault(x => x.Id == Guid.Parse(productId));

            if (product == null)
            {
                return BadRequest("No such product exists");
            }

            var result = new ProductResponse
            {
                Featured = false,
                Id = product.Id.ToString(),
                Image = product.Image,
                Name = product.DisplayName,
                Price = product.Price,
                Description = product.Description,
                DiscountPrice = product.Discount?.DiscountedPrice
            };

            return Ok(result);
        }
        [Authorize(Roles = "Administrator")]
        [HttpPost("[Action]")]
        [ProducesResponseType(200)]
        [ProducesResponseType(typeof(string),400)]
        [ProducesResponseType(401)]
        public IActionResult AddProduct([FromBody]ProductAddRequest request)
        {
            var product = new Product()
            {
                Description = request.Description,
                DisplayName = request.DisplayName,
                Image = request.Image,
                Price = request.Price,
                Thumbnail = request.Thumbnail
            };

            var productContext = _dbContext.Set<Product>();

            if (request.DiscountPrice != null)
            {
                product.Discount.DiscountedPrice = (decimal)request.DiscountPrice;
            }

            productContext.Add(product);

            var result = _dbContext.SaveChanges();

            if (result > 0)
            {
                return Ok();
            }

            return BadRequest("Nothing changed in database");
        }

        [Authorize(Roles = "Administrator")]
        [HttpPost("[Action]")]
        [ProducesResponseType(200)]
        [ProducesResponseType(typeof(string),400)]
        [ProducesResponseType(401)]
        [ProducesResponseType(typeof(List<ConcurrencyConflictResponse>), 409)]
        public IActionResult EditProduct([FromBody]ProductEditRequest request)
        {
            var product = new Product()
            {
                Description = request.Description,
                DisplayName = request.DisplayName,
                Id = Guid.Parse(request.Id),
                Image = request.Image,
                Price = request.Price
            };
            if (request.DiscountPrice != null)
            {
                product.Discount.DiscountedPrice = (decimal)request.DiscountPrice;
            }
            else
            {
                product.Discount = null;
            }
            var productContext = _dbContext.Set<Product>();

            try
            {
                productContext.Update(product);

                var result = _dbContext.SaveChanges();

                if (result > 0)
                {
                    return Ok();
                }

                return BadRequest("Nothing changed in database");
            }
            catch (DbUpdateConcurrencyException ex)
            {
                foreach (var entry in ex.Entries)
                {
                    if (entry.Entity is Product)
                    {
                        var exception = new List<ConcurrencyConflictResponse>();

                        var proposedValues = entry.CurrentValues;
                        var databaseValues = entry.GetDatabaseValues();

                        foreach (var property in proposedValues.Properties)
                        {
                            var proposedValue = proposedValues[property];
                            var databaseValue = databaseValues[property];
                            if (proposedValue != databaseValue)
                            {
                                exception.Add(new ConcurrencyConflictResponse() { Property = property.Name, ProposedValue = proposedValue.ToString(), ActualValue = databaseValue.ToString() } );
                            }

                        }
                        // 409: Conflict - object has already changed from the current view - display smart
                        return StatusCode(409, exception);
                    }
                    else
                    {
                        return BadRequest("Don't know how to handle concurrency conflicts for " + entry.Metadata.Name);
                    }
                }
            }
            return BadRequest("Timeout");
        }
    }
}