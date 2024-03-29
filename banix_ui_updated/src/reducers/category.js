import {
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
} from "../constants/category";

export const categoryListReducer = (state = { categories: [] }, action) => {
  console.log(
    "[categoryListReducer] Invoked with the category action.type : ",
    action.type
  );
  switch (action.type) {
    case CATEGORY_LIST_REQUEST:
      return { loading: true };
    case CATEGORY_LIST_SUCCESS:
      return { loading: false, categories: action.payload };
    case CATEGORY_LIST_FAIL:
      return { loading: false, categories: action.payload };
    default:
      return state;
  }
};
