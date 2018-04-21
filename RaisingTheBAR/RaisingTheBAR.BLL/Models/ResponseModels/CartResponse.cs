using System.Collections.Generic;

namespace RaisingTheBAR.BLL.Models.ResponseModels
{
    public class CartResponse
    {
        public List<CartProduct> Products { get; set; }
        public decimal CompletePrice { get; set; }
    }

    public class CartProduct
    {
        public string ProductId { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public int Amount { get; set; }
        public decimal Total { get; set; }
        public decimal? DiscountPrice { get; set; }
    }
}
