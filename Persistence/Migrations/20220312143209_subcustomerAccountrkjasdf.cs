using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class subcustomerAccountrkjasdf : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Reverse",
                table: "CustomerExchangeRates");

            migrationBuilder.AddColumn<bool>(
                name: "AccountTransaction",
                table: "SubCustomerTransactions",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AccountTransaction",
                table: "SubCustomerTransactions");

            migrationBuilder.AddColumn<bool>(
                name: "Reverse",
                table: "CustomerExchangeRates",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
