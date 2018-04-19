using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace RaisingTheBAR.Core.Models
{
    public class Criteria : Base
    {
        public string Name { get; set; }
        public string Values { get; set; }
        public ICollection<ProductCriteria> ProductCriterias { get; set; }

    }
}