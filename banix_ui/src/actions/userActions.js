import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_DETAILS_FETCH_REQUEST,
  USER_DETAILS_FETCH_SUCCESS,
  USER_DETAILS_FETCH_FAIL,
  USER_TOKEN_UPDATED,
  USER_DETAILS_UPDATE_REQUEST,
  USER_DETAILS_UPDATE_SUCCESS,
  USER_DETAILS_UPDATE_FAIL,
} from "../constants/userConstants";

import axios from "axios";
import { USER_LOGIN_URL, USER_REGISTER_URL, USER_PROFILE_URL } from "../config";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log("Logging in the user with the data ", USER_LOGIN_URL, {
      email,
      password,
    });
    const { data } = await axios.post(
      USER_LOGIN_URL,
      { email_id: email, password },
      config
    );
    if (!data.user_info) {
      throw "No user information recieved.";
    }
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data.user_info,
    });

    dispatch({
      type: USER_TOKEN_UPDATED,
      payload: { token: data.token },
    });
    localStorage.setItem("userInfo", JSON.stringify(data.user_info));
    localStorage.setItem("accessToken", JSON.stringify({ token: data.token }));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("accessToken");
  dispatch({ type: USER_LOGOUT });
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log("Logging in the user with the data ", USER_REGISTER_URL, {
      email,
      password,
    });
    const { data } = await axios.post(
      USER_REGISTER_URL,
      { display_name: name, email_id: email, password },
      config
    );
    // just to make sure that the empty {} is not saved as user info
    if (!data.user_info) {
      throw "No user information recieved.";
    }

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data.user_info,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data.user_info,
    });

    localStorage.setItem("userInfo", JSON.stringify(data.user_info));
    localStorage.setItem("accessToken", JSON.stringify({ token: data.token }));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserDetails = () => async (dispatch, getState) => {
  const {
    userToken: { tokenInfo },
  } = getState();
  console.log("[getUserDetails] The user token is :: ", tokenInfo);
  try {
    dispatch({
      type: USER_DETAILS_FETCH_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenInfo.token}`,
      },
    };

    const { data } = await axios.get(USER_PROFILE_URL, config);
    // just to make sure that the empty {} is not saved as user info
    if (!data.user_info) {
      throw "No user information recieved.";
    }

    dispatch({
      type: USER_DETAILS_FETCH_SUCCESS,
      payload: data.user_info,
    });

    localStorage.setItem("userInfo", JSON.stringify(data.user_info));
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FETCH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUserDetails = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_UPDATE_REQUEST,
    });
    const {
      userToken: { tokenInfo },
    } = getState();
    console.log("[updateUserDetails] The user token is :: ", tokenInfo);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenInfo.token}`,
      },
    };

    const { data } = await axios.put(USER_PROFILE_URL, user, config);
    // just to make sure that the empty {} is not saved as user info
    if (!data.user_info) {
      throw "No user information recieved.";
    }

    dispatch({
      type: USER_DETAILS_UPDATE_SUCCESS,
      payload: data.user_info,
    });

    localStorage.setItem("userInfo", JSON.stringify(data.user_info));
  } catch (error) {
    dispatch({
      type: USER_DETAILS_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
