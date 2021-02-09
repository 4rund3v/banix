export class Product {
  constructor(rawProduct) {
    this.productId = rawProduct._id;
    this.productName = rawProduct.name;
    this.productDescription = rawProduct.description;
    this.productPrice = rawProduct.price;
    this.productSellingPrice = rawProduct.price - 30;
    this.productRating = rawProduct.rating;
    this.productTotalReviews = rawProduct.total_reviews;
    this.productStock = rawProduct.stock;
    this.productBrand = rawProduct.brand;
    this.productCategory = rawProduct.category;
    this.productImage = rawProduct.image;
    this.productOffers = rawProduct.offers;
  }
}
