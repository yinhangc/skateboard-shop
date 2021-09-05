import axios from "axios";
import { CART_MODIFY_REQUEST, CART_MODIFY_SUCCESS, CART_MODIFY_FAIL } from "../constants/cartConstant";
import { USER_SET_DETAILS } from "../constants/userConstant";

export const addToCart = (productDetails, qty) => async (dispatch, getState) => {
  try {
    dispatch({ type: CART_MODIFY_REQUEST });
    const { userDetails } = getState();
    const product = {
      productId: productDetails._id,
      qty
    };
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userDetails.token}`
      }
    };
    const { data } = await axios.post('api/users/cart', product, config);
    dispatch({ type: CART_MODIFY_SUCCESS });
    dispatch({ type: USER_SET_DETAILS, payload: { ...data, token: userDetails.token } });
  } catch (err) {
    dispatch({ type: CART_MODIFY_FAIL, payload: err.response && err.response.data.message ? err.response.data.message : err.message })
  }
};

export const removeFromCart = (productId) => async (dispatch, getState) => {
  try {
    dispatch({ type: CART_MODIFY_REQUEST });
    const { userDetails } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userDetails.token}`
      }
    };
    const { data } = await axios.delete(`api/users/cart/${productId}`, config);
    dispatch({ type: CART_MODIFY_SUCCESS });
    dispatch({ type: USER_SET_DETAILS, payload: { ...data, token: userDetails.token } });
  } catch (err) {
    dispatch({ type: CART_MODIFY_FAIL, payload: err.response && err.response.data.message ? err.response.data.message : err.message })
  }
};