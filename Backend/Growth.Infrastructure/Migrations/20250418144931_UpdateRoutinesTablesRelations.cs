using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Growth.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class UpdateRoutinesTablesRelations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_goals_routines_routine_id",
                schema: "public",
                table: "goals");

            migrationBuilder.DropIndex(
                name: "ix_goals_routine_id",
                schema: "public",
                table: "goals");

            migrationBuilder.DropColumn(
                name: "routine_id",
                schema: "public",
                table: "goals");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "routine_id",
                schema: "public",
                table: "goals",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "ix_goals_routine_id",
                schema: "public",
                table: "goals",
                column: "routine_id");

            migrationBuilder.AddForeignKey(
                name: "fk_goals_routines_routine_id",
                schema: "public",
                table: "goals",
                column: "routine_id",
                principalSchema: "public",
                principalTable: "routines",
                principalColumn: "id");
        }
    }
}
