import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from "../constants/userConstants";
import axios from "axios";
import { USER_LOGIN_URL } from "../config";

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
