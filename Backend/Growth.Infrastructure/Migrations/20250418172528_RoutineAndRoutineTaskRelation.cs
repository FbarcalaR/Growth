using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Growth.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class RoutineAndRoutineTaskRelation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_routine_tasks_routines_routine_id",
                schema: "public",
                table: "routine_tasks");

            migrationBuilder.AlterColumn<int>(
                name: "routine_id",
                schema: "public",
                table: "routine_tasks",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "fk_routine_tasks_routines_routine_id",
                schema: "public",
                table: "routine_tasks",
                column: "routine_id",
                principalSchema: "public",
                principalTable: "routines",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_routine_tasks_routines_routine_id",
                schema: "public",
                table: "routine_tasks");

            migrationBuilder.AlterColumn<int>(
                name: "routine_id",
                schema: "public",
                table: "routine_tasks",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddForeignKey(
                name: "fk_routine_tasks_routines_routine_id",
                schema: "public",
                table: "routine_tasks",
                column: "routine_id",
                principalSchema: "public",
                principalTable: "routines",
                principalColumn: "id");
        }
    }
}
