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
