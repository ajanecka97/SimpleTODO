using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace SimpleTODO_API.Models
{
    public class User : IdentityUser
    {
        public ICollection<UserLabel> UserLabels { get; set; }
    }
}
