namespace RaisingTheBAR.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CartProduct : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.ProductCart",
                c => new
                    {
                        ProductId = c.Guid(nullable: false),
                        CartId = c.Guid(nullable: false),
                    })
                .PrimaryKey(t => new { t.ProductId, t.CartId })
                .ForeignKey("dbo.Carts", t => t.ProductId, cascadeDelete: true)
                .ForeignKey("dbo.Products", t => t.CartId, cascadeDelete: true)
                .Index(t => t.ProductId)
                .Index(t => t.CartId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.ProductCart", "CartId", "dbo.Products");
            DropForeignKey("dbo.ProductCart", "ProductId", "dbo.Carts");
            DropIndex("dbo.ProductCart", new[] { "CartId" });
            DropIndex("dbo.ProductCart", new[] { "ProductId" });
            DropTable("dbo.ProductCart");
        }
    }
}
