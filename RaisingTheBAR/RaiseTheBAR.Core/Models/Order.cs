using RaisingTheBAR.Core.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;


namespace RaisingTheBAR.Core.Models
{
    public class Order : Base
    {
        public string Address { get; set; }
        public OrderStateEnum State { get; set; }
        public DateTimeOffset? StartedDate { get; set; }
        public DateTimeOffset? FinishedDate { get; set; }
        public DateTimeOffset? LastModifiedDate { get; set; }

        public Guid? ModifiedById { get; set; }
        [ForeignKey("ModifiedById")]
        public User ModifiedBy { get; set; }

        public Guid? UserId { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; }

        public ICollection<ProductOrder> ProductOrders { get; set; }

    }
}
