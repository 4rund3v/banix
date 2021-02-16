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
    this.productPrimaryImage = "";
    this.productPrimaryVideo = "";
    this.productCarouselMedia = [];
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
