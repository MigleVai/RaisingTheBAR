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
    }
}
