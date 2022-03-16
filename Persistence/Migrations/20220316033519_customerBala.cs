using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class customerBala : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Abbr",
                table: "CustomerBalanceTransactions");

            migrationBuilder.DropColumn(
                name: "CustomerAmount",
                table: "CustomerBalances");

            migrationBuilder.RenameColumn(
                name: "CustomerFriendAmount",
                table: "CustomerBalances",
                newName: "Amount");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Amount",
                table: "CustomerBalances",
                newName: "CustomerFriendAmount");

            migrationBuilder.AddColumn<string>(
                name: "Abbr",
                table: "CustomerBalanceTransactions",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "CustomerAmount",
                table: "CustomerBalances",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }
    }
}
