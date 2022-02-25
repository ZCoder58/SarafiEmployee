using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class companyo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CompaniesInfos_Customers_CustomerId",
                table: "CompaniesInfos");

            migrationBuilder.RenameColumn(
                name: "CustomerId",
                table: "CompaniesInfos",
                newName: "EmployeeSettingId");

            migrationBuilder.RenameIndex(
                name: "IX_CompaniesInfos_CustomerId",
                table: "CompaniesInfos",
                newName: "IX_CompaniesInfos_EmployeeSettingId");

            migrationBuilder.CreateIndex(
                name: "IX_Customers_CompanyId",
                table: "Customers",
                column: "CompanyId");

            migrationBuilder.AddForeignKey(
                name: "FK_CompaniesInfos_EmployeeSettings_EmployeeSettingId",
                table: "CompaniesInfos",
                column: "EmployeeSettingId",
                principalTable: "EmployeeSettings",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Customers_CompaniesInfos_CompanyId",
                table: "Customers",
                column: "CompanyId",
                principalTable: "CompaniesInfos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CompaniesInfos_EmployeeSettings_EmployeeSettingId",
                table: "CompaniesInfos");

            migrationBuilder.DropForeignKey(
                name: "FK_Customers_CompaniesInfos_CompanyId",
                table: "Customers");

            migrationBuilder.DropIndex(
                name: "IX_Customers_CompanyId",
                table: "Customers");

            migrationBuilder.RenameColumn(
                name: "EmployeeSettingId",
                table: "CompaniesInfos",
                newName: "CustomerId");

            migrationBuilder.RenameIndex(
                name: "IX_CompaniesInfos_EmployeeSettingId",
                table: "CompaniesInfos",
                newName: "IX_CompaniesInfos_CustomerId");

            migrationBuilder.AddForeignKey(
                name: "FK_CompaniesInfos_Customers_CustomerId",
                table: "CompaniesInfos",
                column: "CustomerId",
                principalTable: "Customers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
