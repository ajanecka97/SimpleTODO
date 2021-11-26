using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace SimpleTODO_API.Models
{
    public class TodoItem
    {
        public int TodoItemId { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 3)]
        public string Name { get; set; }

        [StringLength(500)]
        public string Description { get; set; }

        [DataType(DataType.Date)]
        public DateTime Deadline { get; set; }

        public int Position { get; set; }

        public User User { get; set; }

        public ICollection<TodoItemLabel> TodoItemLabels { get; set; }

    }
}
