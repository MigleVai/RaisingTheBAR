using Microsoft.EntityFrameworkCore;
using RaisingTheBAR.Core.Models;

namespace RaisingTheBAR.DAL
{
    public class EFContext : DbContext
    {

        public EFContext(DbContextOptions<EFContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Cart> Carts { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductOrder> ProductOrders { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<Criteria> Criterias { get; set; }
        public DbSet<ProductCriteria> ProductCriterias { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Cart>()
                .HasKey(x => x.UserId);

            modelBuilder.Entity<ProductOrder>()
                .HasKey(c => new { c.OrderId, c.ProductId });

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
                .HasKey(bc => new { bc.ProductId, bc.CartId });

            modelBuilder.Entity<ProductCart>()
                .HasOne(bc => bc.Cart)
                .WithMany(b => b.ProductCarts)
                .HasForeignKey(bc => bc.CartId);

            modelBuilder.Entity<ProductCart>()
                .HasOne(bc => bc.Product)
                .WithMany(c => c.ProductCarts)
                .HasForeignKey(bc => bc.ProductId);

            modelBuilder.Entity<ProductCriteria>()
                .HasKey(bc => new { bc.ProductId, bc.CriteriaId });

            modelBuilder.Entity<ProductCriteria>()
                .HasOne(bc => bc.Product)
                .WithMany(b => b.ProductCriterias)
                .HasForeignKey(bc => bc.ProductId);

            modelBuilder.Entity<ProductCriteria>()
                .HasOne(bc => bc.Criteria)
                .WithMany(c => c.ProductCriterias)
                .HasForeignKey(bc => bc.CriteriaId);

            modelBuilder.Entity<Product>()
                .Property(p => p.Timestamp)
                .IsRowVersion();

            modelBuilder.Entity<Order>()
                .Property(p => p.Timestamp)
                .IsRowVersion();

            modelBuilder.Entity<Product>()
                .Property(p => p.IsEnabled)
                .HasDefaultValue(true);

            modelBuilder.Entity<Category>()
                .Property(p => p.IsEnabled)
                .HasDefaultValue(true);
        }
    }
}