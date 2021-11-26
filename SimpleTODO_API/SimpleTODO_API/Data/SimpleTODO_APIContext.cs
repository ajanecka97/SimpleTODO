using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SimpleTODO_API.Models;

namespace SimpleTODO_API.Data
{
    public class SimpleTODO_APIContext : IdentityDbContext
    {
        public SimpleTODO_APIContext (DbContextOptions<SimpleTODO_APIContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<TodoItemLabel>().HasKey(tl => new { tl.TodoItemId, tl.LabelId });
            modelBuilder.Entity<UserLabel>().HasKey(ul => new { ul.UserId, ul.LabelId });
        }

        public DbSet<SimpleTODO_API.Models.TodoItem> TodoItem { get; set; }

        public DbSet<SimpleTODO_API.Models.User> User { get; set; }

        public DbSet<SimpleTODO_API.Models.Label> Label { get; set; }

        public DbSet<SimpleTODO_API.Models.UserLabel> UserLabel { get; set; }
    }
}
