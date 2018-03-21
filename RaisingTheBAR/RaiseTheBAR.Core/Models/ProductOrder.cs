using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System;

//https://stackoverflow.com/questions/7050404/create-code-first-many-to-many-with-additional-fields-in-association-table
namespace RaisingTheBAR.Core.Models
{
    public class ProductOrder
    {
        [Key, Column(Order = 0), ForeignKey("Product")]
        public Guid ProductId { get; set; }
        [Key, Column(Order = 1), ForeignKey("Order")]
        public Guid OrderId { get; set; }

        public virtual Product Product { get; set; }
        public virtual Order Order { get; set; }

        public int Amount { get; set; }
    }
}
