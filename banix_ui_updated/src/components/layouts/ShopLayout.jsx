import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
// store related
import PageCart from "../shop/ShopPageCart";
import PageCheckout from "../shop/ShopPageCheckout";
import PageCompare from "../shop/ShopPageCompare";
import PageWishlist from "../shop/ShopPageWishlist";
import ShopPageCategory from "../shop/ShopPageCategory";
import ShopPageOrderSuccess from "../shop/ShopPageOrderSuccess";
import ShopPageProduct from "../shop/ShopPageProduct";
import ShopPageTrackOrder from "../shop/ShopPageTrackOrder";

const ShopLayout = () => {
  console.log("[ShopLayout] Being Rendered");
  return (
    <Switch>
      <Redirect exact from="/shop" to="/" />
      <Route
        exact
        path={`/`}
        render={(props) => (
          <ShopPageCategory
            {...props}
            columns={3}
            viewMode="grid"
            sidebarPosition="start"
          />
        )}
      />

      <Route
        exact
        path="/shop/catalog/:categorySlug"
        render={(props) => (
          <ShopPageCategory
            {...props}
            columns={3}
            viewMode="grid"
            sidebarPosition="start"
            categorySlug={props.match.params.categorySlug}
          />
        )}
      />
      <Route
        exact
        path="/shop/products/:productSlug"
        render={(props) => (
          <ShopPageProduct
            {...props}
            layout="standard"
            productSlug={props.match.params.productSlug}
          />
        )}
      />
      <Redirect exact from="/shop/catalog" to="/" />
      <Route exact path="/shop/cart" component={PageCart} />
      <Route exact path="/shop/checkout" component={PageCheckout} />
      <Route
        exact
        path="/shop/checkout/success"
        component={ShopPageOrderSuccess}
      />
      <Route exact path="/shop/wishlist" component={PageWishlist} />
      <Route exact path="/shop/compare" component={PageCompare} />
      <Route exact path="/shop/track-order" component={ShopPageTrackOrder} />
    </Switch>
  );
};

export default ShopLayout;
