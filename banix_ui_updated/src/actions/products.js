import axios from "axios";
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAIL,
  PRODUCT_LATEST_LIST_REQUEST,
  PRODUCT_LATEST_LIST_SUCCESS,
  PRODUCT_LATEST_LIST_FAIL,
  PRODUCT_SERVICEABILITY_REQUEST,
  PRODUCT_SERVICEABILITY_SUCCESS,
  PRODUCT_SERVICEABILITY_FAIL,
} from "../constants/products";

const FETCH_PRODUCTS_URL = "/api/products";
const FETCH_LATEST_PRODUCTS_URL = "/api/products/latest";
const FETCH_PRODUCT_DETAIL_URL = "/api/products/";
const FETCH_PRODUCT_SERVICEABILITY_URL = "/api/products/serviceability";

export class Product {
  constructor(rawProduct) {
    this.productId = rawProduct.product_id;
    this.productName = rawProduct.name;
    this.productBrand = rawProduct.brand;
    this.productCategory = rawProduct.category;
    this.productRating = rawProduct.rating;
    this.productTotalReviews = rawProduct.total_reviews;
    this.productCostPrice = rawProduct.cost_price;
    this.productSellingPrice = rawProduct.selling_price;
    this.productStock = rawProduct.stock;

    this.productSpecification = {};

    this.productPrimaryImage = "";
    this.productPrimaryVideo = "";
    this.productCarouselMedia = [];

    if (rawProduct.product_specification) {
      let productSpeicificationId = null;
      const productBoxDimensions = {};
      const productDimensions = {};
      const productVariants = [];
      let productDescription = "";
      const productBoxContents = [];
      const productFeatures = [];

      if (rawProduct.product_specification.product_specification_id) {
        productSpeicificationId =
          rawProduct.product_specification.product_specification_id;
      }

      this.productSpecification[
        "productSpeicificationId"
      ] = productSpeicificationId;
      if (rawProduct.product_specification.product_box_dimensions) {
        productBoxDimensions["depth"] =
          rawProduct.product_specification.product_box_dimensions["depth"];
        productBoxDimensions["height"] =
          rawProduct.product_specification.product_box_dimensions["height"];
        productBoxDimensions["width"] =
          rawProduct.product_specification.product_box_dimensions["width"];
        productBoxDimensions["length"] =
          rawProduct.product_specification.product_box_dimensions["length"];
        productBoxDimensions["weight"] =
          rawProduct.product_specification.product_box_dimensions["weight"];
      }
      this.productSpecification["productBoxDimensions"] = productBoxDimensions;

      if (rawProduct.product_specification.product_dimensions) {
        productDimensions["depth"] =
          rawProduct.product_specification.product_dimensions["depth"];
        productDimensions["height"] =
          rawProduct.product_specification.product_dimensions["height"];
        productDimensions["width"] =
          rawProduct.product_specification.product_dimensions["width"];
        productDimensions["length"] =
          rawProduct.product_specification.product_dimensions["length"];
        productDimensions["weight"] =
          rawProduct.product_specification.product_dimensions["weight"];
      }
      this.productSpecification["productDimensions"] = productDimensions;
      this.productSpecification["productVariants"] = productVariants;
      if (rawProduct.product_specification.product_description) {
        productDescription =
          rawProduct.product_specification.product_description;
      }

      this.productSpecification["productDescription"] = productDescription;
      if (rawProduct.product_specification.product_box_contents) {
        rawProduct.product_specification.product_box_contents.map((item) =>
          productBoxContents.push(item)
        );
      }
      this.productSpecification["productBoxContents"] = productBoxContents;
      this.productFeatures = productFeatures;
    }

    if (rawProduct.product_media) {
      this.productPrimaryImage = rawProduct.product_media.primary_image_id;
      this.productPrimaryVideo = rawProduct.product_media.primary_video_id;
      if (rawProduct.product_media.product_carousel_media) {
        rawProduct.product_media.product_carousel_media.map((carouselMedia) => {
          let item = {
            mediaId: carouselMedia.media_id,
            mediaType: carouselMedia.media_type,
            mediaText: this.productName,
            mediaPoster: carouselMedia.poster_id,
          };
          this.productCarouselMedia.push(item);
          return null;
        });
      }
    }
  }
  toRawDict() {
    return {
      product_id: this.productId,
    };
  }
}
export class ServiceabilityInfo {
  constructor(rawServiceabilityInfo) {
    this.serviceabilityId = rawServiceabilityInfo.serviceability_id;
    this.deliveryPinCode = rawServiceabilityInfo.dst_pin_code;
    this.courierCompanyId = rawServiceabilityInfo.courier_company_id;
    this.courierCompanyName = rawServiceabilityInfo.courier_name;
    this.estimatedDeliveryDays = rawServiceabilityInfo.estimated_delivery_days;
    this.deliveryRate = rawServiceabilityInfo.rate;
  }
}

export const getProductListing = (categorySlug, options, filters) => async (
  dispatch
) => {
  try {
    console.log(
      "[ACTION][getProductListing] The productlisting invoked with the following paramerters :: ",
      categorySlug,
      filters,
      options
    );
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await axios.get(FETCH_PRODUCTS_URL);
    if (data.products === undefined) {
      throw new Error("Unable to fetch the products");
    }
    const formattedProducts = data.products.map(
      (rawProduct) => new Product(rawProduct)
    );
    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: formattedProducts,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getProductDetails = (productId) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAIL_REQUEST });
    const { data } = await axios.get(`${FETCH_PRODUCT_DETAIL_URL}${productId}`);
    const formattedProduct = new Product(data.product);
    dispatch({
      type: PRODUCT_DETAIL_SUCCESS,
      payload: formattedProduct,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const getLatestProductListing = (productCount) => async (dispatch) => {
  console.log(
    "[ACTION][getLatestProductListing] fetching the latest products with the product count :: ",
    productCount
  );
  try {
    const productCountQuery = productCount ? productCount : 5;
    dispatch({ type: PRODUCT_LATEST_LIST_REQUEST });
    const { data } = await axios.get(FETCH_LATEST_PRODUCTS_URL, {
      latest: true,
      productCount: productCountQuery,
    });
    const formattedProducts = data.products.map(
      (rawProduct) => new Product(rawProduct)
    );
    dispatch({
      type: PRODUCT_LATEST_LIST_SUCCESS,
      payload: formattedProducts,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LATEST_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getSeriviceablilityDetails = (productId, pinCode) => async (
  dispatch
) => {
  try {
    dispatch({ type: PRODUCT_SERVICEABILITY_REQUEST });
    const { data } = await axios.get(
      `${FETCH_PRODUCT_SERVICEABILITY_URL}?pin_code=${pinCode}&product_id=${productId}`
    );
    const formattedServiceabilityInfo = new ServiceabilityInfo(data);
    dispatch({
      type: PRODUCT_SERVICEABILITY_SUCCESS,
      payload: formattedServiceabilityInfo,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_SERVICEABILITY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
