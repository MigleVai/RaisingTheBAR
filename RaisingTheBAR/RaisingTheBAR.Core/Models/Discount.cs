using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RaisingTheBAR.Core.Models
{
    public class Discount
    {
        [ForeignKey("Product")]
        public Guid ProductId { get; set; }
        [Required]
        public virtual Product Product { get; set; }
        public decimal DiscountedPrice { get; set; }
    }
}