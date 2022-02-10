using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class customerExchangeRatesTabl : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CustomerExchangeRates",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FromRatesCountryId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FromExchangeRate = table.Column<double>(type: "float", nullable: false),
                    FromAmount = table.Column<double>(type: "float", nullable: false),
                    ToRatesCountryId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ToExchangeRate = table.Column<double>(type: "float", nullable: false),
                    ToAmount = table.Column<double>(type: "float", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CustomerExchangeRates", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CustomerExchangeRates_RatesCountries_FromRatesCountryId",
                        column: x => x.FromRatesCountryId,
                        principalTable: "RatesCountries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CustomerExchangeRates_RatesCountries_ToRatesCountryId",
                        column: x => x.ToRatesCountryId,
                        principalTable: "RatesCountries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CustomerExchangeRates_FromRatesCountryId",
                table: "CustomerExchangeRates",
                column: "FromRatesCountryId");

            migrationBuilder.CreateIndex(
                name: "IX_CustomerExchangeRates_ToRatesCountryId",
                table: "CustomerExchangeRates",
                column: "ToRatesCountryId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CustomerExchangeRates");
        }
    }
}
