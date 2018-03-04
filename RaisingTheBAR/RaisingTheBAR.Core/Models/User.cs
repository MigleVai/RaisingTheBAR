using System;
using System.Collections.Generic;
using System.Text;

namespace RaisingTheBAR.Core.Models
{
    public class User
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public bool isBlocked { get; set; }
    }
}
