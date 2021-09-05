import axios from "axios";
import { USER_SET_DETAILS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_RESET_DETAILS, USER_LOGIN_RESET } from "../constants/userConstant";

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

export const register = () => async (dispatch) => {

};