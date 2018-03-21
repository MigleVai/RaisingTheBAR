using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace RaisingTheBAR.Core.Models
{
    public class Category : Base
    {
        public string Name { get; set; }

        public Guid? ParentCategoryId { get; set; }
        [ForeignKey("ParentCategoryId")]
        public Category ParentCategory { get; set; }

        public ICollection<Category> ChildCategories { get; set; }
        public ICollection<ProductCategory> ProductCategories { get; set; }
    }
}
