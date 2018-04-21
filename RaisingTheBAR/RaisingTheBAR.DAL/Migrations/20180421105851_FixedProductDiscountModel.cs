using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace RaisingTheBAR.DAL.Migrations
{
    public partial class FixedProductDiscountModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductCriteria_Criteria_CriteriaId",
                table: "ProductCriteria");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductCriteria_Products_ProductId",
                table: "ProductCriteria");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProductCriteria",
                table: "ProductCriteria");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Criteria",
                table: "Criteria");

            migrationBuilder.RenameTable(
                name: "ProductCriteria",
                newName: "ProductCriterias");

            migrationBuilder.RenameTable(
                name: "Criteria",
                newName: "Criterias");

            migrationBuilder.RenameIndex(
                name: "IX_ProductCriteria_CriteriaId",
                table: "ProductCriterias",
                newName: "IX_ProductCriterias_CriteriaId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProductCriterias",
                table: "ProductCriterias",
                columns: new[] { "ProductId", "CriteriaId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_Criterias",
                table: "Criterias",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "Discount",
                columns: table => new
                {
                    ProductId = table.Column<Guid>(nullable: false),
                    DiscountedPrice = table.Column<decimal>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Discount", x => x.ProductId);
                    table.ForeignKey(
                        name: "FK_Discount_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.AddForeignKey(
                name: "FK_ProductCriterias_Criterias_CriteriaId",
                table: "ProductCriterias",
                column: "CriteriaId",
                principalTable: "Criterias",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProductCriterias_Products_ProductId",
                table: "ProductCriterias",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductCriterias_Criterias_CriteriaId",
                table: "ProductCriterias");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductCriterias_Products_ProductId",
                table: "ProductCriterias");

            migrationBuilder.DropTable(
                name: "Discount");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProductCriterias",
                table: "ProductCriterias");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Criterias",
                table: "Criterias");

            migrationBuilder.RenameTable(
                name: "ProductCriterias",
                newName: "ProductCriteria");

            migrationBuilder.RenameTable(
                name: "Criterias",
                newName: "Criteria");

            migrationBuilder.RenameIndex(
                name: "IX_ProductCriterias_CriteriaId",
                table: "ProductCriteria",
                newName: "IX_ProductCriteria_CriteriaId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProductCriteria",
                table: "ProductCriteria",
                columns: new[] { "ProductId", "CriteriaId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_Criteria",
                table: "Criteria",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductCriteria_Criteria_CriteriaId",
                table: "ProductCriteria",
                column: "CriteriaId",
                principalTable: "Criteria",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProductCriteria_Products_ProductId",
                table: "ProductCriteria",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
