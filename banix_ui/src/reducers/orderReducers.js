import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  PREPARE_ORDER_INFO_REQUEST,
  PREPARE_ORDER_INFO_SUCCESS,
  PREPARE_ORDER_INFO_FAIL,
} from "../constants/orderConstants";

export const OrderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { loading: true };
    case ORDER_CREATE_SUCCESS:
      return { loading: false, success: true, order: action.payload };
    case ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const OrderPrepareReducer = (state = { orderInfo: {} }, action) => {
  switch (action.type) {
    case PREPARE_ORDER_INFO_REQUEST:
      return { loading: true, orderInfo: {} };
    case PREPARE_ORDER_INFO_SUCCESS:
      return { loading: false, success: true, orderInfo: action.payload };
    case PREPARE_ORDER_INFO_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
