using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RaisingTheBAR.BLL.Models.RequestModels
{
    public class ChangeUserRequest
    {
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
    }
}