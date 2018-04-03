using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RaisingTheBAR.BLL.Models.RequestModels
{
    public class ProductEditRequest
    {
        public string Id { get; set; }
        public string Model { get; set; }
        public string DisplayName { get; set; }
        public string Image { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
    }
}
