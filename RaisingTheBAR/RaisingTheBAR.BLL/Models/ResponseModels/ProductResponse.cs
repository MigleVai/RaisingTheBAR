using System.Collections.Generic;

namespace RaisingTheBAR.BLL.Models.ResponseModels
{
    public class ProductResponse
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public ICollection<string> Images { get; set; }
        public string Description { get; set; }
        public bool Featured { get; set; }
        public decimal DiscountedPrice { get; set; }
    }
}
