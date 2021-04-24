// react
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// third-party
import { Helmet } from "react-helmet-async";

// component imports
import BlockLoader from "../blocks/BlockLoader";
import PageHeader from "../shared/PageHeader";

// actions import
import {
  getProductListing,
  getLatestProductListing,
} from "../../actions/products";
import { getCategoryListing } from "../../actions/category";

// data stubs
import theme from "../../data/theme";
import { url, getCategoryParents } from "../../services/utils";

const ShopPage = ({ categorySlug, columns, viewMode }) => {
  const dispatch = useDispatch();
  console.log(
    "[ShopPage] Information recieved to the ShopPage is ::: categorySlug [",
    categorySlug,
    "] columns [",
    columns,
    "] viewMode: [",
    viewMode,
    "]"
  );
  const offcanvas = columns === 3 ? "mobile" : "always";
  console.log("[ShopPage] The offcanvas value is :: ", offcanvas);

  const options = null;
  const filters = null;

  // initialize the categories
  const categoryInfo = useSelector((state) => state.categoryInfo);
  const {
    loading: categoriesLoading,
    categories,
    error: categoriesError,
  } = categoryInfo;
  useEffect(() => {
    dispatch(getCategoryListing(categorySlug));
  }, [dispatch, categorySlug]);
  console.log(
    "[ShopPage] The latest categories  loading, categories , error  is ::: ",
    categoriesLoading,
    categories,
    categoriesError
  );

  // initialize the products information
  const productListInfo = useSelector((state) => state.productListInfo);
  const {
    loading: productListLoading,
    products,
    error: productsListError,
  } = productListInfo;
  useEffect(() => {
    dispatch(getProductListing(categorySlug, options, filters));
  }, [dispatch, categorySlug, options, filters]);
  console.log(
    "[ShopPage] The Products loading , products , error is ::: ",
    productListLoading,
    products,
    productsListError
  );

  // initialize the latest products information
  const latestProductsInfo = useSelector((state) => state.latestProductsInfo);
  const {
    loading: latestPoductsLoading,
    latestProducts,
    error: latestProductsError,
  } = latestProductsInfo;
  useEffect(() => {
    dispatch(getLatestProductListing({ productCount: 5 }));
  }, [dispatch, offcanvas]);
  console.log(
    "[ShopPage] The latest Products loading, latestproducts , error  is ::: ",
    latestPoductsLoading,
    latestProducts,
    latestProductsError
  );
  if (categoriesLoading || productListLoading) {
    return <BlockLoader />;
  }

  const breadcrumb = [
    { title: "Home", url: url.home() },
    { title: "Shop", url: url.catalog() },
  ];
  // preparing the content
  let content = <div></div>;
  let pageTitle = "Shop";

  // const productsView = (
  // <ProductsView
  //   isLoading={state.productsListIsLoading}
  //   productsList={state.productsList}
  //   options={state.options}
  //   filters={state.filters}
  //   dispatch={dispatch}
  //   layout={viewMode}
  //   grid={`grid-${columns}-${columns > 3 ? "full" : "sidebar"}`}
  //   offcanvas={offcanvas}
  // />
  // );

  return (
    <React.Fragment>
      <Helmet>
        <title>{theme.name}</title>
        <meta name="description" content={theme.fullName} />
      </Helmet>

      <PageHeader header={pageTitle} breadcrumb={breadcrumb} />

      {content}
    </React.Fragment>
  );
};

export default ShopPage;
