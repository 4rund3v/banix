import axios from "axios";
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAILED,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAILED,
} from "../constants/productConstants";
import {
  SERVICEABILITY_REQUEST,
  SERVICEABILITY_SUCCESS,
  SERVICEABILITY_FAILED,
} from "../constants/shippingConstants";
import {
  PRODUCT_LIST_URL,
  PRODUCT_SPECIFIC_URL,
  SERVICEABILITY_URL,
} from "../config";
import { Product } from "../schema/products";
import { ServiceabilityInfo } from "../schema/shipping";

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    console.log("[listProducts] The product list url is :::", PRODUCT_LIST_URL);
    const { data } = await axios.get(PRODUCT_LIST_URL);
    const processedPoducts = data.products.map(
      (rawProduct) => new Product(rawProduct)
    );
    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: processedPoducts,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getProductDetails = (productId) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const { data } = await axios.get(`${PRODUCT_SPECIFIC_URL}/${productId}`);
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const fetchServiceabilityDetails = (productId, pinCode) => async (
  dispatch
) => {
  console.log(
    "fetchServiceabilityDetails :: productId &  pinCode are ",
    productId,
    pinCode
  );
  try {
    dispatch({ type: SERVICEABILITY_REQUEST });
    const { data } = await axios.get(
      `${SERVICEABILITY_URL}?pin_code=${pinCode}`
    );
    const serviceabilityInfo = new ServiceabilityInfo(data);
    console.log(
      "[fetchServiceabilityDetails] Data recieved is  & the serviceability info prepared is :: ",
      data,
      serviceabilityInfo
    );

    dispatch({
      type: SERVICEABILITY_SUCCESS,
      payload: serviceabilityInfo,
    });
  } catch (error) {
    dispatch({
      type: SERVICEABILITY_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
