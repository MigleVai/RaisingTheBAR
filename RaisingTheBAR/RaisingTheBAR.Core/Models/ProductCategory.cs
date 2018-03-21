using System;
using System.Collections.Generic;
using System.Text;

namespace RaisingTheBAR.Core.Models
{
    public class ProductCategory
    {
        public Guid ProductId { get; set; }
        public Product Product { get; set; }
        public Guid CategoryId { get; set; }
        public Category Category { get; set; }
    }
}
