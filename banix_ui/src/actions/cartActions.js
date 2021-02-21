import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from "../constants/cartConstants";
import { PRODUCT_SPECIFIC_URL } from "../config";
import { Product } from "../schema/products";
import { CustomerAddress } from "../schema/customer";
import { toast } from "react-toastify";

export const addToCart = (productId, qty) => async (dispatch, getState) => {
  const url = `${PRODUCT_SPECIFIC_URL}/${productId}`;
  console.log("[addToCart] The url prepared is ", url);
  const { data } = await axios.get(url);
  const product = new Product(data.product);
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      productId: product.productId,
      productPrimaryImage: product.productPrimaryImage,
      productName: product.productName,
      productCostPrice: product.productCostPrice,
      productSellingPrice: product.productSellingPrice,
      productStock: product.productStock,
      qty,
    },
  });
  toast.success(`Product "${product.productName}" added to cart!`);
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
  const shippingInfo = new CustomerAddress(shippingData);
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: shippingInfo,
  });
  localStorage.setItem("shippingAddress", JSON.stringify(shippingInfo));
};

export const savePaymentMethod = (paymentMethod) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: paymentMethod,
  });
  localStorage.setItem("paymentMethod", JSON.stringify(paymentMethod));
};
