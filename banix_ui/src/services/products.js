import axios from "axios";
import { PRODUCT_SPECIFIC_URL } from "../config";

export class Product {
  constructor(rawProduct) {
    this.productId = rawProduct._id;
    this.productName = rawProduct.name;
    this.productDescription = rawProduct.description;
    this.productPrice = rawProduct.price;
    this.productRating = rawProduct.rating;
    this.productTotalReviews = rawProduct.total_reviews;
    this.productStock = rawProduct.stock;
    this.productBrand = rawProduct.brand;
    this.productCategory = rawProduct.category;
    this.productImage = rawProduct.image;
    this.productOffers = rawProduct.offers;
  }
}

export const getProductById = async (productId) => {
  var productUrl = `${PRODUCT_SPECIFIC_URL}/${productId}`;
  const { data } = await axios.get(productUrl);
  console.log(`getProductbyId url${productUrl}:::${productId} ---> ${data}`);
  if (!data) {
    return {};
  }
  return new Product(data.product);
};
