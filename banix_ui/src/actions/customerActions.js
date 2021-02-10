import {
  CUSTOMER_LOGIN_FAIL,
  CUSTOMER_LOGIN_REQUEST,
  CUSTOMER_LOGIN_SUCCESS,
  CUSTOMER_LOGOUT,
  CUSTOMER_REGISTER_FAIL,
  CUSTOMER_REGISTER_REQUEST,
  CUSTOMER_REGISTER_SUCCESS,
  CUSTOMER_TOKEN_UPDATED,
  CUSTOMER_PROFILE_DETAILS_FETCH_REQUEST,
  CUSTOMER_PROFILE_DETAILS_FETCH_SUCCESS,
  CUSTOMER_PROFILE_DETAILS_FETCH_FAIL,
  CUSTOMER_PROFILE_DETAILS_UPDATE_REQUEST,
  CUSTOMER_PROFILE_DETAILS_UPDATE_SUCCESS,
  CUSTOMER_PROFILE_DETAILS_UPDATE_FAIL,
} from "../constants/customerConstants";

import axios from "axios";
import {
  CUSTOMER_LOGIN_URL,
  CUSTOMER_REGISTER_URL,
  CUSTOMER_PROFILE_URL,
} from "../config";

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
    console.log(
      "[customerActions][login] Logging in the customer with the data ",
      CUSTOMER_LOGIN_URL,
      loginData
    );
    const { data } = await axios.post(CUSTOMER_LOGIN_URL, loginData, config);
    console.log(
      "[customerActions][login] the data recieved after login is :: ",
      data
    );
    if (!data.customer_info) {
      throw new Error("No customer information recieved.");
    }
    dispatch({
      type: CUSTOMER_LOGIN_SUCCESS,
      payload: data.customer_info,
    });

    dispatch({
      type: CUSTOMER_TOKEN_UPDATED,
      payload: { token: data.token },
    });
    localStorage.setItem("customerInfo", JSON.stringify(data.customer_info));
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

    dispatch({
      type: CUSTOMER_REGISTER_SUCCESS,
      payload: data.customer_info,
    });

    dispatch({
      type: CUSTOMER_LOGIN_SUCCESS,
      payload: data.customer_info,
    });

    localStorage.setItem("customerInfo", JSON.stringify(data.customer_info));
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

    dispatch({
      type: CUSTOMER_PROFILE_DETAILS_FETCH_SUCCESS,
      payload: data.customer_info,
    });

    localStorage.setItem("customerInfo", JSON.stringify(data.customer_info));
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

    dispatch({
      type: CUSTOMER_PROFILE_DETAILS_UPDATE_SUCCESS,
      payload: data.customer_info,
    });

    localStorage.setItem("customerInfo", JSON.stringify(data.customer_info));
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
