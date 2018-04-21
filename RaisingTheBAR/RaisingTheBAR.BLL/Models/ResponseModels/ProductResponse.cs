using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RaisingTheBAR.BLL.Models.ResponseModels
{
    public class ProductResponse
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string Image { get; set; }
        public string Description { get; set; }
        public bool Featured { get; set; }
        public decimal? DiscountPrice { get; set; }
    }
}
