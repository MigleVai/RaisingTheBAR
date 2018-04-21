using System.Collections.Generic;

namespace RaisingTheBAR.BLL.Models.ResponseModels
{
    public class CategoryResponse
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public int ProductAmount { get; set; }
        public ICollection<CategoryResponse> Children { get; set; }
    }
}
