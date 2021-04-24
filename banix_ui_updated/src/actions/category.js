import axios from "axios";

import {
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
} from "../constants/category";

export class Category {
  constructor(rawCategoryInfo) {
    this.categoryId = rawCategoryInfo.category_id;
    this.categorySlug = rawCategoryInfo.slug;
  }
}

const FETCH_CATEGORIES_URL = "/api/categories";

export const getCategoryListing = (categorySlug) => async (dispatch) => {
  try {
    console.log(
      "[ACTION][getCategoryListing] The getCategoryListing invoked with the following paramerters :: ",
      categorySlug
    );
    dispatch({ type: CATEGORY_LIST_REQUEST });
    const { data } = await axios.get(FETCH_CATEGORIES_URL);
    if (data.categories === undefined) {
      throw new Error("Unable to fetch the categories");
    }
    const formattedCategories = data.categories.map(
      (rawCategory) => new Category(rawCategory)
    );
    dispatch({
      type: CATEGORY_LIST_SUCCESS,
      payload: formattedCategories,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
