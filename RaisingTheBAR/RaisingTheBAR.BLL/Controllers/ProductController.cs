using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RaisingTheBAR.BLL.Models.RequestModels;
using RaisingTheBAR.BLL.Models.ResponseModels;
using RaisingTheBAR.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using RaisingTheBAR.Core.Enums;
using Microsoft.Extensions.Configuration;

namespace RaisingTheBAR.BLL.Controllers
{
    [Produces("application/json")]
    [Route("api/Product")]
    public class ProductController : Controller
    {
        private readonly DbContext _dbContext;
        private IConfiguration Configuration { get; }

        public ProductController(DbContext dbContext, IConfiguration configuration)
        {
            _dbContext = dbContext;
            Configuration = configuration;

        }
        [HttpGet("[action]")]
        [ProducesResponseType(typeof(IEnumerable<ProductResponse>), 200)]
        public IActionResult GetFeaturedProducts()
        {
            var productContext = _dbContext.Set<Product>().Include(x => x.Images);

            var products = productContext.Where(x => x.IsFeatured).Take(5)
                .Select(y => new ProductResponse
                {
                    Featured = false,
                    Id = y.Id.ToString(),
                    Images = new List<string>
                    {
                        y.Images.FirstOrDefault(x => x.Type == ImageTypeEnum.MainImage).ImageBase64 ?? Configuration["DefaultImage"]
                    },
                    Name = y.DisplayName,
                    Price = y.Price,
                    DiscountedPrice = y.DiscountedPrice
                }).ToList();

            return Ok(products);
        }
        [HttpGet("[action]")]
        [ProducesResponseType(typeof(IEnumerable<ProductResponse>), 200)]
        public IActionResult GetProducts()
        {
            var productContext = _dbContext.Set<Product>().Include(x => x.Images);

            var products = productContext
                .Select(y => new ProductResponse
                {
                    Featured = false,
                    Id = y.Id.ToString(),
                    Images = new List<string>
                    {
                        y.Images.FirstOrDefault(x => x.Type == ImageTypeEnum.Thumbnail).ImageBase64 ?? Configuration["DefaultThumbnail"]
                    },
                    Name = y.DisplayName,
                    Price = y.Price,
                    Description = y.Description,
                    DiscountedPrice = y.DiscountedPrice
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
                .ThenInclude(prod => prod.Images)
                .Include(c => c.Category)
                .Include(cc => cc.Category.ChildCategories);


            var products = pcContext.Where(x => x.Category.Name == categoryName || x.Category.ParentCategory.Name == categoryName)
                .Select(y => new ProductResponse
                {
                    Featured = false,
                    Id = y.Product.Id.ToString(),
                    Images = new List<string>()
                    {
                         y.Product.Images.FirstOrDefault(z => z.Type == ImageTypeEnum.Thumbnail).ImageBase64 ?? Configuration["DefaultThumbnail"]
                    },
                    Name = y.Product.DisplayName,
                    Price = y.Product.Price,
                    DiscountedPrice = y.Product.DiscountedPrice
                })
                .ToList();

            return Ok(products);
        }
        [HttpGet("[action]")]
        [ProducesResponseType(typeof(ProductResponse), 200)]
        [ProducesResponseType(typeof(string), 400)]
        public IActionResult GetProduct(string productId)
        {
            var productContext = _dbContext.Set<Product>().Include(x => x.Images);
            var product = productContext.FirstOrDefault(x => x.Id == Guid.Parse(productId));

            if (product == null)
            {
                return BadRequest("No such product exists");
            }
            var images = product.Images?.Where(x => x.Type != ImageTypeEnum.Thumbnail).OrderBy(x => x.Type).Select(x => x.ImageBase64).ToList();
            var result = new ProductResponse
            {
                Featured = false,
                Id = product.Id.ToString(),
                Images = images.Any() ? images : new List<string> { Configuration["DefaultImage"] },
                Name = product.DisplayName,
                Price = product.Price,
                Description = product.Description,
                DiscountedPrice = product.DiscountedPrice
            };

            return Ok(result);
        }
        [Authorize(Roles = "Administrator")]
        [HttpPost("[Action]")]
        [ProducesResponseType(200)]
        [ProducesResponseType(typeof(string), 400)]
        [ProducesResponseType(401)]
        [ProducesResponseType(403)]
        public IActionResult AddProduct([FromBody]ProductAddRequest request)
        {
            var product = new Product()
            {
                Description = request.Description,
                DisplayName = request.DisplayName,
                DiscountedPrice = request.DiscountedPrice,
                Price = request.Price,
                IsFeatured = request.IsFeatured
            };

            var productContext = _dbContext.Set<Product>();
            var thumbnail = new Image()
            {
                Product = product,
                ImageBase64 = request.Thumbnail,
                Type = ImageTypeEnum.Thumbnail
            };
            var mainimage = new Image()
            {
                Product = product,
                ImageBase64 = request.Image,
                Type = ImageTypeEnum.MainImage
            };
            product.Images = new List<Image>() { mainimage, thumbnail };

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
        [ProducesResponseType(typeof(string), 400)]
        [ProducesResponseType(401)]
        [ProducesResponseType(403)]
        [ProducesResponseType(typeof(List<ConcurrencyConflictResponse>), 409)]
        public IActionResult EditProduct([FromBody]ProductEditRequest request)
        {
            var product = new Product()
            {
                Description = request.Description,
                DisplayName = request.DisplayName,
                Id = Guid.Parse(request.Id),
                Price = request.Price,
                Timestamp = request.Timestamp,
                DiscountedPrice = request.DiscountedPrice,
                IsFeatured = request.IsFeatured
            };
            var imageContext = _dbContext.Set<Image>();
            var images = imageContext.Where(x => x.ProductId == product.Id);

            foreach (var image in images)
            {
                switch (image.Type)
                {
                    case ImageTypeEnum.Thumbnail:
                        image.ImageBase64 = request.Thumbnail;
                        break;
                    case ImageTypeEnum.MainImage:
                        image.ImageBase64 = request.Image;
                        break;
                    case ImageTypeEnum.OtherImage:
                        break;
                }
            }

            if (!images.Any(x => x.ImageBase64.Equals(request.Image)))
            {
                imageContext.Add(new Image()
                {
                    Product = product,
                    ProductId = product.Id,
                    ImageBase64 = request.Image,
                    Type = ImageTypeEnum.MainImage
                });
            }
            if (!images.Any(x => x.ImageBase64.Equals(request.Thumbnail)))
            {
                imageContext.Add(new Image()
                {
                    Product = product,
                    ProductId = product.Id,
                    ImageBase64 = request.Thumbnail,
                    Type = ImageTypeEnum.Thumbnail
                });
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
                                exception.Add(new ConcurrencyConflictResponse() { Property = property.Name, ProposedValue = proposedValue?.ToString(), ActualValue = databaseValue?.ToString() });
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
        [Authorize(Roles = "Administrator")]
        [HttpPost("[Action]")]
        [ProducesResponseType(200)]
        [ProducesResponseType(typeof(string), 400)]
        [ProducesResponseType(401)]
        [ProducesResponseType(403)]
        public IActionResult DeleteProduct([FromBody]string request)
        {

            var productContext = _dbContext.Set<Product>();

            var product = productContext.FirstOrDefault(x => string.Equals(x.Id.ToString(), request, StringComparison.InvariantCultureIgnoreCase));

            if(product == null)
            {
                return BadRequest("No such product exists");
            }

            productContext.Remove(product);

            var result = _dbContext.SaveChanges();

            if (result > 0)
            {
                return Ok();
            }

            return BadRequest("Nothing changed in database");
        }
    }
}