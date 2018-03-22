using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RaisingTheBAR.BLL.Models.RequestModels
{
    public class BlockRequest
    {
        public string Email { get; set; }
        public bool Blocked { get; set; }
    }
}
