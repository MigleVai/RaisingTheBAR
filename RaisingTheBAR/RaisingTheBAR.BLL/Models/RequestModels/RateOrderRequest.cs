namespace RaisingTheBAR.BLL.Models.RequestModels
{
    public class RateOrderRequest
    {
        public string OrderId { get; set; }
        public int Rating { get; set; }
        public string Comment { get; set; }
    }
}