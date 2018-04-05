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
        DbContext _dbContext;
        public CategoryController(DbContext dbContext)
        {
            _dbContext = dbContext;
        }
        [Authorize(Roles = "administrator")]
        [HttpPost("[Action]")]
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
        public IActionResult AddProductToCategory([FromBody]ProductCategoryRequest request)
        {
            var productContext = _dbContext.Set<Product>().Include(x=>x.ProductCategories);
            var categoryContext = _dbContext.Set<Category>();

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
            product.ProductCategories.Add(new ProductCategory
            {
                Category = category,
                CategoryId = category.Id,
                Product = product,
                ProductId = product.Id
            });
            var result = _dbContext.SaveChanges();
            if (result > 0)
            {
                return BadRequest("Something went wrong with database");
            }

            return Ok();
        }
        [Authorize(Roles = "administrator")]
        [HttpPost("[Action]")]
        public IActionResult RemoveProductFromCategory([FromBody]ProductCategoryRequest request)
        {
            var productContext = _dbContext.Set<Product>().Include(x=>x.ProductCategories);
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
        public IActionResult RemoveCategory([FromBody]RemoveCategoryRequest request)
        {
            var categoryContext = _dbContext.Set<Category>();
            var category = categoryContext.FirstOrDefault(x => x.Id == Guid.Parse(request.Id));

            if (category == null)
            {
                return BadRequest("Category doesnt exist");
            }

            _dbContext.Remove(category);
            var result = _dbContext.SaveChanges();

            if (result > 0)
            {
                return Ok();
            }
            return BadRequest("Something went wrong with database");
        }

        [HttpGet("[Action]")]
        public IActionResult GetAllCategories()
        {
            var categoryContext = _dbContext.Set<Category>()
                .Include(x=>x.ProductCategories)
                .Include(x=>x.ChildCategories)
                .Include("ChildCategories.ProductCategories");
            var categories = categoryContext.Where(y => y.ParentCategoryId == null)
                .Select(x => new CategoryResponse
                {
                    Id = x.Id.ToString(),
                    Name = x.Name,
                    ProductAmount = x.ProductCategories.Count() +  x.ChildCategories.Sum(z=>z.ProductCategories.Count()),
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