using System;

namespace RaisingTheBAR.BLL.Models.ResponseModels
{
    public class OrderListResponse
    {
        public DateTimeOffset? StartedDate { get; set; }
        public int ProductAmount { get; set; }
        public decimal OrderPrice { get; set; }
        public string OrderState { get; set; }
        public Guid OrderId { get; set; }
        public bool IsRated { get; set; }
    }
}