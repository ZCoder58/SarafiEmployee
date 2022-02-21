using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class subCustomerAccountRate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SubCustomerAccounts_RatesCountries_RatesCountryId",
                table: "SubCustomerAccounts");

            migrationBuilder.DropForeignKey(
                name: "FK_SubCustomerTransactions_SubCustomerAccounts_SubCustomerAccountId",
                table: "SubCustomerTransactions");

            migrationBuilder.DropIndex(
                name: "IX_SubCustomerAccounts_RatesCountryId",
                table: "SubCustomerAccounts");

            migrationBuilder.DropColumn(
                name: "Amount",
                table: "SubCustomerAccounts");

            migrationBuilder.DropColumn(
                name: "RatesCountryId",
                table: "SubCustomerAccounts");

            migrationBuilder.RenameColumn(
                name: "SubCustomerAccountId",
                table: "SubCustomerTransactions",
                newName: "SubCustomerAccountRateId");

            migrationBuilder.RenameIndex(
                name: "IX_SubCustomerTransactions_SubCustomerAccountId",
                table: "SubCustomerTransactions",
                newName: "IX_SubCustomerTransactions_SubCustomerAccountRateId");

            migrationBuilder.CreateTable(
                name: "SubCustomerAccountRates",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Amount = table.Column<double>(type: "float", nullable: false),
                    SubCustomerAccountId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    RatesCountryId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubCustomerAccountRates", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SubCustomerAccountRates_RatesCountries_RatesCountryId",
                        column: x => x.RatesCountryId,
                        principalTable: "RatesCountries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SubCustomerAccountRates_SubCustomerAccounts_SubCustomerAccountId",
                        column: x => x.SubCustomerAccountId,
                        principalTable: "SubCustomerAccounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SubCustomerAccountRates_RatesCountryId",
                table: "SubCustomerAccountRates",
                column: "RatesCountryId");

            migrationBuilder.CreateIndex(
                name: "IX_SubCustomerAccountRates_SubCustomerAccountId",
                table: "SubCustomerAccountRates",
                column: "SubCustomerAccountId");

            migrationBuilder.AddForeignKey(
                name: "FK_SubCustomerTransactions_SubCustomerAccountRates_SubCustomerAccountRateId",
                table: "SubCustomerTransactions",
                column: "SubCustomerAccountRateId",
                principalTable: "SubCustomerAccountRates",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SubCustomerTransactions_SubCustomerAccountRates_SubCustomerAccountRateId",
                table: "SubCustomerTransactions");

            migrationBuilder.DropTable(
                name: "SubCustomerAccountRates");

            migrationBuilder.RenameColumn(
                name: "SubCustomerAccountRateId",
                table: "SubCustomerTransactions",
                newName: "SubCustomerAccountId");

            migrationBuilder.RenameIndex(
                name: "IX_SubCustomerTransactions_SubCustomerAccountRateId",
                table: "SubCustomerTransactions",
                newName: "IX_SubCustomerTransactions_SubCustomerAccountId");

            migrationBuilder.AddColumn<double>(
                name: "Amount",
                table: "SubCustomerAccounts",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<Guid>(
                name: "RatesCountryId",
                table: "SubCustomerAccounts",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_SubCustomerAccounts_RatesCountryId",
                table: "SubCustomerAccounts",
                column: "RatesCountryId");

            migrationBuilder.AddForeignKey(
                name: "FK_SubCustomerAccounts_RatesCountries_RatesCountryId",
                table: "SubCustomerAccounts",
                column: "RatesCountryId",
                principalTable: "RatesCountries",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SubCustomerTransactions_SubCustomerAccounts_SubCustomerAccountId",
                table: "SubCustomerTransactions",
                column: "SubCustomerAccountId",
                principalTable: "SubCustomerAccounts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
