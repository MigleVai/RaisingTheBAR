using System.Collections.Generic;

namespace RaisingTheBAR.Core.Models
{
    public class Criteria : Base
    {
        public string Name { get; set; }
        public string Values { get; set; }
        public virtual ICollection<ProductCriteria> ProductCriterias { get; set; }

    }
}