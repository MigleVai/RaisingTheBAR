using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using RaisingTheBAR.DAL.Generation;

namespace RaisingTheBAR.BLL
{
    public class Program
    {
        public static void Main(string[] args)
        {
            BuildWebHost(args).SeedData().Run();
        }

        public static IWebHost BuildWebHost(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>()
                .Build();
    }
}
