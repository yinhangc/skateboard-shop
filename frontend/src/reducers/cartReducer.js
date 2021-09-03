import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstant"

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_GET_REQUEST:
      return {
        loading: true
      }

    case CART_GET_SUCCESS:
      return {
        loading: false,
        cartItems: action.payload,
      }

    case CART_GET_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case CART_ADD_ITEM:
      const item = action.payload;

    case CART_REMOVE_ITEM:

    default:
      return state
  }
}