using Microsoft.AspNetCore.Hosting;
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

                SeedRoles(context);
                SeedUsers(context);
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
        private static void SeedUsers(EFContext context)
        {
            if (!context.Users.Any())
            {
                var users = new List<User>
                {
                    new User(){ Email = "test", Password = "test",
                                RoleId = context.Roles.FirstOrDefault(x=>x.RoleName == "user").Id },
                    new User(){ Email = "admin", Password = "admin",
                                RoleId = context.Roles.FirstOrDefault(x=>x.RoleName == "administrator").Id }
                };
                context.AddRange(users);
                context.SaveChanges();
            }
        }
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
                    Thumbnail = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAAQABAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/wgALCABAAEABASIA/8QAGQABAQEBAQEAAAAAAAAAAAAAAgABAwQG/9oACAEBAAAAAfoMFT3A9rmw6qEfP053oUOSKbnmbmljpVze4Knv/8QAHhAAAgICAwEBAAAAAAAAAAAAAAECEQMxEBIhIBP/2gAIAQEAAQUCNFtlFFtG+NCV/LVGx+y+l5JbyWdpNTcu3aY3Ix6e1vJPqv0YslyeV3GbMbck9vyRR1RSOqEkhey2J18t2a42U0Wy2U2a4//EACAQAAICAgICAwAAAAAAAAAAAAABESEQMSAyElFBQqH/2gAIAQEABj8CxR2Z2ZfCXxlYjnAxePs+y9FHzuR7m8IZWytiH+DksROdGjSKROIfGFwo6s6svP8A/8QAIxABAAIBAwQDAQEAAAAAAAAAAQARITFBURBhgZEgcdGhsf/aAAgBAQABPyGKC3SbJRyy+/gl9vJNks5IILG+igt0iL0nHxse05ggsmBsMvzyNjkmt7zDZmLBbKxre3X+QoyxTR5udlVZ9cSnTS8OIrebzys1veaXvGKlrbtGqqP09fscmAfyEE03V3zFIpYP+y+7w2ml7zA2OGVKGxFdQ+JcUiuKmjtaYmiB9EyNhgiAplj0vPxse14gAo6ICmbpZwzm8E4vJN0o4IAKOn//2gAIAQEAAAAQGCB+78c0ABj/xAAlEAEAAQMCBgMBAQAAAAAAAAABEQAhQTFxUWGBkcHRELHwIKH/2gAIAQEAAT8QpwoDLWC9Zenup/oA8VH9APisF6z29UYEHJ8OWgEtACv+W/8AKIV/y3oy0iSVyU7zjy/3yU7Tn3V+29grVwixZIWHk6VKJiQ16Cz/AFaK0IwwSMSHUA7VlJwUBjF+tl0vJRnTcgSGuQRwi4zepApcX2Aq3be41bvvcKuKSbFsJdO26VprLakVcS8JPRWkI5myMlO5RikLMroDkdbXw1GlW4XEcXEaUI1kBA1JwtX772GuSHaceqQswTpNDhCTSDpXEem4b0yMjIRXiAttUne9YCa5Kd5z6pyUiQ0gNfL+X/lEa+H8vRkoAg+HAiOGsF6z391F9gPmpvsA81gvWXr6owIBg+P/2Q=="},

                    new Product{Model = "VN7G5T", Description = "Best laptop OMFG!", DisplayName = "Asus Aspire V Nitro", Price = 1199.99M,
                    Thumbnail = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAAQABAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/wgALCABAAEABASIA/8QAGQABAQEBAQEAAAAAAAAAAAAAAgABAwQG/9oACAEBAAAAAfoMFT3A9rmw6qEfP053oUOSKbnmbmljpVze4Knv/8QAHhAAAgICAwEBAAAAAAAAAAAAAAECEQMxEBIhIBP/2gAIAQEAAQUCNFtlFFtG+NCV/LVGx+y+l5JbyWdpNTcu3aY3Ix6e1vJPqv0YslyeV3GbMbck9vyRR1RSOqEkhey2J18t2a42U0Wy2U2a4//EACAQAAICAgICAwAAAAAAAAAAAAABESEQMSAyElFBQqH/2gAIAQEABj8CxR2Z2ZfCXxlYjnAxePs+y9FHzuR7m8IZWytiH+DksROdGjSKROIfGFwo6s6svP8A/8QAIxABAAIBAwQDAQEAAAAAAAAAAQARITFBURBhgZEgcdGhsf/aAAgBAQABPyGKC3SbJRyy+/gl9vJNks5IILG+igt0iL0nHxse05ggsmBsMvzyNjkmt7zDZmLBbKxre3X+QoyxTR5udlVZ9cSnTS8OIrebzys1veaXvGKlrbtGqqP09fscmAfyEE03V3zFIpYP+y+7w2ml7zA2OGVKGxFdQ+JcUiuKmjtaYmiB9EyNhgiAplj0vPxse14gAo6ICmbpZwzm8E4vJN0o4IAKOn//2gAIAQEAAAAQGCB+78c0ABj/xAAlEAEAAQMCBgMBAQAAAAAAAAABEQAhQTFxUWGBkcHRELHwIKH/2gAIAQEAAT8QpwoDLWC9Zenup/oA8VH9APisF6z29UYEHJ8OWgEtACv+W/8AKIV/y3oy0iSVyU7zjy/3yU7Tn3V+29grVwixZIWHk6VKJiQ16Cz/AFaK0IwwSMSHUA7VlJwUBjF+tl0vJRnTcgSGuQRwi4zepApcX2Aq3be41bvvcKuKSbFsJdO26VprLakVcS8JPRWkI5myMlO5RikLMroDkdbXw1GlW4XEcXEaUI1kBA1JwtX772GuSHaceqQswTpNDhCTSDpXEem4b0yMjIRXiAttUne9YCa5Kd5z6pyUiQ0gNfL+X/lEa+H8vRkoAg+HAiOGsF6z391F9gPmpvsA81gvWXr6owIBg+P/2Q=="},

                    new Product{Model = "GINCB1080", Description = "Battlestation gaming pc", DisplayName = "RtB created battlestation", Price = 2000.00M,
                    Thumbnail = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAAQABAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/wgALCABAAEABASIA/8QAGQABAQEBAQEAAAAAAAAAAAAAAgABAwQG/9oACAEBAAAAAfoMFT3A9rmw6qEfP053oUOSKbnmbmljpVze4Knv/8QAHhAAAgICAwEBAAAAAAAAAAAAAAECEQMxEBIhIBP/2gAIAQEAAQUCNFtlFFtG+NCV/LVGx+y+l5JbyWdpNTcu3aY3Ix6e1vJPqv0YslyeV3GbMbck9vyRR1RSOqEkhey2J18t2a42U0Wy2U2a4//EACAQAAICAgICAwAAAAAAAAAAAAABESEQMSAyElFBQqH/2gAIAQEABj8CxR2Z2ZfCXxlYjnAxePs+y9FHzuR7m8IZWytiH+DksROdGjSKROIfGFwo6s6svP8A/8QAIxABAAIBAwQDAQEAAAAAAAAAAQARITFBURBhgZEgcdGhsf/aAAgBAQABPyGKC3SbJRyy+/gl9vJNks5IILG+igt0iL0nHxse05ggsmBsMvzyNjkmt7zDZmLBbKxre3X+QoyxTR5udlVZ9cSnTS8OIrebzys1veaXvGKlrbtGqqP09fscmAfyEE03V3zFIpYP+y+7w2ml7zA2OGVKGxFdQ+JcUiuKmjtaYmiB9EyNhgiAplj0vPxse14gAo6ICmbpZwzm8E4vJN0o4IAKOn//2gAIAQEAAAAQGCB+78c0ABj/xAAlEAEAAQMCBgMBAQAAAAAAAAABEQAhQTFxUWGBkcHRELHwIKH/2gAIAQEAAT8QpwoDLWC9Zenup/oA8VH9APisF6z29UYEHJ8OWgEtACv+W/8AKIV/y3oy0iSVyU7zjy/3yU7Tn3V+29grVwixZIWHk6VKJiQ16Cz/AFaK0IwwSMSHUA7VlJwUBjF+tl0vJRnTcgSGuQRwi4zepApcX2Aq3be41bvvcKuKSbFsJdO26VprLakVcS8JPRWkI5myMlO5RikLMroDkdbXw1GlW4XEcXEaUI1kBA1JwtX772GuSHaceqQswTpNDhCTSDpXEem4b0yMjIRXiAttUne9YCa5Kd5z6pyUiQ0gNfL+X/lEa+H8vRkoAg+HAiOGsF6z391F9gPmpvsA81gvWXr6owIBg+P/2Q=="},

                    new Product{Model = "ONE+6T", Description = "Smatphone killer!", DisplayName = "OnePlus 6", Price = 645.50M,
                    Thumbnail = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAAQABAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/wgALCABAAEABASIA/8QAGQABAQEBAQEAAAAAAAAAAAAAAgABAwQG/9oACAEBAAAAAfoMFT3A9rmw6qEfP053oUOSKbnmbmljpVze4Knv/8QAHhAAAgICAwEBAAAAAAAAAAAAAAECEQMxEBIhIBP/2gAIAQEAAQUCNFtlFFtG+NCV/LVGx+y+l5JbyWdpNTcu3aY3Ix6e1vJPqv0YslyeV3GbMbck9vyRR1RSOqEkhey2J18t2a42U0Wy2U2a4//EACAQAAICAgICAwAAAAAAAAAAAAABESEQMSAyElFBQqH/2gAIAQEABj8CxR2Z2ZfCXxlYjnAxePs+y9FHzuR7m8IZWytiH+DksROdGjSKROIfGFwo6s6svP8A/8QAIxABAAIBAwQDAQEAAAAAAAAAAQARITFBURBhgZEgcdGhsf/aAAgBAQABPyGKC3SbJRyy+/gl9vJNks5IILG+igt0iL0nHxse05ggsmBsMvzyNjkmt7zDZmLBbKxre3X+QoyxTR5udlVZ9cSnTS8OIrebzys1veaXvGKlrbtGqqP09fscmAfyEE03V3zFIpYP+y+7w2ml7zA2OGVKGxFdQ+JcUiuKmjtaYmiB9EyNhgiAplj0vPxse14gAo6ICmbpZwzm8E4vJN0o4IAKOn//2gAIAQEAAAAQGCB+78c0ABj/xAAlEAEAAQMCBgMBAQAAAAAAAAABEQAhQTFxUWGBkcHRELHwIKH/2gAIAQEAAT8QpwoDLWC9Zenup/oA8VH9APisF6z29UYEHJ8OWgEtACv+W/8AKIV/y3oy0iSVyU7zjy/3yU7Tn3V+29grVwixZIWHk6VKJiQ16Cz/AFaK0IwwSMSHUA7VlJwUBjF+tl0vJRnTcgSGuQRwi4zepApcX2Aq3be41bvvcKuKSbFsJdO26VprLakVcS8JPRWkI5myMlO5RikLMroDkdbXw1GlW4XEcXEaUI1kBA1JwtX772GuSHaceqQswTpNDhCTSDpXEem4b0yMjIRXiAttUne9YCa5Kd5z6pyUiQ0gNfL+X/lEa+H8vRkoAg+HAiOGsF6z391F9gPmpvsA81gvWXr6owIBg+P/2Q=="},
                };
                context.AddRange(products);
                context.SaveChanges();
            }
        }
        private static void SeedProductsToCategories(EFContext context)
        {
            if (context.Products.FirstOrDefault(x => x.Model == "I9500").ProductCategories == null)
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
