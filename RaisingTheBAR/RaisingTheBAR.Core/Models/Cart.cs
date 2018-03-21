using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RaisingTheBAR.Core.Models
{
    public class Cart
    {
        [ForeignKey("User")]
        public Guid UserId { get; set; }
        [Required]
        public virtual User User { get; set; }

        public DateTimeOffset CreatedDate { get; set; }

        public ICollection<ProductCart> ProductCarts { get; set; }
    }
}
