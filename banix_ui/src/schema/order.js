export class Order {
  constructor(rawOrder) {
    if (rawOrder) {
      this.orderId = rawOrder.order_id;
      this.orderInfoId = rawOrder.order_info_id;
      this.orderPrice = rawOrder.order_price;
      this.orderDate = rawOrder.order_date;
      this.orderPaymentInfo = null;
      this.orderItemPriceInfo = [];
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
      this.orderInfoId = null;
      this.orderPrice = {};
      this.orderItemPriceInfo = [];
      this.orderDate = null;
      this.orderPaymentInfo = null;
      this.orderShippingInfo = null;
      this.orderItems = [];
      this.productPriceInfo = [];
    }
  }
  toDict() {
    return {};
  }
  toRawDict() {
    // shipping information
    let shippingInfo = {};
    if (this.orderShippingInfo) {
      shippingInfo["full_name"] = this.orderShippingInfo.fullName;
      shippingInfo["mobile_number"] = this.orderShippingInfo.mobileNumber;
      shippingInfo["pincode"] = this.orderShippingInfo.pinCode;
      shippingInfo["building_info"] = this.orderShippingInfo.buildingInfo;
      shippingInfo["street_info"] = this.orderShippingInfo.streetInfo;
      shippingInfo["landmark_info"] = this.orderShippingInfo.landmarkInfo;
      shippingInfo["city_info"] = this.orderShippingInfo.cityInfo;
      shippingInfo["state_info"] = this.orderShippingInfo.stateInfo;
    }
    // order price information
    let orderPrice = {};
    if (this.orderPrice) {
      orderPrice["total_price"] = this.orderPrice.totalShippingPrice;
      orderPrice["total_selling_price"] = this.orderPrice.totalSellingPrice;
      orderPrice["total_shipping_price"] = this.orderPrice.totalShippingPrice;
      orderPrice["total_tax_price"] = this.orderPrice.totalTaxPrice;
      orderPrice["total_price"] = this.orderPrice.totalPrice;
    }
    // order payment information
    let paymentInfo = {};
    if (this.orderPaymentInfo) {
      paymentInfo[
        "payment_method"
      ] = this.orderPaymentInfo.paymentMethod.paymentMethod;
      paymentInfo["payment_gateway"] = this.orderPaymentInfo.paymentGateway;
      paymentInfo[
        "payment_transaction_id"
      ] = this.orderPaymentInfo.paymentTransactionId;
    }
    // order items information
    let orderItems = [];
    if (this.orderItems && this.orderItemPriceInfo) {
      for (let i = 0; i < this.orderItems.length; i++) {
        let orderItem = this.orderItems[i];
        let productPriceInfo = this.orderItemPriceInfo.filter(
          (item) => item.productId === orderItem.productId
        )[0];
        let temp = {};
        temp["product_id"] = orderItem.productId;
        temp["total_price"] = productPriceInfo.totalPrice;
        temp["shipping_price"] = productPriceInfo.shippingPrice;
        temp["tax_price"] = productPriceInfo.taxPrice;
        temp["selling_price"] = productPriceInfo.sellingPrice;
        temp["qty"] = orderItem.qty;
        orderItems.push(temp);
      }
    }
    return {
      order_id: this.orderId,
      order_info_id: this.orderInfoId,
      order_price: orderPrice,
      order_items: orderItems,
      order_payment_info: paymentInfo,
      order_shipping_address: shippingInfo,
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
    this.totalTaxPrice = rawOrderInfo.total_tax_price;
    this.totalPrice = rawOrderInfo.total_price;
    this.productPriceInfo = [];
    if (rawOrderInfo.product_price_info) {
      rawOrderInfo.product_price_info.map((productPriceInfo) => {
        this.productPriceInfo.push({
          productId: productPriceInfo.product_id,
          sellingPrice: productPriceInfo.price_details.selling_price,
          shippingPrice: productPriceInfo.price_details.shipping_price,
          taxPrice: productPriceInfo.price_details.tax_price,
          totalPrice: productPriceInfo.price_details.total_price,
        });
        return null;
      });
    }
  }
  toRawDict(self) {
    return {};
  }
}
