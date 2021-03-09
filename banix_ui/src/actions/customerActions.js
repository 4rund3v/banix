import axios from "axios";
import { toast } from "react-toastify";
// Third party
import {
  // LOGIN process
  CUSTOMER_LOGIN_FAIL,
  CUSTOMER_LOGIN_REQUEST,
  CUSTOMER_LOGIN_SUCCESS,
  CUSTOMER_LOGOUT,
  CUSTOMER_TOKEN_UPDATED,
  // Registration
  CUSTOMER_REGISTER_FAIL,
  CUSTOMER_REGISTER_REQUEST,
  CUSTOMER_REGISTER_SUCCESS,
  // fetch profile details
  CUSTOMER_PROFILE_DETAILS_FETCH_REQUEST,
  CUSTOMER_PROFILE_DETAILS_FETCH_SUCCESS,
  CUSTOMER_PROFILE_DETAILS_FETCH_FAIL,
  // Profile details update
  CUSTOMER_PROFILE_DETAILS_UPDATE_REQUEST,
  CUSTOMER_PROFILE_DETAILS_UPDATE_SUCCESS,
  CUSTOMER_PROFILE_DETAILS_UPDATE_FAIL,
  //address fetch
  CUSTOMER_ADDRESS_FETCH_REQUEST,
  CUSTOMER_ADDRESS_FETCH_SUCCESS,
  CUSTOMER_ADDRESS_FETCH_FAIL,
  //address creation
  CUSTOMER_ADDRESS_CREATE_REQUEST,
  CUSTOMER_ADDRESS_CREATE_SUCCESS,
  CUSTOMER_ADDRESS_CREATE_FAIL,
  // address update
  CUSTOMER_ADDRESS_UPDATE_REQUEST,
  CUSTOMER_ADDRESS_UPDATE_SUCCESS,
  CUSTOMER_ADDRESS_UPDATE_FAIL,
  CUSTOMER_LOGIN_STATUS_REQUEST,
  CUSTOMER_LOGIN_STATUS_FAIL,
  CUSTOMER_LOGIN_STATUS_SUCCESS,
} from "../constants/customerConstants";

import {
  CUSTOMER_LOGIN_URL,
  CUSTOMER_REGISTER_URL,
  CUSTOMER_PROFILE_URL,
  CUSTOMER_PROFILE_PASSWORD_URL,
  CUSTOMER_ADDRESS_URL,
  CUSTOMER_LOGIN_STATUS_URL,
} from "../config";

