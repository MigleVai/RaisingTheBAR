using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using RaisingTheBAR.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RaisingTheBAR.DAL.Generation
{
    public static class Initial
    {
        public static IWebHost SeedData(this IWebHost host)
        {
            using (var scope = host.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                var context = services.GetService<DbContext>();
                if (context.Database.GetPendingMigrations().Any())
                {
                    context.Database.Migrate();
                }
                SeedRoles(context);
                //SeedUsers(context);
                SeedCategories(context);
                SeedProducts(context);
                SeedProductsToCategories(context);
            }
            return host;
        }
        private static void SeedRoles(DbContext context)
        {
            if (!context.Set<Role>().Any())
            {
                var roles = new List<Role>
                {
                    new Role(){ RoleName = "user" },
                    new Role(){ RoleName = "administrator" }
                };
                context.AddRange(roles);
                context.SaveChanges();
            }
        }
        //private static void SeedUsers(EFContext context)
        //{
        //    if (!context.Users.Any())
        //    {
        //        var users = new List<User>
        //        {
        //            new User(){ Email = "test", Password = "test",
        //                        RoleId = context.Roles.FirstOrDefault(x=>x.RoleName == "user").Id },
        //            new User(){ Email = "admin", Password = "admin",
        //                        RoleId = context.Roles.FirstOrDefault(x=>x.RoleName == "administrator").Id }
        //        };
        //        context.AddRange(users);
        //        context.SaveChanges();
        //    }
        //}
        private static void SeedCategories(DbContext context)
        {
            if (!context.Set<Category>().Any())
            {
                var id = Guid.NewGuid();
                var categories = new List<Category>
                {
                    new Category(){ Name = "Computers", Id = id},
                    new Category(){ Name = "Phones" },
                    new Category(){ Name = "Notebooks", ParentCategoryId = id},
                    new Category(){ Name = "Stacionary computers", ParentCategoryId = id}
                };
                context.AddRange(categories);
                context.SaveChanges();
            }
        }
        private static void SeedProducts(DbContext context)
        {
            if (!context.Set<Product>().Any())
            {
                var id = Guid.NewGuid();
                var products = new List<Product>
                {
                    new Product{ Description = "Best phone OMG!", DisplayName = "Samsung S9", Price = 850.00M},

                    new Product{Description = "Best laptop OMFG!", DisplayName = "Asus Aspire V Nitro", Price = 1199.99M},

                    new Product{Description = "Battlestation gaming pc", DisplayName = "RtB created battlestation", Price = 2000.00M},

                    new Product{Description = "Smatphone killer!", DisplayName = "OnePlus 6", Price = 645.50M}

                };
                context.AddRange(products);
                context.SaveChanges();
            }
        }
        private static void SeedProductsToCategories(DbContext context)
        {
            var productContext = context.Set<Product>().Include(x => x.ProductCategories);
            if (!productContext.FirstOrDefault(x => x.DisplayName == "Samsung S9").ProductCategories.Any())
            {

                var categories = context.Set<Category>();

                productContext.FirstOrDefault(x => x.DisplayName == "Samsung S9").ProductCategories = new List<ProductCategory>()
                {
                    new ProductCategory
                    {
                        CategoryId = categories.FirstOrDefault(x=>x.Name=="Phones").Id,
                        ProductId = productContext.FirstOrDefault(x=>x.DisplayName ==  "Samsung S9").Id
                    }
                };

                productContext.FirstOrDefault(x => x.DisplayName == "Asus Aspire V Nitro").ProductCategories = new List<ProductCategory>()
                {
                    new ProductCategory
                    {
                        CategoryId = categories.FirstOrDefault(x=>x.Name=="Notebooks").Id,
                        ProductId = productContext.FirstOrDefault(x=>x.DisplayName == "Asus Aspire V Nitro").Id
                    }
                };

                productContext.FirstOrDefault(x => x.DisplayName == "RtB created battlestation").ProductCategories = new List<ProductCategory>()
                {
                    new ProductCategory
                    {
                        CategoryId = categories.FirstOrDefault(x=>x.Name=="Stacionary computers").Id,
                        ProductId = productContext.FirstOrDefault(x=>x.DisplayName == "RtB created battlestation").Id
                    }
                };

                productContext.FirstOrDefault(x => x.DisplayName == "OnePlus 6").ProductCategories = new List<ProductCategory>()
                {
                    new ProductCategory
                    {
                        CategoryId = categories.FirstOrDefault(x=>x.Name=="Phones").Id,
                        ProductId = productContext.FirstOrDefault(x=>x.DisplayName == "OnePlus 6").Id
                    }
                };
                context.UpdateRange(productContext);
                context.SaveChanges();
            }
        }
    }
}
