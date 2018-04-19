using System;

namespace RaisingTheBAR.Core.Models
{
    public class ProductCriteria
    {
        public Guid ProductId { get; set; }
        public Product Product { get; set; }
        public Guid CriteriaId { get; set; }
        public Criteria Criteria { get; set; }
        public string Values { get; set; }
    }
}