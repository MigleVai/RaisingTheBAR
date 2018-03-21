namespace RaisingTheBAR.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedProducts : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Products",
                c => new
                    {
                        Id = c.Guid(nullable: false, identity: true),
                        DisplayName = c.String(),
                        ImageUri = c.String(),
                        Description = c.String(),
                        Price = c.Decimal(nullable: false, precision: 18, scale: 2),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.ProductCategory",
                c => new
                    {
                        ProductId = c.Guid(nullable: false),
                        CategoryId = c.Guid(nullable: false),
                    })
                .PrimaryKey(t => new { t.ProductId, t.CategoryId })
                .ForeignKey("dbo.Categories", t => t.ProductId, cascadeDelete: true)
                .ForeignKey("dbo.Products", t => t.CategoryId, cascadeDelete: true)
                .Index(t => t.ProductId)
                .Index(t => t.CategoryId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.ProductCategory", "CategoryId", "dbo.Products");
            DropForeignKey("dbo.ProductCategory", "ProductId", "dbo.Categories");
            DropIndex("dbo.ProductCategory", new[] { "CategoryId" });
            DropIndex("dbo.ProductCategory", new[] { "ProductId" });
            DropTable("dbo.ProductCategory");
            DropTable("dbo.Products");
        }
    }
}
