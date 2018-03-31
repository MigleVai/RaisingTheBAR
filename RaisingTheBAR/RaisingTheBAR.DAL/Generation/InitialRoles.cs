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
    }
}
