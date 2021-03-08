import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
  productDetailsReducer,
} from "./reducers/productReducers";

import { cartReducer } from "./reducers/cartReducers";

import {
  customerLoginReducer,
  customerRegisterReducer,
  customerDetailsReducer,
  customerDetailsUpdateReducer,
  customerTokenReducer,
  customerAddressReducer,
  customerAddressCreateReducer,
  customerAddressUpdateReducer,
  customerPasswordUpdateReducer,
} from "./reducers/customerReducers";

import { shippingCostReducer } from "./reducers/shippingReducers";
import {
  OrderCreateReducer,
  OrderPrepareReducer,
  OrderDetailsReducer,
  OrderListReducer,
} from "./reducers/orderReducers";

const reducer = combineReducers({
  // listing the products
  productList: productListReducer,
  productDetails: productDetailsReducer,
  shippingCost: shippingCostReducer,
  // customer cart
  cart: cartReducer,
  // customer login
  customerLogin: customerLoginReducer,
  customerToken: customerTokenReducer,
  customerRegister: customerRegisterReducer,
  // customer profile
  customerDetails: customerDetailsReducer,
  customerDetailsUpdate: customerDetailsUpdateReducer,
  customerPasswordUpdate: customerPasswordUpdateReducer,
  // customer address
  customerAddress: customerAddressReducer,
  // customerAddressCreate: customerAddressCreateReducer,
  // customerAddressUpdate: customerAddressUpdateReducer,
  // Order information
  orderPrepare: OrderPrepareReducer,
  orderCreate: OrderCreateReducer,
  orderDetails: OrderDetailsReducer,
  orderList: OrderListReducer,
});

// Customer related info fetch
const customerInfoFromStorage = localStorage.getItem("customerInfo")
  ? JSON.parse(localStorage.getItem("customerInfo"))
  : null;
const tokenFromStorage = localStorage.getItem("accessToken")
  ? JSON.parse(localStorage.getItem("accessToken"))
  : null;
// Customer cart related info fetch
const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
// Customer shipping address fecth
const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  customerLogin: { customerInfo: customerInfoFromStorage },
  customerToken: { tokenInfo: tokenFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
