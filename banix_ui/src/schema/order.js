export class Order {
  constructor(rawOrder) {
    if (rawOrder) {
      this.orderId = rawOrder.order_id;
      this.orderInfoId = rawOrder.order_info_id;
      this.orderCustomerId = rawOrder.order_customer_id;
      this.orderPrice = {};
      this.orderStatus = {};
      this.orderDate = new Date(rawOrder.order_date);
      this.orderCreatedDatetime = rawOrder.order;
      this.orderPaymentInfo = null;
      this.orderItemPriceInfo = [];
      this.orderShippingAddress = {};
      this.orderShippingInfo = null;
      this.orderItems = [];

      // Order Price
      if (rawOrder.order_price) {
        this.orderPrice = {
          totalPrice: rawOrder.order_price["order_total_price"],
          totalSellingPrice: rawOrder.order_price["order_selling_price"],
          totalShippingPrice: rawOrder.order_price["order_shipping_price"],
          totalTaxPrice: rawOrder.order_price["order_tax_price"],
        };
      }
      //Order status
      if (rawOrder.order_status) {
        this.orderStatus["status"] = rawOrder.order_status["status"];
      }
      // Order Shipping Address
      if (rawOrder.order_shipping_address) {
        this.orderShippingAddress["fullName"] =
          rawOrder.order_shipping_address["full_name"];
        this.orderShippingAddress["mobileNumber"] =
          rawOrder.order_shipping_address["mobile_number"];
        this.orderShippingAddress["pinCode"] =
          rawOrder.order_shipping_address["pincode"];
        this.orderShippingAddress["buildingInfo"] =
          rawOrder.order_shipping_address["building_info"];
        this.orderShippingAddress["streetInfo"] =
          rawOrder.order_shipping_address["street_info"];
        this.orderShippingAddress["landmarkInfo"] =
          rawOrder.order_shipping_address["landmark_info"];
        this.orderShippingAddress["cityInfo"] =
          rawOrder.order_shipping_address["city_info"];
        this.orderShippingAddress["stateInfo"] =
          rawOrder.order_shipping_address["state_info"];
      }
      // Order Shipping related information
      if (rawOrder.order_shipping_info) {
        this.orderShippingInfo = new orderShippingInfo(
          rawOrder.order_shipping_info
        );
      }
      // Order Items information
      if (rawOrder.order_items) {
        rawOrder.order_items.map((rawOrderItem) => {
          this.orderItems.push(new OrderItem(rawOrderItem));
          return null;
        });
      }
    } else {
      this.orderId = null;
      this.orderInfoId = null;
      this.orderCustomerId = null;
      this.orderPrice = {};
      this.orderStatus = {};
      this.orderPaymentInfo = null;
      this.orderItemPriceInfo = [];
      this.orderShippingAddress = {};
      this.orderShippingInfo = null;
      this.orderItems = [];
      this.productPriceInfo = [];
      this.orderDate = null;
      this.orderCreatedDatetime = null;
    }
  }

  toRawDict() {
    // shipping information
    let orderShippingAddress = {};
    if (this.orderShippingAddress) {
      orderShippingAddress["full_name"] = this.orderShippingAddress.fullName;
      orderShippingAddress[
        "mobile_number"
      ] = this.orderShippingAddress.mobileNumber;
      orderShippingAddress["pincode"] = this.orderShippingAddress.pinCode;
      orderShippingAddress[
        "building_info"
      ] = this.orderShippingAddress.buildingInfo;
      orderShippingAddress[
        "street_info"
      ] = this.orderShippingAddress.streetInfo;
      orderShippingAddress[
        "landmark_info"
      ] = this.orderShippingAddress.landmarkInfo;
      orderShippingAddress["city_info"] = this.orderShippingAddress.cityInfo;
      orderShippingAddress["state_info"] = this.orderShippingAddress.stateInfo;
    }
    // order price information
    let orderPrice = {};
    if (this.orderPrice) {
      orderPrice["total_selling_price"] = this.orderPrice.totalSellingPrice;
      orderPrice["total_shipping_price"] = this.orderPrice.totalShippingPrice;
      orderPrice["total_tax_price"] = this.orderPrice.totalTaxPrice;
      orderPrice["total_price"] = this.orderPrice.totalPrice;
    }
    // order payment information
    let paymentInfo = {};

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
        temp["product_name"] = orderItem.productName;
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
      order_shipping_address: orderShippingAddress,
    };
  }
}

export class OrderItem {
  constructor(rawOrderItem) {
    this.orderProductId = rawOrderItem["order_product_foreign_id"];
    this.orderProductName = rawOrderItem["order_item_product_name"];
    this.orderItemQty = rawOrderItem["order_item_quantity"];
    this.totalPrice = rawOrderItem["order_item_total_price"];
    this.totalSellingPrice = rawOrderItem["order_item_selling_price"];
    this.totalShippingPrice = rawOrderItem["order_item_shipping_price"];
    this.totalTaxPrice = rawOrderItem["order_item_tax_price"];
  }
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

export class OrderInfo {
  // the structure that is maintianed for processing the order request
  constructor(rawOrderInfo) {
    this.customerId = rawOrderInfo.customer_id;
    this.orderInfoId = rawOrderInfo.order_info_id;
    this.pinCode = rawOrderInfo.pin_code;
    this.totalSellingPrice = rawOrderInfo.total_selling_price;
    this.totalShippingPrice = rawOrderInfo.total_shipping_price;
    this.totalTaxPrice = rawOrderInfo.total_tax_price;
    this.totalPrice = rawOrderInfo.total_price;
    this.productPriceInfo = [];
    this.paymentInfo = {};

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
    if (rawOrderInfo.payment_info) {
      this.paymentInfo.amount = rawOrderInfo.payment_info.amount;
      this.paymentInfo.currency = rawOrderInfo.payment_info.currency;
      this.paymentInfo.paymentOrderId = rawOrderInfo.payment_info.id;
      this.paymentInfo.receiptId = rawOrderInfo.payment_info.receipt;
      this.paymentInfo.amount = rawOrderInfo.payment_info.amount;
    }
  }
  toRawDict(self) {
    return {};
  }
}
