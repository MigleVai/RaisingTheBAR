namespace RaisingTheBAR.BLL.Models.ResponseModels
{
    public class ProductListResponse
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string Image { get; set; }
        public int Amount { get; set; }
        public decimal TotalPrice { get; set; }
    }
}