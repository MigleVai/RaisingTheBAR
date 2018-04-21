namespace RaisingTheBAR.BLL.Models.RequestModels
{
    public class OrderRequest
    {
        public PaymentRequest PaymentRequest { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public decimal Amount { get; set; }
    }

    public class PaymentRequest
    {
        public string Number { get; set; }
        public string Holder { get; set; }
        public int ExpYear { get; set; }
        public int ExpMonth { get; set; }
        public string Cvv { get; set; }
    }
}
