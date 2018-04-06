using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RaisingTheBAR.BLL.Models.RequestModels
{
    public class PaymentRequest
    {
        public string number { get; set; }
        public string holder { get; set; }
        public int exp_year { get; set; }
        public int exp_month { get; set; }
        public string cvv { get; set; }
    }
}
