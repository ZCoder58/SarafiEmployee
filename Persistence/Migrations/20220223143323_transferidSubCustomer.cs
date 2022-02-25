using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class transferidSubCustomer : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "TransferId",
                table: "SubCustomerTransactions",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_SubCustomerTransactions_TransferId",
                table: "SubCustomerTransactions",
                column: "TransferId");

            migrationBuilder.AddForeignKey(
                name: "FK_SubCustomerTransactions_Transfers_TransferId",
                table: "SubCustomerTransactions",
                column: "TransferId",
                principalTable: "Transfers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SubCustomerTransactions_Transfers_TransferId",
                table: "SubCustomerTransactions");

            migrationBuilder.DropIndex(
                name: "IX_SubCustomerTransactions_TransferId",
                table: "SubCustomerTransactions");

            migrationBuilder.DropColumn(
                name: "TransferId",
                table: "SubCustomerTransactions");
        }
    }
}
