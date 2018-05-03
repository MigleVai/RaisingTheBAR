using System.Collections.Generic;

namespace RaisingTheBAR.Core.Models
{
    public class Product : Base
    {
        public string DisplayName { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public bool IsEnabled { get; set; }
        public byte[] Timestamp { get; set; }
        public decimal DiscountedPrice { get; set; }
        public bool IsFeatured { get; set; }

        public virtual ICollection<Image> Images { get; set; }
        public virtual ICollection<ProductCart> ProductCarts { get; set; }
        public virtual ICollection<ProductOrder> ProductOrders { get; set; }
        public virtual ICollection<ProductCategory> ProductCategories { get; set; }
        public virtual ICollection<ProductCriteria> ProductCriterias { get; set; }

    }
}
