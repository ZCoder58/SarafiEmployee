using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class tableModify : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RatesCountries_RateCategory_CategoryId",
                table: "RatesCountries");

            migrationBuilder.DropTable(
                name: "RateCategory");

            migrationBuilder.DropIndex(
                name: "IX_RatesCountries_CategoryId",
                table: "RatesCountries");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "RatesCountries");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "CategoryId",
                table: "RatesCountries",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateTable(
                name: "RateCategory",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RateCategory", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RatesCountries_CategoryId",
                table: "RatesCountries",
                column: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_RatesCountries_RateCategory_CategoryId",
                table: "RatesCountries",
                column: "CategoryId",
                principalTable: "RateCategory",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
