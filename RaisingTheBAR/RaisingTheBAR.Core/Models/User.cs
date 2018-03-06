using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace RaisingTheBAR.Core.Models
{
    public class User
    {
        [Key]
        public string Email { get; set; }
        public string Password { get; set; }
        public bool IsBlocked { get; set; }
    }
}
