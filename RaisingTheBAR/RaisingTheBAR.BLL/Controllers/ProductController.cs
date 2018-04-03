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
        DbContext _dbContext;
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
        public IActionResult GetProductsByCategories(string categoryId)
        {
            var pcContext = _dbContext.Set<ProductCategory>();

            var products = pcContext.Where(x => x.CategoryId == Guid.Parse(categoryId))
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

            var result =  new ProductResponse
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
                Price = request.Price
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
    }
}