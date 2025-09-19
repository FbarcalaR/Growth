using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Growth.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddRestOfRoutines : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "start_date",
                schema: "public",
                table: "routines",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.AddColumn<int>(
                name: "total_days",
                schema: "public",
                table: "routines",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "routine_tasks",
                schema: "public",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "text", nullable: false),
                    repetition = table.Column<string>(type: "text", nullable: false),
                    task_schedule_from_time = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    task_schedule_to_time = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    task_schedule_duration = table.Column<TimeSpan>(type: "interval", nullable: false),
                    task_streak_max_streak_days = table.Column<int>(type: "integer", nullable: false),
                    task_streak_current_streak_days = table.Column<int>(type: "integer", nullable: false),
                    notes = table.Column<string>(type: "text", nullable: false),
                    routine_id = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_routine_tasks", x => x.id);
                    table.ForeignKey(
                        name: "fk_routine_tasks_routines_routine_id",
                        column: x => x.routine_id,
                        principalSchema: "public",
                        principalTable: "routines",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "goals",
                schema: "public",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    target_name = table.Column<string>(type: "text", nullable: false),
                    target_value = table.Column<double>(type: "double precision", nullable: false),
                    progress_name = table.Column<string>(type: "text", nullable: false),
                    progress_value = table.Column<double>(type: "double precision", nullable: false),
                    routine_id = table.Column<int>(type: "integer", nullable: true),
                    routine_task_id = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_goals", x => x.id);
                    table.ForeignKey(
                        name: "fk_goals_routine_tasks_routine_task_id",
                        column: x => x.routine_task_id,
                        principalSchema: "public",
                        principalTable: "routine_tasks",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "fk_goals_routines_routine_id",
                        column: x => x.routine_id,
                        principalSchema: "public",
                        principalTable: "routines",
                        principalColumn: "id");
                });

            migrationBuilder.CreateIndex(
                name: "ix_goals_routine_id",
                schema: "public",
                table: "goals",
                column: "routine_id");

            migrationBuilder.CreateIndex(
                name: "ix_goals_routine_task_id",
                schema: "public",
                table: "goals",
                column: "routine_task_id");

            migrationBuilder.CreateIndex(
                name: "ix_routine_tasks_routine_id",
                schema: "public",
                table: "routine_tasks",
                column: "routine_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "goals",
                schema: "public");

            migrationBuilder.DropTable(
                name: "routine_tasks",
                schema: "public");

            migrationBuilder.DropColumn(
                name: "start_date",
                schema: "public",
                table: "routines");

            migrationBuilder.DropColumn(
                name: "total_days",
                schema: "public",
                table: "routines");
        }
    }
}
