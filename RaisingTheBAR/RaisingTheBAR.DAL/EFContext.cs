using RaisingTheBAR.Core.Models;
using System.Data.Entity;

namespace RaisingTheBAR.DAL
{
    public class EFContext : DbContext
    {
        public EFContext() : base("RaisingTheBAR.DB")
        {
        }
        public DbSet<User> Users { get; set; }
    }
}