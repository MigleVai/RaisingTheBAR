namespace RaisingTheBAR.BLL.Models.ResponseModels
{
    public class FullProductResponse
    {
        public string Id { get; set; }
        public decimal Price { get; set; }
        public int ImageCount { get; set; }
        public int ThumbnailCount { get; set; }
        public string Description { get; set; }
        public decimal DiscountedPrice { get; set; }
        public string DisplayName { get; set; }
        public bool IsEnabled { get; set; }
        public bool IsFeatured { get; set; }
        public byte[] Timestamp { get; set; }

    }
}
