
namespace RaisingTheBAR.BLL.Models.RequestModels
{
    public class PaymentServiceRequest 
    {
        public int amount { get; set; }
        public string number { get; set; }
        public string holder { get; set; }
        public int exp_year { get; set; }
        public int exp_month { get; set; }
        public string cvv { get; set; }
    }
}