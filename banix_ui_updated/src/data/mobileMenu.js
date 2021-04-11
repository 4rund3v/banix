export default [
  {
    type: "link",
    label: "Smart Electronics",
    url: "",
    children: [],
  },
  {
    type: "link",
    label: "Components",
    url: "",
    children: [],
  },

  {
    type: "link",
    label: "Page Links",
    url: "",
    children: [
      {
        type: "link",
        label: "Shop",
        url: "/shop",
        children: [
          { type: "link", label: "Catalog", url: "/shop/catalog" },
          { type: "link", label: "Wishlist", url: "/shop/wishlist" },
          { type: "link", label: "Compare", url: "/shop/compare" },
          { type: "link", label: "Cart", url: "/shop/cart" },
          { type: "link", label: "Checkout", url: "/shop/checkout" },
        ],
      },
    ],
  },
  {
    type: "link",
    label: "Login",
    url: "/auth/login",
    children: [],
  },
  {
    type: "link",
    label: "Logout",
    url: "/auth/logout",
    children: [],
  },
];
