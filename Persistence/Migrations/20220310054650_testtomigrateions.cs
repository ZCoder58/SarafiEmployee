using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class testtomigrateions : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "EnableTransferRollback",
                table: "CustomerAccountTransactions",
                newName: "EnableRollback");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "EnableRollback",
                table: "CustomerAccountTransactions",
                newName: "EnableTransferRollback");
        }
    }
}
