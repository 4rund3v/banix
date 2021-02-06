import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from "../constants/cartConstants";
import { PRODUCT_SPECIFIC_URL } from "../config";
import { Product } from "../schema/products";

export const addToCart = (productId, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`${PRODUCT_SPECIFIC_URL}/${productId}`);
  const product = new Product(data.product);
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      productId: product.productId,
      productImage: product.productImage,
      productName: product.productName,
      productPrice: product.productPrice,
      productStock: product.productStock,
      qty,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: productId,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (shippingData) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: shippingData,
  });
  localStorage.setItem("shippingAddress", JSON.stringify(shippingData));
};

export const savePaymentMethod = (paymentMethod) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: paymentMethod,
  });
  localStorage.setItem("paymentMethod", JSON.stringify(paymentMethod));
};
