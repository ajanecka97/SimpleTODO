using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SimpleTODO_API.Models
{
    public class Label
    {

        public int LabelId { get; set; }

        public string Name { get; set; }

        public ICollection<TodoItemLabel> TodoItemLabels { get; set; }
        public ICollection<UserLabel> UserLabels { get; set; }
    }
}
