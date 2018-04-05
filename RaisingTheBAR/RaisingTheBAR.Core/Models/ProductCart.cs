using System;
using System.Collections.Generic;
using System.Text;

namespace RaisingTheBAR.Core.Models
{
    public class ProductCart
    {
        public Guid ProductId { get; set; }
        public Product Product { get; set; }
        public Guid CartId { get; set; }
        public Cart Cart { get; set; }
        public int Amount { get; set; }
    }
}
