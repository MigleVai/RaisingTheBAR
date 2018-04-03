using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace RaisingTheBAR.DAL.Migrations
{
    public partial class AddedConcurrency : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ImageUri",
                table: "Products",
                newName: "Thumbnail");

            migrationBuilder.AddColumn<string>(
                name: "Image",
                table: "Products",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsEnabled",
                table: "Products",
                nullable: false,
                defaultValue: true);

            migrationBuilder.AddColumn<string>(
                name: "Model",
                table: "Products",
                nullable: true);

            migrationBuilder.AddColumn<byte[]>(
                name: "Timestamp",
                table: "Products",
                rowVersion: true,
                nullable: true);

            migrationBuilder.AddColumn<byte[]>(
                name: "Timestamp",
                table: "Orders",
                rowVersion: true,
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsEnabled",
                table: "Categories",
                nullable: false,
                defaultValue: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Image",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "IsEnabled",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "Model",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "Timestamp",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "Timestamp",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "IsEnabled",
                table: "Categories");

            migrationBuilder.RenameColumn(
                name: "Thumbnail",
                table: "Products",
                newName: "ImageUri");
        }
    }
}
