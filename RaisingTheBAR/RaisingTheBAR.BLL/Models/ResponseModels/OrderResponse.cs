using System;
using System.Collections.Generic;

namespace RaisingTheBAR.BLL.Models.ResponseModels
{
    public class OrderResponse
    {
        public string OrderId { get; set; }
        public DateTimeOffset? StartedDate { get; set; }
        public DateTimeOffset? LastUpdateDate { get; set; }
        public List<ProductListResponse> Products { get; set; }
        public decimal TotalPrice { get; set; }
        public string OrderState { get; set; }
    }
}