using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RaisingTheBAR.BLL.Models.RequestModels;
using RaisingTheBAR.BLL.Models.ResponseModels;
using RaisingTheBAR.Core.Models;

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
                    Price = y.Price
                })
                .ToList();

            return Ok(products);
        }

        [HttpGet("[action]")]
        public IActionResult GetProductsByCategories(string categoryName)
        {
            var pcContext = _dbContext.Set<ProductCategory>()
                .Include(p => p.Product)
                .Include(c => c.Category)
                .Include(cc => cc.Category.ChildCategories);

           // var id = Guid.Parse(categoryId);

           // var productCategories = pcContext.ToList();
            var products = pcContext.Where(x => x.Category.Name == categoryName || x.Category.ParentCategory.Name == categoryName)
                .Select(y => new ProductResponse
                {
                    Featured = false,
                    Id = y.Product.Id.ToString(),
                    Image = y.Product.Thumbnail,
                    Name = y.Product.DisplayName,
                    Price = y.Product.Price
                })
                .ToList();

            return Ok(products);
        }
        [HttpGet("[action]")]
        public IActionResult GetProduct(string productId)
        {
            var productContext = _dbContext.Set<Product>();
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
                Description = product.Description
            };

            return Ok(result);
        }
        [Authorize(Roles = "Administrator")]
        [HttpPost("[Action]")]
        public IActionResult AddProduct([FromBody]ProductAddRequest request)
        {
            var product = new Product()
            {
                Description = request.Description,
                DisplayName = request.DisplayName,
                Image = request.Image,
                Price = request.Price,
                Model = request.Model
            };

            var productContext = _dbContext.Set<Product>();

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
        public IActionResult EditProduct([FromBody]ProductEditRequest request)
        {
            var product = new Product()
            {
                Description = request.Description,
                DisplayName = request.DisplayName,
                Model = request.Model,
                Id = Guid.Parse(request.Id),
                Image = request.Image,
                Price = request.Price
            };

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
                        var exception = new List<object>();

                        var proposedValues = entry.CurrentValues;
                        var databaseValues = entry.GetDatabaseValues();

                        foreach (var property in proposedValues.Properties)
                        {
                            var proposedValue = proposedValues[property];
                            var databaseValue = databaseValues[property];
                            if (proposedValue != databaseValue)
                            {
                                exception.Add(new { property = new { proposed = proposedValue, actual = databaseValue } });
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