using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class customerBalanceTransactions : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CustomerBalances",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CustomerFriendAmount = table.Column<double>(type: "float", nullable: false),
                    CustomerAmount = table.Column<double>(type: "float", nullable: false),
                    RatesCountryId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CustomerId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CustomerFriendId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CustomerBalances", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CustomerBalances_Customers_CustomerFriendId",
                        column: x => x.CustomerFriendId,
                        principalTable: "Customers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CustomerBalances_Customers_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "Customers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CustomerBalances_RatesCountries_RatesCountryId",
                        column: x => x.RatesCountryId,
                        principalTable: "RatesCountries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CustomerBalanceTransactions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Comment = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Type = table.Column<int>(type: "int", nullable: false),
                    Amount = table.Column<double>(type: "float", nullable: false),
                    PriceName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Abbr = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TransferId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CustomerBalanceId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CustomerBalanceTransactions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CustomerBalanceTransactions_CustomerBalances_CustomerBalanceId",
                        column: x => x.CustomerBalanceId,
                        principalTable: "CustomerBalances",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CustomerBalanceTransactions_Transfers_TransferId",
                        column: x => x.TransferId,
                        principalTable: "Transfers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CustomerBalances_CustomerFriendId",
                table: "CustomerBalances",
                column: "CustomerFriendId");

            migrationBuilder.CreateIndex(
                name: "IX_CustomerBalances_CustomerId",
                table: "CustomerBalances",
                column: "CustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_CustomerBalances_RatesCountryId",
                table: "CustomerBalances",
                column: "RatesCountryId");

            migrationBuilder.CreateIndex(
                name: "IX_CustomerBalanceTransactions_CustomerBalanceId",
                table: "CustomerBalanceTransactions",
                column: "CustomerBalanceId");

            migrationBuilder.CreateIndex(
                name: "IX_CustomerBalanceTransactions_TransferId",
                table: "CustomerBalanceTransactions",
                column: "TransferId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CustomerBalanceTransactions");

            migrationBuilder.DropTable(
                name: "CustomerBalances");
        }
    }
}
