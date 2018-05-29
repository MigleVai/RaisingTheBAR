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
    [Route("api/Category")]
    public class CategoryController : Controller
    {
        private readonly DbContext _dbContext;
        public CategoryController(DbContext dbContext)
        {
            _dbContext = dbContext;
        }
        [Authorize(Roles = "administrator")]
        [HttpPost("[Action]")]
        [ProducesResponseType(200)]
        [ProducesResponseType(typeof(string), 400)]
        [ProducesResponseType(401)]
        [ProducesResponseType(403)]
        public IActionResult CreateCategory([FromBody]CreateCategoryRequest request)
        {
            var categoryContext = _dbContext.Set<Category>();
            if (categoryContext.FirstOrDefault(x => x.Name == request.Name) != null)
            {
                return BadRequest("Category with this name already exists");
            }
            if (!string.IsNullOrEmpty(request.ParentCategoryId))
            {
                var parent = categoryContext.FirstOrDefault(x => x.Id == Guid.Parse(request.ParentCategoryId));
                if (parent == null)
                {
                    return BadRequest("Parent category does not exist");
                }
                categoryContext.Add(new Category
                {
                    Name = request.Name,
                    ParentCategory = parent,
                    ParentCategoryId = parent.Id
                });
            }
            else
            {
                categoryContext.Add(new Category
                {
                    Name = request.Name,
                });
            }
            var result = _dbContext.SaveChanges();
            if (result > 0)
            {
                return Ok();
            }
            return BadRequest("Something went wrong with database");
        }
        [Authorize(Roles = "administrator")]
        [HttpPost("[Action]")]
        [ProducesResponseType(200)]
        [ProducesResponseType(typeof(string), 400)]
        [ProducesResponseType(401)]
        [ProducesResponseType(403)]
        public IActionResult AddProductToCategory([FromBody]ProductCategoryRequest request)
        {
            var productContext = _dbContext.Set<Product>().Include(x => x.ProductCategories);
            var categoryContext = _dbContext.Set<Category>()
                .Include(x => x.ParentCategory).ThenInclude(x => x.ProductCategories)
                .Include(x => x.ChildCategories).ThenInclude(x => x.ProductCategories);

            var product = productContext.FirstOrDefault(x => x.Id == Guid.Parse(request.ProductId));
            var category = categoryContext.FirstOrDefault(x => x.Id == Guid.Parse(request.CategoryId));

            if (product == null || category == null)
            {
                return BadRequest("Product or Category does not exist");
            }

            if (product.ProductCategories == null)
            {
                product.ProductCategories = new List<ProductCategory>();
            }

            if (product.ProductCategories.FirstOrDefault(x =>
                    x.CategoryId == category.Id && x.ProductId == product.Id) != null)
            {
                return BadRequest("This product is already in this category");
            }

            if (category.ParentCategory?.ProductCategories?.FirstOrDefault(x =>
                    x.CategoryId == category.Id && x.ProductId == product.Id) != null)
            {
                return BadRequest("This product is already in parent category");
            }
            if (category.ChildCategories?.Any(y => y.ProductCategories?.FirstOrDefault(x =>
                    x.CategoryId == category.Id && x.ProductId == product.Id) != null) == true)
            {
                return BadRequest("This product is already in child category");
            }
            var pcContext = _dbContext.Set<ProductCategory>();

            pcContext.Add(new ProductCategory()
            {
                CategoryId = Guid.Parse(request.CategoryId),
                ProductId = Guid.Parse(request.ProductId)
            });

            var result = _dbContext.SaveChanges();
            if (result == 0)
            {
                return BadRequest("Something went wrong with database");
            }

            return Ok();
        }
        [Authorize(Roles = "administrator")]
        [HttpPost("[Action]")]
        [ProducesResponseType(200)]
        [ProducesResponseType(typeof(string), 400)]
        [ProducesResponseType(401)]
        [ProducesResponseType(403)]
        public IActionResult RemoveProductFromCategory([FromBody]ProductCategoryRequest request)
        {
            var productContext = _dbContext.Set<Product>().Include(x => x.ProductCategories);
            var categoryContext = _dbContext.Set<Category>();

            var product = productContext.FirstOrDefault(x => x.Id == Guid.Parse(request.ProductId));
            var category = categoryContext.FirstOrDefault(x => x.Id == Guid.Parse(request.CategoryId));

            if (product == null || category == null)
            {
                return BadRequest("Product or Category does not exist");
            }
            var pc = product.ProductCategories?.FirstOrDefault(x => x.CategoryId == category.Id);
            if (product.ProductCategories == null || pc == null)
            {
                return BadRequest("Product is not in the category");
            }

            _dbContext.Remove(pc);

            var result = _dbContext.SaveChanges();

            if (result > 0)
            {
                return Ok();
            }
            return BadRequest("Something went wrong with database");
        }
        [Authorize(Roles = "administrator")]
        [HttpPost("[Action]")]
        [ProducesResponseType(200)]
        [ProducesResponseType(typeof(string), 400)]
        [ProducesResponseType(401)]
        [ProducesResponseType(403)]
        public IActionResult RemoveCategory([FromBody]RemoveCategoryRequest request)
        {
            var categoryContext = _dbContext.Set<Category>().Include(x=>x.ProductCategories).Include(x=>x.ChildCategories);
            var category = categoryContext.FirstOrDefault(x => x.Id == Guid.Parse(request.Id));

            if (category == null)
            {
                return BadRequest("Category doesnt exist");
            }
            if (category.ChildCategories.Any())
            {
                foreach (var child in category.ChildCategories)
                {
                    child.ParentCategoryId = null;
                }
            }
            _dbContext.Remove(category);

            var result = _dbContext.SaveChanges();

            if (result > 0)
            {
                return Ok();
            }
            return BadRequest("Something went wrong with database");
        }
        //[Authorize(Roles = "administrator")]
        [HttpGet("[Action]")]
        [ProducesResponseType(typeof(IEnumerable<CategoryResponse>), 200)]
        [ProducesResponseType(typeof(string), 400)]
        [ProducesResponseType(401)]
        [ProducesResponseType(403)]
        public IActionResult GetPossibleProductsForCategory(string categoryId)
        {
            var productContext = _dbContext.Set<Product>().Include(x => x.ProductCategories).ThenInclude(x => x.Category).ThenInclude(x=>x.ChildCategories);
            var id = Guid.Parse(categoryId);
            var products = productContext.Where(x => x.ProductCategories.Any(y => y.CategoryId == id 
                                                    || y.Category.ParentCategoryId == id 
                                                    || y.Category.ChildCategories.Any(z=>z.Id == id)) == false);

           
            return Ok(products.Select(x=> new { Name = x.DisplayName, Price = x.Price, Id = x.Id }));
        }
        [HttpGet("[Action]")]
        [ProducesResponseType(typeof(IEnumerable<CategoryResponse>), 200)]
        public IActionResult GetAllCategories()
        {
            var categoryContext = _dbContext.Set<Category>()
                .Include(x => x.ProductCategories)
                .Include(x => x.ChildCategories)
                .Include("ChildCategories.ProductCategories");
            var categories = categoryContext.Where(y => y.ParentCategoryId == null)
                .Select(x => new CategoryResponse
                {
                    Id = x.Id.ToString(),
                    Name = x.Name,
                    ProductAmount = x.ProductCategories.Count() + x.ChildCategories.Sum(z => z.ProductCategories.Count()),
                    Children = x.ChildCategories.Select(z => new CategoryResponse
                    {
                        Id = z.Id.ToString(),
                        Name = z.Name,
                        ProductAmount = z.ProductCategories.Count()
                    }).ToList()
                }).ToList();
            return Ok(categories);
        }

    }
}