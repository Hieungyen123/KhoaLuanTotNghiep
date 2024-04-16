const CartUtil = {
  getTotal(mycart) {
    var total = 0;
    for (const item of mycart) {
      total += item.product.price * item.quantity;
    }
    return total;
  },

  getTotalWithDiscount(mycart) {
    var totalAfterDiscount = 0;
    for (let i = 0; i < mycart.length; i++) {
      const product = mycart[i];
      const price = product.product.price;
      const quantity = product.quantity;
      const discountPercent = product.product?.promotion?.discountPercent;
      if (discountPercent !== undefined) {
        const discountAmount = Math.ceil(price - (price * (discountPercent / 100)));
        totalAfterDiscount += discountAmount * quantity
      } else {
        totalAfterDiscount += price * quantity;
      }
    }
    return totalAfterDiscount;
  }

};
export default CartUtil;