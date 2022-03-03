using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class tosubcustomer : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "ToSubCustomerAccountRateId",
                table: "SubCustomerTransactions",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_SubCustomerTransactions_ToSubCustomerAccountRateId",
                table: "SubCustomerTransactions",
                column: "ToSubCustomerAccountRateId");

            migrationBuilder.AddForeignKey(
                name: "FK_SubCustomerTransactions_SubCustomerAccountRates_ToSubCustomerAccountRateId",
                table: "SubCustomerTransactions",
                column: "ToSubCustomerAccountRateId",
                principalTable: "SubCustomerAccountRates",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SubCustomerTransactions_SubCustomerAccountRates_ToSubCustomerAccountRateId",
                table: "SubCustomerTransactions");

            migrationBuilder.DropIndex(
                name: "IX_SubCustomerTransactions_ToSubCustomerAccountRateId",
                table: "SubCustomerTransactions");

            migrationBuilder.DropColumn(
                name: "ToSubCustomerAccountRateId",
                table: "SubCustomerTransactions");
        }
    }
}
