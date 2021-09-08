import { USER_RESET_DETAILS, USER_SET_DETAILS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_RESET, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_RESET } from "../constants/userConstant";

export const userDetailsReducer = (state = null, action) => {
  switch (action.type) {
    case USER_SET_DETAILS:
      return action.payload;
    case USER_RESET_DETAILS:
      return null;
    default:
      return state;
  }
};

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true, error: false };
    case USER_LOGIN_SUCCESS:
      return { loading: false, error: false };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGIN_RESET:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true, error: false, success: false };
    case USER_REGISTER_SUCCESS:
      return { loading: false, error: false, success: true };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload, success: false };
    case USER_REGISTER_RESET:
      return {};
    default:
      return state;
  }
};