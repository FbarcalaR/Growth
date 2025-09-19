using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Growth.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddUsers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM Routines;");

            migrationBuilder.AddColumn<Guid>(
                name: "user_id",
                schema: "public",
                table: "routines",
                type: "uuid",
                nullable: false);

            migrationBuilder.CreateTable(
                name: "users",
                schema: "public",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    email = table.Column<string>(type: "text", nullable: false),
                    password_hash = table.Column<string>(type: "text", nullable: false),
                    first_name = table.Column<string>(type: "text", nullable: true),
                    last_name = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_users", x => x.id);
                });

            migrationBuilder.CreateIndex(
                name: "ix_routines_user_id",
                schema: "public",
                table: "routines",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "ix_users_email",
                schema: "public",
                table: "users",
                column: "email",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "fk_routines_users_user_id",
                schema: "public",
                table: "routines",
                column: "user_id",
                principalSchema: "public",
                principalTable: "users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_routines_users_user_id",
                schema: "public",
                table: "routines");

            migrationBuilder.DropTable(
                name: "users",
                schema: "public");

            migrationBuilder.DropIndex(
                name: "ix_routines_user_id",
                schema: "public",
                table: "routines");

            migrationBuilder.DropColumn(
                name: "user_id",
                schema: "public",
                table: "routines");
        }
    }
}
