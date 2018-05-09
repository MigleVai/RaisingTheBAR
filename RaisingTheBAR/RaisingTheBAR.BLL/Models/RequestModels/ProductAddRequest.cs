using System.Collections.Generic;

namespace RaisingTheBAR.BLL.Models.RequestModels
{
    public class ProductAddRequest
    {
        public string DisplayName { get; set; }
        public string Description { get; set; }
        public string Model { get; set; }
        public decimal Price { get; set; }
        public decimal DiscountedPrice { get; set; }
        public bool IsFeatured { get; set; }
        public bool IsEnabled { get; set; }
        public string Thumbnail { get; set; }
        public List<string> Images { get; set; }

    }
}
