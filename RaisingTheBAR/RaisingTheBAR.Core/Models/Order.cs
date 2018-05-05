using RaisingTheBAR.Core.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;


namespace RaisingTheBAR.Core.Models
{
    public class Order : Base
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public OrderStateEnum State { get; set; }
        public DateTimeOffset? StartedDate { get; set; }
        public DateTimeOffset? FinishedDate { get; set; }
        public DateTimeOffset? LastModifiedDate { get; set; }
        public byte[] Timestamp { get; set; }

        public Guid? ModifiedById { get; set; }
        [ForeignKey("ModifiedById")]
        public virtual User ModifiedBy { get; set; }

        public Guid? UserId { get; set; }
        [ForeignKey("UserId")]
        public virtual User User { get; set; }

        public virtual ICollection<ProductOrder> ProductOrders { get; set; }
        public virtual Rating Rating { get; set; }

    }
}
