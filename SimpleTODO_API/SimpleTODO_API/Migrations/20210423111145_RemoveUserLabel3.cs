using Microsoft.EntityFrameworkCore.Migrations;

namespace SimpleTODO_API.Migrations
{
    public partial class RemoveUserLabel3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(name: "UserLabel");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
