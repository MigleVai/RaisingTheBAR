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
                var context = services.GetService<EFContext>();
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
        private static void SeedRoles(EFContext context)
        {
            if (!context.Roles.Any())
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
        private static void SeedCategories(EFContext context)
        {
            if (!context.Categories.Any())
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
        private static void SeedProducts(EFContext context)
        {
            if (!context.Products.Any())
            {
                var id = Guid.NewGuid();
                var products = new List<Product>
                {
                    new Product{Model = "I9500", Description = "Best phone OMG!", DisplayName = "Samsung S9", Price = 850.00M,
                        Image = "data:image/gif;base64,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",
                        Thumbnail = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAAQABAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/wgALCABAAEABASIA/8QAGQABAQEBAQEAAAAAAAAAAAAAAgABAwQG/9oACAEBAAAAAfoMFT3A9rmw6qEfP053oUOSKbnmbmljpVze4Knv/8QAHhAAAgICAwEBAAAAAAAAAAAAAAECEQMxEBIhIBP/2gAIAQEAAQUCNFtlFFtG+NCV/LVGx+y+l5JbyWdpNTcu3aY3Ix6e1vJPqv0YslyeV3GbMbck9vyRR1RSOqEkhey2J18t2a42U0Wy2U2a4//EACAQAAICAgICAwAAAAAAAAAAAAABESEQMSAyElFBQqH/2gAIAQEABj8CxR2Z2ZfCXxlYjnAxePs+y9FHzuR7m8IZWytiH+DksROdGjSKROIfGFwo6s6svP8A/8QAIxABAAIBAwQDAQEAAAAAAAAAAQARITFBURBhgZEgcdGhsf/aAAgBAQABPyGKC3SbJRyy+/gl9vJNks5IILG+igt0iL0nHxse05ggsmBsMvzyNjkmt7zDZmLBbKxre3X+QoyxTR5udlVZ9cSnTS8OIrebzys1veaXvGKlrbtGqqP09fscmAfyEE03V3zFIpYP+y+7w2ml7zA2OGVKGxFdQ+JcUiuKmjtaYmiB9EyNhgiAplj0vPxse14gAo6ICmbpZwzm8E4vJN0o4IAKOn//2gAIAQEAAAAQGCB+78c0ABj/xAAlEAEAAQMCBgMBAQAAAAAAAAABEQAhQTFxUWGBkcHRELHwIKH/2gAIAQEAAT8QpwoDLWC9Zenup/oA8VH9APisF6z29UYEHJ8OWgEtACv+W/8AKIV/y3oy0iSVyU7zjy/3yU7Tn3V+29grVwixZIWHk6VKJiQ16Cz/AFaK0IwwSMSHUA7VlJwUBjF+tl0vJRnTcgSGuQRwi4zepApcX2Aq3be41bvvcKuKSbFsJdO26VprLakVcS8JPRWkI5myMlO5RikLMroDkdbXw1GlW4XEcXEaUI1kBA1JwtX772GuSHaceqQswTpNDhCTSDpXEem4b0yMjIRXiAttUne9YCa5Kd5z6pyUiQ0gNfL+X/lEa+H8vRkoAg+HAiOGsF6z391F9gPmpvsA81gvWXr6owIBg+P/2Q=="},

                    new Product{Model = "VN7G5T", Description = "Best laptop OMFG!", DisplayName = "Asus Aspire V Nitro", Price = 1199.99M,
                        Image = "data:image/gif;base64,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",
                        Thumbnail = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAAQABAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/wgALCABAAEABASIA/8QAGQABAQEBAQEAAAAAAAAAAAAAAgABAwQG/9oACAEBAAAAAfoMFT3A9rmw6qEfP053oUOSKbnmbmljpVze4Knv/8QAHhAAAgICAwEBAAAAAAAAAAAAAAECEQMxEBIhIBP/2gAIAQEAAQUCNFtlFFtG+NCV/LVGx+y+l5JbyWdpNTcu3aY3Ix6e1vJPqv0YslyeV3GbMbck9vyRR1RSOqEkhey2J18t2a42U0Wy2U2a4//EACAQAAICAgICAwAAAAAAAAAAAAABESEQMSAyElFBQqH/2gAIAQEABj8CxR2Z2ZfCXxlYjnAxePs+y9FHzuR7m8IZWytiH+DksROdGjSKROIfGFwo6s6svP8A/8QAIxABAAIBAwQDAQEAAAAAAAAAAQARITFBURBhgZEgcdGhsf/aAAgBAQABPyGKC3SbJRyy+/gl9vJNks5IILG+igt0iL0nHxse05ggsmBsMvzyNjkmt7zDZmLBbKxre3X+QoyxTR5udlVZ9cSnTS8OIrebzys1veaXvGKlrbtGqqP09fscmAfyEE03V3zFIpYP+y+7w2ml7zA2OGVKGxFdQ+JcUiuKmjtaYmiB9EyNhgiAplj0vPxse14gAo6ICmbpZwzm8E4vJN0o4IAKOn//2gAIAQEAAAAQGCB+78c0ABj/xAAlEAEAAQMCBgMBAQAAAAAAAAABEQAhQTFxUWGBkcHRELHwIKH/2gAIAQEAAT8QpwoDLWC9Zenup/oA8VH9APisF6z29UYEHJ8OWgEtACv+W/8AKIV/y3oy0iSVyU7zjy/3yU7Tn3V+29grVwixZIWHk6VKJiQ16Cz/AFaK0IwwSMSHUA7VlJwUBjF+tl0vJRnTcgSGuQRwi4zepApcX2Aq3be41bvvcKuKSbFsJdO26VprLakVcS8JPRWkI5myMlO5RikLMroDkdbXw1GlW4XEcXEaUI1kBA1JwtX772GuSHaceqQswTpNDhCTSDpXEem4b0yMjIRXiAttUne9YCa5Kd5z6pyUiQ0gNfL+X/lEa+H8vRkoAg+HAiOGsF6z391F9gPmpvsA81gvWXr6owIBg+P/2Q=="},

                    new Product{Model = "GINCB1080", Description = "Battlestation gaming pc", DisplayName = "RtB created battlestation", Price = 2000.00M,
                        Image = "data:image/gif;base64,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",
                        Thumbnail = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAAQABAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/wgALCABAAEABASIA/8QAGQABAQEBAQEAAAAAAAAAAAAAAgABAwQG/9oACAEBAAAAAfoMFT3A9rmw6qEfP053oUOSKbnmbmljpVze4Knv/8QAHhAAAgICAwEBAAAAAAAAAAAAAAECEQMxEBIhIBP/2gAIAQEAAQUCNFtlFFtG+NCV/LVGx+y+l5JbyWdpNTcu3aY3Ix6e1vJPqv0YslyeV3GbMbck9vyRR1RSOqEkhey2J18t2a42U0Wy2U2a4//EACAQAAICAgICAwAAAAAAAAAAAAABESEQMSAyElFBQqH/2gAIAQEABj8CxR2Z2ZfCXxlYjnAxePs+y9FHzuR7m8IZWytiH+DksROdGjSKROIfGFwo6s6svP8A/8QAIxABAAIBAwQDAQEAAAAAAAAAAQARITFBURBhgZEgcdGhsf/aAAgBAQABPyGKC3SbJRyy+/gl9vJNks5IILG+igt0iL0nHxse05ggsmBsMvzyNjkmt7zDZmLBbKxre3X+QoyxTR5udlVZ9cSnTS8OIrebzys1veaXvGKlrbtGqqP09fscmAfyEE03V3zFIpYP+y+7w2ml7zA2OGVKGxFdQ+JcUiuKmjtaYmiB9EyNhgiAplj0vPxse14gAo6ICmbpZwzm8E4vJN0o4IAKOn//2gAIAQEAAAAQGCB+78c0ABj/xAAlEAEAAQMCBgMBAQAAAAAAAAABEQAhQTFxUWGBkcHRELHwIKH/2gAIAQEAAT8QpwoDLWC9Zenup/oA8VH9APisF6z29UYEHJ8OWgEtACv+W/8AKIV/y3oy0iSVyU7zjy/3yU7Tn3V+29grVwixZIWHk6VKJiQ16Cz/AFaK0IwwSMSHUA7VlJwUBjF+tl0vJRnTcgSGuQRwi4zepApcX2Aq3be41bvvcKuKSbFsJdO26VprLakVcS8JPRWkI5myMlO5RikLMroDkdbXw1GlW4XEcXEaUI1kBA1JwtX772GuSHaceqQswTpNDhCTSDpXEem4b0yMjIRXiAttUne9YCa5Kd5z6pyUiQ0gNfL+X/lEa+H8vRkoAg+HAiOGsF6z391F9gPmpvsA81gvWXr6owIBg+P/2Q=="},

                    new Product{Model = "ONE+6T", Description = "Smatphone killer!", DisplayName = "OnePlus 6", Price = 645.50M,
                        Image = "data:image/gif;base64,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",
                        Thumbnail = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAAQABAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/wgALCABAAEABASIA/8QAGQABAQEBAQEAAAAAAAAAAAAAAgABAwQG/9oACAEBAAAAAfoMFT3A9rmw6qEfP053oUOSKbnmbmljpVze4Knv/8QAHhAAAgICAwEBAAAAAAAAAAAAAAECEQMxEBIhIBP/2gAIAQEAAQUCNFtlFFtG+NCV/LVGx+y+l5JbyWdpNTcu3aY3Ix6e1vJPqv0YslyeV3GbMbck9vyRR1RSOqEkhey2J18t2a42U0Wy2U2a4//EACAQAAICAgICAwAAAAAAAAAAAAABESEQMSAyElFBQqH/2gAIAQEABj8CxR2Z2ZfCXxlYjnAxePs+y9FHzuR7m8IZWytiH+DksROdGjSKROIfGFwo6s6svP8A/8QAIxABAAIBAwQDAQEAAAAAAAAAAQARITFBURBhgZEgcdGhsf/aAAgBAQABPyGKC3SbJRyy+/gl9vJNks5IILG+igt0iL0nHxse05ggsmBsMvzyNjkmt7zDZmLBbKxre3X+QoyxTR5udlVZ9cSnTS8OIrebzys1veaXvGKlrbtGqqP09fscmAfyEE03V3zFIpYP+y+7w2ml7zA2OGVKGxFdQ+JcUiuKmjtaYmiB9EyNhgiAplj0vPxse14gAo6ICmbpZwzm8E4vJN0o4IAKOn//2gAIAQEAAAAQGCB+78c0ABj/xAAlEAEAAQMCBgMBAQAAAAAAAAABEQAhQTFxUWGBkcHRELHwIKH/2gAIAQEAAT8QpwoDLWC9Zenup/oA8VH9APisF6z29UYEHJ8OWgEtACv+W/8AKIV/y3oy0iSVyU7zjy/3yU7Tn3V+29grVwixZIWHk6VKJiQ16Cz/AFaK0IwwSMSHUA7VlJwUBjF+tl0vJRnTcgSGuQRwi4zepApcX2Aq3be41bvvcKuKSbFsJdO26VprLakVcS8JPRWkI5myMlO5RikLMroDkdbXw1GlW4XEcXEaUI1kBA1JwtX772GuSHaceqQswTpNDhCTSDpXEem4b0yMjIRXiAttUne9YCa5Kd5z6pyUiQ0gNfL+X/lEa+H8vRkoAg+HAiOGsF6z391F9gPmpvsA81gvWXr6owIBg+P/2Q=="},
                };
                context.AddRange(products);
                context.SaveChanges();
            }
        }
        private static void SeedProductsToCategories(EFContext context)
        {
            var productContext = context.Products.Include(x => x.ProductCategories);
            if (productContext.FirstOrDefault(x => x.Model == "I9500").ProductCategories == null)
            {
                var products = context.Products;

                var categories = context.Categories;

                products.FirstOrDefault(x => x.Model == "I9500").ProductCategories = new List<ProductCategory>()
                {
                    new ProductCategory
                    {
                        CategoryId = categories.FirstOrDefault(x=>x.Name=="Phones").Id,
                        ProductId = products.FirstOrDefault(x=>x.Model == "I9500").Id
                    }
                };

                products.FirstOrDefault(x => x.Model == "VN7G5T").ProductCategories = new List<ProductCategory>()
                {
                    new ProductCategory
                    {
                        CategoryId = categories.FirstOrDefault(x=>x.Name=="Notebooks").Id,
                        ProductId = products.FirstOrDefault(x=>x.Model == "VN7G5T").Id
                    }
                };

                products.FirstOrDefault(x => x.Model == "GINCB1080").ProductCategories = new List<ProductCategory>()
                {
                    new ProductCategory
                    {
                        CategoryId = categories.FirstOrDefault(x=>x.Name=="Stacionary computers").Id,
                        ProductId = products.FirstOrDefault(x=>x.Model == "GINCB1080").Id
                    }
                };

                products.FirstOrDefault(x => x.Model == "ONE+6T").ProductCategories = new List<ProductCategory>()
                {
                    new ProductCategory
                    {
                        CategoryId = categories.FirstOrDefault(x=>x.Name=="Phones").Id,
                        ProductId = products.FirstOrDefault(x=>x.Model == "ONE+6T").Id
                    }
                };
                context.UpdateRange(products);
                context.SaveChanges();
            }
        }
    }
}
