using System.Collections.Generic;

namespace RaisingTheBAR.Core.Models
{
    public class Role : Base
    {
        public string RoleName { get; set; }
        public virtual ICollection<User> Users { get; set; }
    }
}
