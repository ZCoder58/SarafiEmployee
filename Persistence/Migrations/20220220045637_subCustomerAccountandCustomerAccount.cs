using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class subCustomerAccountandCustomerAccount : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AccountType",
                table: "Transfers",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<Guid>(
                name: "SubCustomerAccountId",
                table: "Transfers",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "CustomerAccounts",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Amount = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    RatesCountryId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CustomerId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CustomerAccounts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CustomerAccounts_Customers_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "Customers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CustomerAccounts_RatesCountries_RatesCountryId",
                        column: x => x.RatesCountryId,
                        principalTable: "RatesCountries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SubCustomerAccounts",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FatherName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SId = table.Column<int>(type: "int", nullable: false),
                    Phone = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Amount = table.Column<double>(type: "float", nullable: false),
                    Photo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RatesCountryId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubCustomerAccounts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SubCustomerAccounts_RatesCountries_RatesCountryId",
                        column: x => x.RatesCountryId,
                        principalTable: "RatesCountries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Transfers_SubCustomerAccountId",
                table: "Transfers",
                column: "SubCustomerAccountId");

            migrationBuilder.CreateIndex(
                name: "IX_CustomerAccounts_CustomerId",
                table: "CustomerAccounts",
                column: "CustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_CustomerAccounts_RatesCountryId",
                table: "CustomerAccounts",
                column: "RatesCountryId");

            migrationBuilder.CreateIndex(
                name: "IX_SubCustomerAccounts_RatesCountryId",
                table: "SubCustomerAccounts",
                column: "RatesCountryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Transfers_SubCustomerAccounts_SubCustomerAccountId",
                table: "Transfers",
                column: "SubCustomerAccountId",
                principalTable: "SubCustomerAccounts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transfers_SubCustomerAccounts_SubCustomerAccountId",
                table: "Transfers");

            migrationBuilder.DropTable(
                name: "CustomerAccounts");

            migrationBuilder.DropTable(
                name: "SubCustomerAccounts");

            migrationBuilder.DropIndex(
                name: "IX_Transfers_SubCustomerAccountId",
                table: "Transfers");

            migrationBuilder.DropColumn(
                name: "AccountType",
                table: "Transfers");

            migrationBuilder.DropColumn(
                name: "SubCustomerAccountId",
                table: "Transfers");
        }
    }
}
