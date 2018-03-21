using Microsoft.EntityFrameworkCore;
using RaisingTheBAR.Core.Models;

namespace RaisingTheBAR.DAL
{
    public class EFContext : DbContext
    {
        private string connectionString;

        public EFContext(DbContextOptions<EFContext> options, string connectionString = null)
        {
            this.connectionString = connectionString;
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Cart> Carts { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductOrder> ProductOrders { get; set; }
        public DbSet<Role> Roles { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Cart>()
                .HasKey(x => x.UserId);

            modelBuilder.Entity<ProductOrder>()
                .HasKey(c => new { c.OrderId, c.ProductId});

            modelBuilder.Entity<User>()
                .HasMany(x => x.Orders)
                .WithOne(y => y.User)
                .HasForeignKey(key => key.UserId);

            modelBuilder.Entity<ProductCategory>()
                .HasKey(bc => new { bc.ProductId, bc.CategoryId });

            modelBuilder.Entity<ProductCategory>()
                .HasOne(bc => bc.Category)
                .WithMany(b => b.ProductCategories)
                .HasForeignKey(bc => bc.CategoryId);

            modelBuilder.Entity<ProductCategory>()
                .HasOne(bc => bc.Product)
                .WithMany(c => c.ProductCategories)
                .HasForeignKey(bc => bc.ProductId);

            modelBuilder.Entity<ProductCart>()
                .HasKey(bc => new { bc.ProductId, bc.CartId});

            modelBuilder.Entity<ProductCart>()
                .HasOne(bc => bc.Cart)
                .WithMany(b => b.ProductCarts)
                .HasForeignKey(bc => bc.CartId);

            modelBuilder.Entity<ProductCart>()
                .HasOne(bc => bc.Product)
                .WithMany(c => c.ProductCarts)
                .HasForeignKey(bc => bc.ProductId);
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            // Used when instantiating db context outside IoC 
            if (connectionString != null)
            {
                var config = connectionString;
                optionsBuilder.UseSqlServer(config);
            }

            base.OnConfiguring(optionsBuilder);
        }

    }
}