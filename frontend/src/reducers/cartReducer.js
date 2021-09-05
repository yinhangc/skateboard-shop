import { CART_MODIFY_REQUEST, CART_MODIFY_SUCCESS, CART_MODIFY_FAIL } from "../constants/cartConstant"

export const cartReducer = (state = {}, action) => {
  switch (action.type) {
    case CART_MODIFY_REQUEST:
      return { loading: true, error: false };
    case CART_MODIFY_SUCCESS:
      return { loading: false, error: false };
    case CART_MODIFY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state
  }
}