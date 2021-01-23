import axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";
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
