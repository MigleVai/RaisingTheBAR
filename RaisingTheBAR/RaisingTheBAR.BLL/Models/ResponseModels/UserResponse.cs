using System;
using System.Collections.Generic;

namespace RaisingTheBAR.BLL.Models.ResponseModels
{
    public class UserResponse
    {
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool Blocked { get; set; }
        public List<OrderViewResponse> Orders { get; set; }
    }

    public class OrderViewResponse
    {
        public DateTimeOffset? OrderDate { get; set; }
        public int Amount { get; set; }
        public decimal TotalPrice { get; set; }
        public string OrderState { get; set; }
    }
}