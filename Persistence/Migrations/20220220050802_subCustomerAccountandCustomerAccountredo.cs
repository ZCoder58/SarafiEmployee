using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class subCustomerAccountandCustomerAccountredo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "CustomerId",
                table: "SubCustomerAccounts",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_SubCustomerAccounts_CustomerId",
                table: "SubCustomerAccounts",
                column: "CustomerId");

            migrationBuilder.AddForeignKey(
                name: "FK_SubCustomerAccounts_Customers_CustomerId",
                table: "SubCustomerAccounts",
                column: "CustomerId",
                principalTable: "Customers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SubCustomerAccounts_Customers_CustomerId",
                table: "SubCustomerAccounts");

            migrationBuilder.DropIndex(
                name: "IX_SubCustomerAccounts_CustomerId",
                table: "SubCustomerAccounts");

            migrationBuilder.DropColumn(
                name: "CustomerId",
                table: "SubCustomerAccounts");
        }
    }
}
