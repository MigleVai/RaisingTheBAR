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

            var products = productContext.Where(x => x.IsEnabled).Where(x => x.IsFeatured).Take(5)
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

            var products = productContext.Where(x => x.IsEnabled)
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
                .Where(x => x.Product.IsEnabled)
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
        [Authorize(Roles = "administrator")]
        [HttpPost("[Action]")]
        [ProducesResponseType(200)]
        [ProducesResponseType(typeof(string), 400)]
        [ProducesResponseType(401)]
        [ProducesResponseType(403)]
        public IActionResult AddProduct([FromBody]ProductAddRequest request)
        {
            if (request == null)
            {
                return BadRequest();
            }
            if (request.Price < 0.01M || request.DiscountedPrice < 0)
            {
                return BadRequest("Bad price entered");
            }
            var product = new Product()
            {
                Description = request.Description,
                DisplayName = request.DisplayName,
                DiscountedPrice = request.DiscountedPrice,
                Price = request.Price,
                IsFeatured = request.IsFeatured,
                IsEnabled = request.IsEnabled
            };

            var productContext = _dbContext.Set<Product>();
            var imageList = new List<Image>();

            if (!string.IsNullOrEmpty(request.Thumbnail))
            {
                var thumbnail = new Image()
                {
                    Product = product,
                    ImageBase64 = request.Thumbnail,
                    Type = ImageTypeEnum.Thumbnail
                };
                imageList.Add(thumbnail);
            }
            if (request.Images.Count == 1)
            {
                var image = new Image()
                {
                    Product = product,
                    ImageBase64 = request.Images.FirstOrDefault(),
                    Type = ImageTypeEnum.MainImage
                };
                imageList.Add(image);
            }
            else if (request.Images.Count > 1)
            {
                var mainImage = new Image()
                {
                    Product = product,
                    ImageBase64 = request.Images.FirstOrDefault(),
                    Type = ImageTypeEnum.MainImage
                };
                imageList.Add(mainImage);
                request.Images.Remove(request.Images.FirstOrDefault());
                foreach (var tempImage in request.Images)
                {
                    var image = new Image()
                    {
                        Product = product,
                        ImageBase64 = tempImage,
                        Type = ImageTypeEnum.OtherImage
                    };
                    imageList.Add(image);
                }
            }

            product.Images = imageList;

            productContext.Add(product);

            var result = _dbContext.SaveChanges();

            if (result > 0)
            {
                product.Images = null;
                return Ok(product);
            }

            return BadRequest("Nothing changed in database");
        }

        [Authorize(Roles = "administrator")]
        [HttpPost("[Action]")]
        [ProducesResponseType(200)]
        [ProducesResponseType(typeof(string), 400)]
        [ProducesResponseType(401)]
        [ProducesResponseType(403)]
        [ProducesResponseType(typeof(List<ConcurrencyConflictResponse>), 409)]
        public IActionResult EditProduct([FromBody]ProductEditRequest request)
        {
            if (request == null)
            {
                return BadRequest();
            }
            if (request.Price < 0.01M || request.DiscountedPrice < 0)
            {
                return BadRequest("Bad price entered");
            }
            var product = new Product()
            {
                Description = request.Description,
                DisplayName = request.DisplayName,
                Id = Guid.Parse(request.Id),
                Price = request.Price,
                Timestamp = request.Timestamp,
                DiscountedPrice = request.DiscountedPrice,
                IsFeatured = request.IsFeatured,
                IsEnabled = request.IsEnabled
            };
            var imageContext = _dbContext.Set<Image>();
            var images = imageContext.Where(x => x.ProductId == product.Id);

            if (request.Images != null && request.Images.Any())
            {
                imageContext.RemoveRange(images.Where(x => x.Type != ImageTypeEnum.Thumbnail));
                if (!string.Equals(request.Images.First(), "delete", StringComparison.InvariantCultureIgnoreCase))
                {
                    var mainImage = new Image()
                    {
                        Product = product,
                        ProductId = product.Id,
                        ImageBase64 = request.Images.FirstOrDefault(),
                        Type = ImageTypeEnum.MainImage
                    };
                    imageContext.Add(mainImage);
                    request.Images.Remove(request.Images.FirstOrDefault());

                    foreach (var requestImage in request.Images)
                    {
                        imageContext.Add(new Image()
                        {
                            Product = product,
                            ProductId = product.Id,
                            ImageBase64 = requestImage,
                            Type = ImageTypeEnum.OtherImage
                        });
                    }
                }
            }

            if (!string.IsNullOrEmpty(request.Thumbnail))
            {
                var thumbnail = images.FirstOrDefault(x => x.Type == ImageTypeEnum.Thumbnail);

                if (string.Equals(request.Thumbnail, "delete", StringComparison.InvariantCultureIgnoreCase))
                {
                    if (thumbnail != null)
                    {
                        imageContext.Remove(thumbnail);
                    }
                }
                else
                {
                    if (thumbnail == null)
                    {
                        imageContext.Add(new Image()
                        {
                            Product = product,
                            ProductId = product.Id,
                            ImageBase64 = request.Thumbnail,
                            Type = ImageTypeEnum.Thumbnail
                        });
                    }
                    else
                    {
                        thumbnail.ImageBase64 = request.Thumbnail;
                    }
                }
            }

            var productAndPcContext = _dbContext.Set<ProductCart>();
            if (product.IsEnabled == false)
            {
                var pc = productAndPcContext.Where(x =>
                    string.Equals(x.ProductId.ToString(), request.Id, StringComparison.InvariantCultureIgnoreCase));
                if (pc.Any())
                {
                    _dbContext.RemoveRange(pc);
                }
            }

            var productContext = _dbContext.Set<Product>();

            try
            {
                productContext.Update(product);

                var result = _dbContext.SaveChanges();

                if (result > 0)
                {
                    product.Images = null;
                    return Ok(product);
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