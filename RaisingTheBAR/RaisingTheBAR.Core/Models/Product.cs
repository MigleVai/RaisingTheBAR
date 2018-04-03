using System.Collections.Generic;

namespace RaisingTheBAR.Core.Models
{
    public class Product : Base
    {
        public string Model { get; set; }
        public string DisplayName { get; set; }
        public string Image { get; set; }
        public string Thumbnail { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public bool IsEnabled { get; set; }
        public byte[] Timestamp { get; set; }

        public ICollection<ProductCart> ProductCarts { get; set; }
        public ICollection<ProductOrder> ProductOrders { get; set; }
        public ICollection<ProductCategory> ProductCategories { get; set; }
    }
}
