namespace RaisingTheBAR.BLL.Models.RequestModels
{
    public class CreateCategoryRequest
    {
        public string Name { get; set; }
        public string ParentCategoryId { get; set; }
        public bool Active { get; set; }
    }
}
