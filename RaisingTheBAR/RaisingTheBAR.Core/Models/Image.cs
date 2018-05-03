using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using RaisingTheBAR.Core.Enums;

namespace RaisingTheBAR.Core.Models
{
    public class Image: Base
    {
        [ForeignKey("Product")]
        public Guid ProductId { get; set; }
        [Required]
        public virtual Product Product { get; set; }
        public string ImageBase64 { get; set; }
        public ImageTypeEnum Type { get; set; }

    }
}