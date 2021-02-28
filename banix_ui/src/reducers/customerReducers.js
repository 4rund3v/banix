import {
  CUSTOMER_LOGIN_REQUEST,
  CUSTOMER_LOGIN_SUCCESS,
  CUSTOMER_LOGIN_FAIL,
  CUSTOMER_LOGOUT,
  CUSTOMER_REGISTER_REQUEST,
  CUSTOMER_REGISTER_SUCCESS,
  CUSTOMER_REGISTER_FAIL,
  CUSTOMER_PROFILE_DETAILS_FETCH_REQUEST,
  CUSTOMER_PROFILE_DETAILS_FETCH_SUCCESS,
  CUSTOMER_PROFILE_DETAILS_FETCH_FAIL,
  CUSTOMER_PROFILE_DETAILS_UPDATE_REQUEST,
  CUSTOMER_PROFILE_DETAILS_UPDATE_SUCCESS,
  CUSTOMER_PROFILE_DETAILS_UPDATE_FAIL,
  CUSTOMER_TOKEN_UPDATED,
  CUSTOMER_ADDRESS_CREATE_REQUEST,
  CUSTOMER_ADDRESS_CREATE_SUCCESS,
  CUSTOMER_ADDRESS_CREATE_FAIL,
  CUSTOMER_ADDRESS_FETCH_REQUEST,
  CUSTOMER_ADDRESS_FETCH_SUCCESS,
  CUSTOMER_ADDRESS_FETCH_FAIL,
} from "../constants/customerConstants";

export const customerLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case CUSTOMER_LOGIN_REQUEST:
      return { loading: true };
    case CUSTOMER_LOGIN_SUCCESS:
      return { loading: false, customerInfo: action.payload };
    case CUSTOMER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case CUSTOMER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const customerTokenReducer = (state = {}, action) => {
  switch (action.type) {
    case CUSTOMER_TOKEN_UPDATED:
      return { tokenInfo: action.payload };
    default:
      return state;
  }
};

export const customerRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case CUSTOMER_REGISTER_REQUEST:
      return { loading: true };
    case CUSTOMER_REGISTER_SUCCESS:
      return { loading: false, customerInfo: action.payload };
    case CUSTOMER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const customerDetailsReducer = (state = { customer: {} }, action) => {
  switch (action.type) {
    case CUSTOMER_PROFILE_DETAILS_FETCH_REQUEST:
      return { ...state, loading: true };
    case CUSTOMER_PROFILE_DETAILS_FETCH_SUCCESS:
      return { loading: false, customer: action.payload };
    case CUSTOMER_PROFILE_DETAILS_FETCH_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const customerDetailsUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case CUSTOMER_PROFILE_DETAILS_UPDATE_REQUEST:
      return { loading: true };
    case CUSTOMER_PROFILE_DETAILS_UPDATE_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };
    case CUSTOMER_PROFILE_DETAILS_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const customerAddressReducer = (state = { addresses: [] }, action) => {
  switch (action.type) {
    case CUSTOMER_ADDRESS_FETCH_REQUEST:
      return { ...state, loading: true };
    case CUSTOMER_ADDRESS_FETCH_SUCCESS:
      console.log("CUSTOMER_ADDRESS_FETCH_SUCCESS ::: ", action.payload);
      return { loading: false, addresses: action.payload };
    case CUSTOMER_ADDRESS_FETCH_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
