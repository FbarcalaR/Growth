using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Growth.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class UpdateTaskGoalsConfig : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_goals_routine_tasks_routine_task_id",
                schema: "public",
                table: "goals");

            migrationBuilder.DropPrimaryKey(
                name: "pk_goals",
                schema: "public",
                table: "goals");

            migrationBuilder.RenameTable(
                name: "goals",
                schema: "public",
                newName: "goal",
                newSchema: "public");

            migrationBuilder.RenameIndex(
                name: "ix_goals_routine_task_id",
                schema: "public",
                table: "goal",
                newName: "ix_goal_routine_task_id");

            migrationBuilder.AlterColumn<int>(
                name: "routine_task_id",
                schema: "public",
                table: "goal",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "pk_goal",
                schema: "public",
                table: "goal",
                column: "id");

            migrationBuilder.AddForeignKey(
                name: "fk_goal_routine_tasks_routine_task_id",
                schema: "public",
                table: "goal",
                column: "routine_task_id",
                principalSchema: "public",
                principalTable: "routine_tasks",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_goal_routine_tasks_routine_task_id",
                schema: "public",
                table: "goal");

            migrationBuilder.DropPrimaryKey(
                name: "pk_goal",
                schema: "public",
                table: "goal");

            migrationBuilder.RenameTable(
                name: "goal",
                schema: "public",
                newName: "goals",
                newSchema: "public");

            migrationBuilder.RenameIndex(
                name: "ix_goal_routine_task_id",
                schema: "public",
                table: "goals",
                newName: "ix_goals_routine_task_id");

            migrationBuilder.AlterColumn<int>(
                name: "routine_task_id",
                schema: "public",
                table: "goals",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddPrimaryKey(
                name: "pk_goals",
                schema: "public",
                table: "goals",
                column: "id");

            migrationBuilder.AddForeignKey(
                name: "fk_goals_routine_tasks_routine_task_id",
                schema: "public",
                table: "goals",
                column: "routine_task_id",
                principalSchema: "public",
                principalTable: "routine_tasks",
                principalColumn: "id");
        }
    }
}
