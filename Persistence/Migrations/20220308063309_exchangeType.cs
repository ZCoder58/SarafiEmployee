using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class exchangeType : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ToExchangeRate",
                table: "CustomerExchangeRates",
                newName: "ToExchangeRateSell");

            migrationBuilder.AddColumn<double>(
                name: "ToExchangeRateBuy",
                table: "CustomerExchangeRates",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ToExchangeRateBuy",
                table: "CustomerExchangeRates");

            migrationBuilder.RenameColumn(
                name: "ToExchangeRateSell",
                table: "CustomerExchangeRates",
                newName: "ToExchangeRate");
        }
    }
}
