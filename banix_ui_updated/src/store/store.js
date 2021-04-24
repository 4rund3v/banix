import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
// custom reducers
import {
  productListReducer,
  productLatestListReducer,
} from "../reducers/products";

import { categoryListReducer } from "../reducers/category";

const reducer = combineReducers({
  productListInfo: productListReducer,
  latestProductsInfo: productLatestListReducer,
  categoryInfo: categoryListReducer,
});

const initialState = {};

const middleware = [thunkMiddleware];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
