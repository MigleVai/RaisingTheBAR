namespace RaisingTheBAR.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedOrders : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Orders",
                c => new
                    {
                        Id = c.Guid(nullable: false, identity: true),
                        Address = c.String(),
                        State = c.Int(nullable: false),
                        StartedDate = c.DateTimeOffset(precision: 7),
                        FinishedDate = c.DateTimeOffset(precision: 7),
                        LastModifiedDate = c.DateTimeOffset(precision: 7),
                        ModifiedById = c.Guid(),
                        UserId = c.Guid(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.ModifiedById)
                .ForeignKey("dbo.Users", t => t.UserId)
                .Index(t => t.ModifiedById)
                .Index(t => t.UserId);
            
            CreateTable(
                "dbo.ProductOrders",
                c => new
                    {
                        ProductId = c.Guid(nullable: false),
                        OrderId = c.Guid(nullable: false),
                        Amount = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.ProductId, t.OrderId })
                .ForeignKey("dbo.Orders", t => t.OrderId, cascadeDelete: true)
                .ForeignKey("dbo.Products", t => t.ProductId, cascadeDelete: true)
                .Index(t => t.ProductId)
                .Index(t => t.OrderId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Orders", "UserId", "dbo.Users");
            DropForeignKey("dbo.ProductOrders", "ProductId", "dbo.Products");
            DropForeignKey("dbo.ProductOrders", "OrderId", "dbo.Orders");
            DropForeignKey("dbo.Orders", "ModifiedById", "dbo.Users");
            DropIndex("dbo.ProductOrders", new[] { "OrderId" });
            DropIndex("dbo.ProductOrders", new[] { "ProductId" });
            DropIndex("dbo.Orders", new[] { "UserId" });
            DropIndex("dbo.Orders", new[] { "ModifiedById" });
            DropTable("dbo.ProductOrders");
            DropTable("dbo.Orders");
        }
    }
}
