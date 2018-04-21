using System;

namespace RaisingTheBAR.Core.Models
{
    public class ProductCart
    {
        public Guid ProductId { get; set; }
        public virtual Product Product { get; set; }
        public Guid CartId { get; set; }
        public virtual Cart Cart { get; set; }
        public int Amount { get; set; }
    }
}
