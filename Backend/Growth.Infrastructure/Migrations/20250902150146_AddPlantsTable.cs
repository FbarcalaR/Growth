using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Growth.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddPlantsTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "plant",
                schema: "public",
                columns: table => new
                {
                    routine_id = table.Column<int>(type: "integer", nullable: false),
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    health = table.Column<int>(type: "integer", nullable: false),
                    experience_points = table.Column<int>(type: "integer", nullable: false),
                    level = table.Column<int>(type: "integer", nullable: false),
                    garden_position_x = table.Column<int>(type: "integer", nullable: false),
                    garden_position_y = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_plant", x => new { x.routine_id, x.id });
                    table.ForeignKey(
                        name: "fk_plant_routines_routine_id",
                        column: x => x.routine_id,
                        principalSchema: "public",
                        principalTable: "routines",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "plant",
                schema: "public");
        }
    }
}
