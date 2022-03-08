using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class companyagency : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "CompanyAgencyId",
                table: "Customers",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "CompanyAgencies",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CompanyInfoId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CompanyAgencies", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CompanyAgencies_CompaniesInfos_CompanyInfoId",
                        column: x => x.CompanyInfoId,
                        principalTable: "CompaniesInfos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Customers_CompanyAgencyId",
                table: "Customers",
                column: "CompanyAgencyId");

            migrationBuilder.CreateIndex(
                name: "IX_CompanyAgencies_CompanyInfoId",
                table: "CompanyAgencies",
                column: "CompanyInfoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Customers_CompanyAgencies_CompanyAgencyId",
                table: "Customers",
                column: "CompanyAgencyId",
                principalTable: "CompanyAgencies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Customers_CompanyAgencies_CompanyAgencyId",
                table: "Customers");

            migrationBuilder.DropTable(
                name: "CompanyAgencies");

            migrationBuilder.DropIndex(
                name: "IX_Customers_CompanyAgencyId",
                table: "Customers");

            migrationBuilder.DropColumn(
                name: "CompanyAgencyId",
                table: "Customers");
        }
    }
}
