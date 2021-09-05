import thunk from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducer, productDetailsReducer } from "./reducers/productReducer";
import { userDetailsReducer, userLoginReducer } from './reducers/userReducer';
import { cartReducer } from './reducers/cartReducer';

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  userDetails: userDetailsReducer,
  userLogin: userLoginReducer,
  cart: cartReducer,
});

const middleware = [thunk];

const store = createStore(reducer, composeWithDevTools(applyMiddleware(...middleware)));

export default store;