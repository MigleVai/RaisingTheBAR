using System.Collections.Generic;

namespace RaisingTheBAR.BLL.Models.RequestModels
{
    public class ProductEditRequest
    {
        public string Id { get; set; }
        public string Model { get; set; }
        public string DisplayName { get; set; }
        public List<string> Images { get; set; }
        public string Thumbnail { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public decimal DiscountedPrice { get; set; }
        public bool IsFeatured { get; set; }
        public bool IsEnabled { get; set; }
        public byte[] Timestamp { get; set; }

    }
}
