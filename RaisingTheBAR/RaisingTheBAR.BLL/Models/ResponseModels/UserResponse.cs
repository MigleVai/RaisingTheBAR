using System;
using System.Collections.Generic;

namespace RaisingTheBAR.BLL.Models.ResponseModels
{
    public class UserResponse
    {
        public string Email { get; set; }
        public bool Blocked { get; set; }
        public int OrderCount { get; set; }
        public decimal? TotalCostOfOrders { get; set; }
        public decimal? AverageCostOfOrders { get; set; }
    }

}