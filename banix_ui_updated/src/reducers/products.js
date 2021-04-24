import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAIL,
  PRODUCT_LATEST_LIST_REQUEST,
  PRODUCT_LATEST_LIST_SUCCESS,
  PRODUCT_LATEST_LIST_FAIL,
} from "../constants/products";

export const productListReducer = (state = { products: [] }, action) => {
  console.log("[productListReducer] Invoked with the action : ", action.type);
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_LIST_FAIL:
      return { loading: false, products: action.payload };
    default:
      return state;
  }
};

export const productLatestListReducer = (
  state = { latestProducts: [] },
  action
) => {
  console.log(
    "[productLatestListReducer] Invoked with the action : ",
    action.type
  );
  switch (action.type) {
    case PRODUCT_LATEST_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_LATEST_LIST_SUCCESS:
      return { loading: false, latestProducts: action.payload };
    case PRODUCT_LATEST_LIST_FAIL:
      return { loading: false, latestProducts: action.payload };
    default:
      return state;
  }
};

export const productDetailReducer = (state = { product: {} }, action) => {
  console.log("[productDetailReducer] Invoked with the action : ", action.type);
  switch (action.type) {
    case PRODUCT_DETAIL_REQUEST:
      return { loading: true };
    case PRODUCT_DETAIL_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAIL_FAIL:
      return { loading: false, product: action.payload };
    default:
      return state;
  }
};
