import {
  SERVICEABILITY_FAILED,
  SERVICEABILITY_REQUEST,
  SERVICEABILITY_SUCCESS,
} from "../constants/shippingConstants";

export const shippingCostReducer = (state = {}, action) => {
  switch (action.type) {
    case SERVICEABILITY_REQUEST:
      return { loading: true };
    case SERVICEABILITY_SUCCESS:
      return { loading: false, product: action.payload };
    case SERVICEABILITY_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
