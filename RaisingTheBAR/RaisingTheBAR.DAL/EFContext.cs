using System.Data.Entity;
using RaisingTheBAR.Core.Models;

namespace RaisingTheBAR.DAL
{
    public class EFContext : DbContext
    {
        public EFContext() : base("RaisingTheBAR.DB")
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Cart> Carts { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductOrder> ProductOrders { get; set; }
        public DbSet<Role> Roles { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasOptional(x => x.Cart)
                .WithRequired(y => y.User)
                .WillCascadeOnDelete(true);

            modelBuilder.Entity<Category>()
                .HasMany(x => x.Products)
                .WithMany(y => y.Categories)
                .Map(pc =>
                {
                    pc.MapLeftKey("ProductId");
                    pc.MapRightKey("CategoryId");
                    pc.ToTable("ProductCategory");
                });

            modelBuilder.Entity<User>()
                .HasMany(x => x.Orders)
                .WithRequired(y => y.User)
                .HasForeignKey(key => key.UserId);

            modelBuilder.Entity<Cart>()
                .HasMany(c => c.Products)
                .WithMany(p => p.Carts)
                .Map(pc =>
                {
                    pc.MapLeftKey("ProductId");
                    pc.MapRightKey("CartId");
                    pc.ToTable("ProductCart");
                });
        }

    }
}