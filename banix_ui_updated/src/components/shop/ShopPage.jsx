// react
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// third-party
import { Helmet } from "react-helmet-async";

// component imports
import BlockLoader from "../blocks/BlockLoader";
import PageHeader from "../shared/PageHeader";
import CategorySidebar from "./CategorySidebar";
import CategorySidebarItem from "./CategorySidebarItem";
import WidgetProducts from "../widgets/WidgetProducts";
import WidgetFilters from "../widgets/WidgetFilters";
import ProductsView from "./ProductsView";
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
  const sidebarPosition = "start";

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
    dispatch(getLatestProductListing({ productCount: 3 }));
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
  const productsListFilters = [
    {
      name: "Categories",
      slug: "category",
      type: "category",
      value: null,
      items: [
        {
          customFields: {},
          id: 1,
          image: null,
          items: 3,
          name: "Smart Electronics",
          parent: null,
          slug: "Smart Electronics",
        },
        {
          customFields: {},
          id: 1,
          image: null,
          items: 3,
          name: "Components",
          parent: null,
          slug: "components",
        },
      ],
    },
    {
      name: "Price",
      slug: "price",
      type: "range",
      min: 900,
      max: 1400,
      value: [900, 1400],
    },
    {
      name: "Brand",
      slug: "brand",
      type: "check",
      items: [{ slug: "banix", name: "Banix", count: 4 }],
      value: [],
    },
    {
      name: "Discount",
      slug: "discount",
      type: "radio",
      value: "any",
      items: [
        { slug: "any", name: "Any", count: 4 },
        { slug: "no", name: "No", count: 2 },
        { slug: "yes", name: "Yes", count: 2 },
      ],
    },
  ];
  const productsView = (
    <ProductsView
      isLoading={productListLoading}
      productsList={{
        items: products,
        filters: productsListFilters,
        page: 1,
        limit: 12,
        pages: 1,
        from: 1,
        to: 4,
        total: 4,
        sort: "default",
      }}
      options={{}}
      filters={{}}
      dispatch={dispatch}
      layout={viewMode}
      grid={`grid-${columns}-${columns > 3 ? "full" : "sidebar"}`}
      offcanvas={offcanvas}
    />
  );

  const sidebarComponent = (
    <CategorySidebar offcanvas={offcanvas}>
      <CategorySidebarItem>
        <WidgetFilters
          title="Filters"
          offcanvas={offcanvas}
          filters={productsListFilters}
          values={{}}
        />
      </CategorySidebarItem>
      {offcanvas !== "always" && (
        <CategorySidebarItem className="d-none d-lg-block">
          <WidgetProducts title="Latest Products" products={latestProducts} />
        </CategorySidebarItem>
      )}
    </CategorySidebar>
  );

  const sidebar = (
    <div className="shop-layout__sidebar">{sidebarComponent}</div>
  );

  content = (
    <div className="container">
      <div className={`shop-layout shop-layout--sidebar--${sidebarPosition}`}>
        {sidebarPosition === "start" && sidebar}
        <div className="shop-layout__content">
          <div className="block">{productsView}</div>
        </div>
      </div>
    </div>
  );

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
