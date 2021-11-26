using SimpleTODO_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SimpleTODO_API.ViewModels
{
    public class LabelVM
    {
        public LabelVM(Label label)
        {
            Id = label.LabelId;
            Name = label.Name;
        }

        public int Id { get; set; }

        public string Name { get; set; }
    }
}
