using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SimpleTODO_API.Models
{
    public class UserLabel
    {
        public UserLabel() { }

        public UserLabel(User user, Label label)
        {
            UserId = user.Id;
            LabelId = label.LabelId;
            User = user;
            Label = label;
        }

        public UserLabel(string userId, int labelId, User user, Label label)
        {
            UserId = userId;
            LabelId = labelId;
            User = user;
            Label = label;
        }

        public string UserId { get; set; }

        public int LabelId { get; set; }

        public User User { get; set; }

        public Label Label { get; set; }
    }
}
