using System;

namespace RaisingTheBAR.Core.Models
{
    public class ProductCriteria
    {
        public Guid ProductId { get; set; }
        public virtual Product Product { get; set; }
        public Guid CriteriaId { get; set; }
        public virtual Criteria Criteria { get; set; }
        public string Values { get; set; }
    }
}