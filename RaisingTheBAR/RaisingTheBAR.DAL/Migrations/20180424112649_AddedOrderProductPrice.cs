using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace RaisingTheBAR.DAL.Migrations
{
    public partial class AddedOrderProductPrice : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TotalPrice",
                table: "Orders");

            migrationBuilder.AddColumn<decimal>(
                name: "SinglePrice",
                table: "ProductOrders",
                nullable: false,
                defaultValue: 0m);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SinglePrice",
                table: "ProductOrders");

            migrationBuilder.AddColumn<decimal>(
                name: "TotalPrice",
                table: "Orders",
                nullable: false,
                defaultValue: 0m);
        }
    }
}
