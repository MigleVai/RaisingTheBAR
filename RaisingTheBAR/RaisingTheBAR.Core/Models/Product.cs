using System.Collections.Generic;

namespace RaisingTheBAR.Core.Models
{
    public class Product : Base
    {
        public string DisplayName { get; set; }
        public string ImageUri { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }

        public ICollection<ProductCart> ProductCarts { get; set; }
        public ICollection<ProductOrder> ProductOrders { get; set; }
        public ICollection<ProductCategory> ProductCategories { get; set; }
    }
}
