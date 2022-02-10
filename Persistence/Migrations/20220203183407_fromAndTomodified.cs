using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class fromAndTomodified : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FromExchangeRate",
                table: "CustomerExchangeRates");

            migrationBuilder.DropColumn(
                name: "ToAmount",
                table: "CustomerExchangeRates");

            migrationBuilder.AddColumn<Guid>(
                name: "CustomerId",
                table: "CustomerExchangeRates",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_CustomerExchangeRates_CustomerId",
                table: "CustomerExchangeRates",
                column: "CustomerId");

            migrationBuilder.AddForeignKey(
                name: "FK_CustomerExchangeRates_Customers_CustomerId",
                table: "CustomerExchangeRates",
                column: "CustomerId",
                principalTable: "Customers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CustomerExchangeRates_Customers_CustomerId",
                table: "CustomerExchangeRates");

            migrationBuilder.DropIndex(
                name: "IX_CustomerExchangeRates_CustomerId",
                table: "CustomerExchangeRates");

            migrationBuilder.DropColumn(
                name: "CustomerId",
                table: "CustomerExchangeRates");

            migrationBuilder.AddColumn<double>(
                name: "FromExchangeRate",
                table: "CustomerExchangeRates",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "ToAmount",
                table: "CustomerExchangeRates",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }
    }
}
