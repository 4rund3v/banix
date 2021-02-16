import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_REQUEST,
} from "../constants/orderConstants";
import axios from "axios";
import { CREATE_ORDER_URL } from "../config";
import { Order } from "../schema/order";

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
    console.log(
      "[createOrder] The order info recieved to create is :: ",
      order
    );
    const { data } = await axios.post(CREATE_ORDER_URL, order, config);
    // // just to make sure that the empty {} is not saved as customer info
    // if (!data.customer_info) {
    //   throw new Error("No customer information recieved.");
    // }
    const orderInfo = new Order(data.order_info);
    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: orderInfo,
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
