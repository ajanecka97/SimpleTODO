using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SimpleTODO_API.Models
{
    public class TodoItemLabel
    {
        public int TodoItemId { get; set; }
        public int LabelId { get; set; }
        public TodoItem TodoItem { get; set; }
        public Label Label { get; set; }
    }
}
