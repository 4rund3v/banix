export class Order {
  constructor(rawOrder) {
    if (rawOrder) {
      this.orderId = rawOrder.order_id;
      this.orderPrice = rawOrder.order_price;
      this.orderDate = rawOrder.order_date;
      this.orderPaymentType = null;

      this.orderShippingInfo = null;
      if (rawOrder.order_shipping_info) {
        this.orderShippingInfo = new orderShippingInfo(
          rawOrder.order_shipping_info
        );
      }
      this.orderItems = [];
      if (rawOrder.order_items) {
        rawOrder.order_items.map((rawOrderItem) => {
          this.orderItems.push(new OrderItem(rawOrderItem));
          return null;
        });
      }
    } else {
      this.orderId = null;
      this.orderPrice = null;
      this.orderDate = null;
      this.orderPaymentType = null;
      this.orderShippingInfo = null;
      this.orderItems = [];
    }
  }
  toDict() {
    return {};
  }
  toRawDict() {
    return {
      order_id: this.orderId,
      order_price: this.orderPrice,
      order_date: this.orderDate,
      order_payment_id: this.orderPaymentType,
      order_items: this.orderItems,
      order_shipping_address: this.orderShippingInfo,
    };
  }
}

export class OrderItem {
  toRawDict() {
    return {};
  }
}

export class orderShippingInfo {
  constructur(rawShippingInfo) {}
  toRawDict() {
    return {};
  }
}

export class orderInfo {
  constructor(rawOrderInfo) {
    this.customerId = rawOrderInfo.customer_id;
    this.orderInfoId = rawOrderInfo.order_info_id;
    this.pinCode = rawOrderInfo.pin_code;
    this.totalSellingPrice = rawOrderInfo.total_selling_price;
    this.totalShippingPrice = rawOrderInfo.total_shipping_price;
    this.totalTaxPrice = rawOrderInfo.total_selling_price;
    this.totalPrice = rawOrderInfo.total_price;
  }
}
