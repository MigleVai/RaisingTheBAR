namespace RaisingTheBAR.BLL.Models.ResponseModels
{
    public class FullProductResponse
    {
        public string Id { get; set; }
        public decimal Price { get; set; }
        public string Image { get; set; }
        public string Thumbnail { get; set; }
        public string Description { get; set; }
        public decimal? DiscountPrice { get; set; }
        public string DisplayName { get; set; }
        public bool IsEnabled { get; set; }
        public byte[] Timestamp { get; set; }

    }
}
