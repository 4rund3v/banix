import axios from "axios";
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_REQUEST,
  PREPARE_ORDER_INFO_REQUEST,
  PREPARE_ORDER_INFO_SUCCESS,
  PREPARE_ORDER_INFO_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
} from "../constants/orderConstants";

import {
  CREATE_ORDER_URL,
  PREPARE_ORDER_INFO_URL,
  CUSTOMER_ORDERS_URL,
} from "../config";
import { Order, orderInfo } from "../schema/order";

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });

    const {
      customerToken: { tokenInfo },
    } = getState();
    console.log("[createOrder] The customer token is :: ", tokenInfo);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenInfo.token}`,
      },
    };
    console.log("[createOrder] The order recieved to create is :: ", order);

    const { data } = await axios.post(CREATE_ORDER_URL, order, config);
    const newOrder = new Order(data.order_info);
    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: newOrder,
    });
    console.log("[createOrder] The order data prepared is :: ", newOrder);
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const fetchOderInfo = (cartItems, shippingAddress) => async (
  dispatch,
  getState
) => {
  console.log(
    "[fetchOrderInfo] The cartitems and the shipping address is :: ",
    cartItems,
    shippingAddress
  );
  try {
    dispatch({
      type: PREPARE_ORDER_INFO_REQUEST,
    });

    const {
      customerToken: { tokenInfo },
    } = getState();
    console.log("[fetchOderInfo] The customer token is :: ", tokenInfo);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenInfo.token}`,
      },
    };
    const orderDetails = {
      pin_code: shippingAddress.pinCode,
      cart_items: cartItems.map((cartItem) => {
        return { product_id: cartItem.productId, product_qty: cartItem.qty };
      }),
    };
    console.log(
      "[fetchOderInfo] The order details prepared is :: ",
      orderDetails
    );
    const { data } = await axios.post(
      PREPARE_ORDER_INFO_URL,
      orderDetails,
      config
    );
    console.log("[fetchOderInfo] the order information fetched is ::: ", data);
    dispatch({
      type: PREPARE_ORDER_INFO_SUCCESS,
      payload: new orderInfo(data),
    });
  } catch (error) {
    dispatch({
      type: PREPARE_ORDER_INFO_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrderDetails = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });
    const {
      customerToken: { tokenInfo },
    } = getState();
    console.log("[getOrderDetails] The customer token is :: ", tokenInfo);
    const config = {
      headers: {
        Authorization: `Bearer ${tokenInfo.token}`,
      },
    };
    const url = `${CUSTOMER_ORDERS_URL}/${orderId}`;
    console.log("[getOrderDetails] The order id url is ", url);
    const { data } = await axios.get(url, config);
    console.log(
      "[getOrderDetails] The order details fetched  is :: ",
      orderId,
      data
    );
    if (!data.oder_info) {
      throw new Error("No order information recieved.");
    }
    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data.order_info,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrderList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_REQUEST,
    });
    const {
      customerToken: { tokenInfo },
    } = getState();
    console.log("[getOrderList] The customer token is :: ", tokenInfo);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenInfo.token}`,
      },
    };
    const url = `${CUSTOMER_ORDERS_URL}`;
    console.log("[getOrderList] The order id url is ", url);
    const { data } = await axios.get(url, config);
    console.log("[getOrderList] The order details fetched  is :: ", data);
    if (!data.orders) {
      throw new Error("No order information recieved.");
    }
    let orderList = [];
    data.orders.map((rawOrderInfo) => {
      orderList.push(new Order(rawOrderInfo));
      return null;
    });
    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: orderList,
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
