using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PersonalBudgetAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddedName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "BudgetName",
                table: "Budgets",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BudgetName",
                table: "Budgets");
        }
    }
}
