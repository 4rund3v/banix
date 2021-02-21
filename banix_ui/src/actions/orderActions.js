import axios from "axios";
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_REQUEST,
  PREPARE_ORDER_INFO_REQUEST,
  PREPARE_ORDER_INFO_SUCCESS,
  PREPARE_ORDER_INFO_FAIL,
} from "../constants/orderConstants";
import { CREATE_ORDER_URL, PREPARE_ORDER_INFO_URL } from "../config";
import { Order, orderInfo } from "../schema/order";

export const createOrder = (order, orderInfo) => async (dispatch, getState) => {
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
    console.log(
      "[createOrder] The order info recieved to create is :: ",
      orderInfo
    );
    const { data } = await axios.post(CREATE_ORDER_URL, order, config);
    // // just to make sure that the empty {} is not saved as customer info
    // if (!data.customer_info) {
    //   throw new Error("No customer information recieved.");
    // }
    const newOrder = new Order(data.order_info);
    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: newOrder,
    });
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
