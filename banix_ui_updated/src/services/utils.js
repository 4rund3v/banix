export const url = {
  home: () => "/",

  catalog: () => "/shop/catalog",

  category: (category) => `/shop/catalog/${category.slug}`,

  product: (product) => `/shop/products/${product.productSlug}`,
};

export function getCategoryParents(category) {
  return category.parent
    ? [...getCategoryParents(category.parent), category.parent]
    : [];
}
