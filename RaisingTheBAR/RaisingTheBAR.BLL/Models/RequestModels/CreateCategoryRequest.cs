using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RaisingTheBAR.BLL.Models.RequestModels
{
    public class CreateCategoryRequest
    {
        public string Name { get; set; }
        public string ParentCategoryId { get; set; }
        public bool Active { get; set; }
    }
}
