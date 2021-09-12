import axios from "axios";
import { USER_SET_DETAILS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_RESET_DETAILS, USER_LOGIN_RESET, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_RESET, USER_REGISTER_RESET } from "../constants/userConstant";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const { data } = await axios.post('/api/users/login', { email, password }, config);
    dispatch({
      type: USER_LOGIN_SUCCESS,
    });
    dispatch({
      type: USER_SET_DETAILS,
      payload: data,
    });
  } catch (err) {
    dispatch({ type: USER_LOGIN_FAIL, payload: err.response && err.response.data.message ? err.response.data.message : err.message });
  }
};

export const logout = () => async (dispatch) => {
  dispatch({ type: USER_RESET_DETAILS });
  dispatch({ type: USER_LOGIN_RESET });
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const { data } = await axios.post('/api/users', { name, email, password }, config);
    dispatch({
      type: USER_SET_DETAILS,
      payload: data,
    });
    dispatch({ type: USER_REGISTER_SUCCESS });
  } catch (err) {
    dispatch({ type: USER_REGISTER_FAIL, payload: err.response && err.response.data.message ? err.response.data.message : err.message });
    setTimeout(() => {
      dispatch({ type: USER_REGISTER_RESET });
    }, 3000);
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_REQUEST });
    const { userDetails } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userDetails.token}`
      }
    };
    const { data } = await axios.put('api/users/profile', user, config)
    dispatch({ type: USER_UPDATE_SUCCESS });
    dispatch({ type: USER_SET_DETAILS, payload: { ...data, token: userDetails.token } });
    setTimeout(() => {
      dispatch({ type: USER_UPDATE_RESET });
    }, 4000);
  } catch (err) {
    dispatch({ type: USER_UPDATE_FAIL, payload: err.response && err.response.data.message ? err.response.data.message : err.message });
  }
};