import { Customer, CustomerAddress } from "../schema/customer";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: CUSTOMER_LOGIN_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const loginData = {
      email_id: email,
      password: password,
    };
    const { data } = await axios.post(CUSTOMER_LOGIN_URL, loginData, config);

    if (!data.customer_info) {
      throw new Error("No customer information recieved.");
    }
    const customerInfo = new Customer(data.customer_info);
    dispatch({
      type: CUSTOMER_LOGIN_SUCCESS,
      payload: customerInfo,
    });
    toast.success(`Logged In !`);
    dispatch({
      type: CUSTOMER_TOKEN_UPDATED,
      payload: { token: data.token },
    });
    dispatch({
      type: CUSTOMER_LOGIN_STATUS_SUCCESS,
      payload: true,
    });
    localStorage.setItem("customerInfo", JSON.stringify(customerInfo));
    localStorage.setItem("accessToken", JSON.stringify({ token: data.token }));
  } catch (error) {
    dispatch({
      type: CUSTOMER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const loginStatusCheck = () => async (dispatch, getState) => {
  try {
    const {
      customerToken: { tokenInfo },
      customerLogin: { customerInfo },
    } = getState();

    dispatch({
      type: CUSTOMER_LOGIN_STATUS_REQUEST,
    });
    if (!customerInfo) {
      throw new Error("Customer Info not found, cannot check status of token");
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenInfo.token}`,
      },
    };

    const { data } = await axios.get(CUSTOMER_LOGIN_STATUS_URL, config);
    if (!data.customer_info) {
      throw new Error("No customer information recieved.");
    }

    dispatch({
      type: CUSTOMER_LOGIN_STATUS_SUCCESS,
      payload: true,
    });
  } catch (error) {
    localStorage.removeItem("customerInfo");
    localStorage.removeItem("accessToken");
    dispatch({ type: CUSTOMER_LOGOUT });
    dispatch({
      type: CUSTOMER_LOGIN_STATUS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("customerInfo");
  localStorage.removeItem("accessToken");
  dispatch({ type: CUSTOMER_LOGOUT });
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: CUSTOMER_REGISTER_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const registrationData = {
      display_name: name,
      email_id: email,
      password: password,
    };
    console.log(
      "[customerActions][register] Registring the customer with the given info :",
      CUSTOMER_REGISTER_URL,
      registrationData
    );
    const { data } = await axios.post(
      CUSTOMER_REGISTER_URL,
      registrationData,
      config
    );
    // just to make sure that the empty {} is not saved as customer info
    if (!data.customer_info) {
      throw new Error("No customer information recieved.");
    }
    const customerInfo = new Customer(data.customer_info);

    dispatch({
      type: CUSTOMER_REGISTER_SUCCESS,
      payload: customerInfo,
    });

    dispatch({
      type: CUSTOMER_LOGIN_SUCCESS,
      payload: customerInfo,
    });

    localStorage.setItem("customerInfo", JSON.stringify(customerInfo));
    localStorage.setItem("accessToken", JSON.stringify({ token: data.token }));
  } catch (error) {
    dispatch({
      type: CUSTOMER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getCustomerDetails = () => async (dispatch, getState) => {
  const {
    customerToken: { tokenInfo },
  } = getState();
  console.log("[getCustomerDetails] The customer token is :: ", tokenInfo);
  try {
    dispatch({
      type: CUSTOMER_PROFILE_DETAILS_FETCH_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenInfo.token}`,
      },
    };

    const { data } = await axios.get(CUSTOMER_PROFILE_URL, config);
    // just to make sure that the empty {} is not saved as customer info
    if (!data.customer_info) {
      throw new Error("No customer information recieved.");
    }
    const customerInfo = new Customer(data.customer_info);
    dispatch({
      type: CUSTOMER_PROFILE_DETAILS_FETCH_SUCCESS,
      payload: customerInfo,
    });

    localStorage.setItem("customerInfo", JSON.stringify(customerInfo));
  } catch (error) {
    dispatch({
      type: CUSTOMER_PROFILE_DETAILS_FETCH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateCustomerDetails = (customer) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: CUSTOMER_PROFILE_DETAILS_UPDATE_REQUEST,
    });
    const {
      customerToken: { tokenInfo },
    } = getState();
    console.log("[updateCustomerDetails] The customer token is :: ", tokenInfo);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenInfo.token}`,
      },
    };

    const { data } = await axios.put(CUSTOMER_PROFILE_URL, customer, config);
    // just to make sure that the empty {} is not saved as customer info
    if (!data.customer_info) {
      throw new Error("No customer information recieved.");
    }
    const customerInfo = new Customer(data.customer_info);
    dispatch({
      type: CUSTOMER_PROFILE_DETAILS_UPDATE_SUCCESS,
      payload: customerInfo,
    });

    localStorage.setItem("customerInfo", JSON.stringify(customerInfo));
  } catch (error) {
    dispatch({
      type: CUSTOMER_PROFILE_DETAILS_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateCustomerPassword = (customerPassword) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: CUSTOMER_PROFILE_DETAILS_UPDATE_REQUEST,
    });
    const {
      customerToken: { tokenInfo },
    } = getState();
    console.log(
      "[updateCustomerPassword] The customer token is :: ",
      tokenInfo
    );
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenInfo.token}`,
      },
    };

    const { data } = await axios.put(
      CUSTOMER_PROFILE_PASSWORD_URL,
      customerPassword,
      config
    );
    // just to make sure that the empty {} is not saved as customer info
    if (!data.customer_info) {
      throw new Error("No customer information recieved.");
    }
    const customerInfo = new Customer(data.customer_info);
    dispatch({
      type: CUSTOMER_PROFILE_DETAILS_UPDATE_SUCCESS,
      payload: customerInfo,
    });

    localStorage.setItem("customerInfo", JSON.stringify(customerInfo));
  } catch (error) {
    dispatch({
      type: CUSTOMER_PROFILE_DETAILS_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getCustomerAddress = (defaultAddress) => async (
  dispatch,
  getState
) => {
  const {
    customerToken: { tokenInfo },
  } = getState();
  console.log("[getCustomerAddress] The customer token is :: ", tokenInfo);
  try {
    dispatch({
      type: CUSTOMER_ADDRESS_FETCH_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenInfo.token}`,
      },
    };
    const url = defaultAddress
      ? `${CUSTOMER_ADDRESS_URL}?default=true`
      : CUSTOMER_ADDRESS_URL;
    console.log("[getCustomerAddress] The data fetch url is ::: ", url);
    const { data } = await axios.get(url, config);
    console.log("[getCustomerAddress] The data recieved is ::: ", data);
    // just to make sure that the empty {} is not saved as customer info
    if (!data.addresses) {
      throw new Error("No customer address recieved.");
    }

    const addressInfo = [];
    for (let i = 0; i < data.addresses.length; i++) {
      addressInfo.push(new CustomerAddress(data.addresses[i]));
    }
    dispatch({
      type: CUSTOMER_ADDRESS_FETCH_SUCCESS,
      payload: addressInfo,
    });
  } catch (error) {
    dispatch({
      type: CUSTOMER_ADDRESS_FETCH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createCustomerAddress = (customerAddress) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: CUSTOMER_ADDRESS_CREATE_REQUEST,
    });
    const {
      customerToken: { tokenInfo },
    } = getState();
    console.log("[createCustomerAddress] The customer token is :: ", tokenInfo);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenInfo.token}`,
      },
    };
    const cusstomerAddressPostData = customerAddress.toRawDict();
    console.log(
      "createCustomerAddress  customer address data to post is ::: ",
      cusstomerAddressPostData
    );
    const { data } = await axios.post(
      CUSTOMER_ADDRESS_URL,
      cusstomerAddressPostData,
      config
    );
    // just to make sure that the empty {} is not saved as customer info
    console.log(
      "createCustomerAddress  customer address addition response ",
      data
    );
    if (!data.address_id) {
      throw new Error("No address information recieved.");
    }
    dispatch({
      type: CUSTOMER_ADDRESS_CREATE_SUCCESS,
      payload: null,
    });
  } catch (error) {
    dispatch({
      type: CUSTOMER_ADDRESS_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateCustomerAddress = (modifiedCustomerAddress) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: CUSTOMER_ADDRESS_UPDATE_REQUEST,
    });
    const {
      customerToken: { tokenInfo },
    } = getState();
    console.log("[updateCustomerAddress] The customer token is :: ", tokenInfo);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenInfo.token}`,
      },
    };
    const cusstomerAddressUpdateData = modifiedCustomerAddress.toRawDict();
    console.log(
      "updateCustomerAddress  customer address data to update is ::: ",
      cusstomerAddressUpdateData
    );
    const url = `${CUSTOMER_ADDRESS_URL}/${modifiedCustomerAddress.addressId}`;
    const { data } = await axios.put(url, cusstomerAddressUpdateData, config);
    // just to make sure that the empty {} is not saved as customer info
    console.log(
      "updateCustomerAddress  customer address addition response ",
      data
    );
    if (!data.address_id) {
      throw new Error("No address information recieved.");
    }
    dispatch({
      type: CUSTOMER_ADDRESS_UPDATE_SUCCESS,
      payload: null,
    });
  } catch (error) {
    dispatch({
      type: CUSTOMER_ADDRESS_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
