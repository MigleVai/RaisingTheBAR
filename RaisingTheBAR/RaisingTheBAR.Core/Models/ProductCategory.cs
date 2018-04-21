using System;

namespace RaisingTheBAR.Core.Models
{
    public class ProductCategory
    {
        public Guid ProductId { get; set; }
        public virtual Product Product { get; set; }
        public Guid CategoryId { get; set; }
        public virtual Category Category { get; set; }
    }
}
