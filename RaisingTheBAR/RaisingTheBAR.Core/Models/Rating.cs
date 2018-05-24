using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace RaisingTheBAR.Core.Models
{
    public class Rating
    {
        [ForeignKey("Order")]
        public Guid OrderId { get; set; }
        [Required]
        public virtual Order Order { get; set; }
        public int? Rate { get; set; }
        public string Comment { get; set; }
        public bool WasRated { get; set; }
    }
}
