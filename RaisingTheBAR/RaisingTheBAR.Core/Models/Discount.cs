using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RaisingTheBAR.Core.Models
{
    public class Discount
    {
        [Key]
        [ForeignKey("Product")]
        public string ProductId { get; set; }
        public Product Product { get; set; }
        public decimal DiscountedPrice { get; set; }
    }
}