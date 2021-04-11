import { makeIdGenerator } from "../utils";
import brandsData from "./brands";
import { categoriesListData, prepareCategory } from "./categories";

const getId = makeIdGenerator();

const attributesDef = [
  {
    name: "Color",
    slug: "color",
    values: [
      { name: "White", slug: "white" },
      { name: "Silver", slug: "silver" },
      { name: "Light Gray", slug: "light-gray" },
      { name: "Gray", slug: "gray" },
      { name: "Dark Gray", slug: "dark-gray" },
      { name: "Coal", slug: "coal" },
      { name: "Black", slug: "black" },
      { name: "Red", slug: "red" },
      { name: "Orange", slug: "orange" },
      { name: "Yellow", slug: "yellow" },
      { name: "Pear Green", slug: "pear-green" },
      { name: "Green", slug: "green" },
      { name: "Emerald", slug: "emerald" },
      { name: "Shamrock", slug: "shamrock" },
      { name: "Shakespeare", slug: "shakespeare" },
      { name: "Blue", slug: "blue" },
      { name: "Dark Blue", slug: "dark-blue" },
      { name: "Violet", slug: "violet" },
      { name: "Purple", slug: "purple" },
      { name: "Cerise", slug: "cerise" },
    ],
  },
  {
    name: "Led",
    slug: "led-multicolor-lightstrip",
    values: [{ name: "750 RPM", slug: "750-rpm" }],
  },
  {
    name: "Power Source",
    slug: "power-source",
    values: [{ name: "Cordless-Electric", slug: "cordless-electric" }],
  },
  {
    name: "Battery Cell Type",
    slug: "battery-cell-type",
    values: [{ name: "Lithium", slug: "lithium" }],
  },
  {
    name: "Voltage",
    slug: "voltage",
    values: [{ name: "20 Volts", slug: "20-volts" }],
  },
  {
    name: "Battery Capacity",
    slug: "battery-capacity",
    values: [{ name: "2 Ah", slug: "2-Ah" }],
  },
];

const productsDef = [
  {
    slug: "led-multicolor-lightstrip",
    name: "Vithamas Smart LED Strip Light Multicolor",
    price: 999,
    images: [
      "/media/images/card/1__vithamas_led_strip__primary__image.jpg",
      "/media/images/card/1__vithamas_led_strip__primary__image.jpg",
    ],
    badges: "new",
    rating: 4,
    reviews: 12,
    availability: "In stock",
    brand: "banix",
    categories: ["LED Strip"],
    attributes: [
      { slug: "color", values: "yellow" },
      { slug: "speed", values: "750-rpm", featured: true },
      { slug: "power-source", values: "cordless-electric", featured: true },
      { slug: "battery-cell-type", values: "lithium", featured: true },
      { slug: "voltage", values: "20-volts", featured: true },
      { slug: "battery-capacity", values: "2-Ah", featured: true },
    ],
    alternatePurchases: [
      {
        source: "amazon",
        icon: ["fab", "amazon"],
        link:
          "https://www.amazon.in/Vithamas-Smart-Multicolor-Powered-Banix/dp/B08TMCRLSW",
      },
      {
        source: "flipkart",
        icon: ["fab", "facebook"],
        link:
          "https://www.amazon.in/Vithamas-Smart-Multicolor-Powered-Banix/dp/B08TMCRLSW",
      },
    ],
  },
  {
    slug: "Vithamas Smart DC LED Strip Light Multicolor",
    name: "Vithamas Smart DC LED Strip Light Multicolor",
    price: 1299,
    images: [
      "/media/images/card/2__smart_led_bulb__primary__image.jpg",
      "/media/images/card/2__smart_led_bulb__primary__image.jpg",
    ],
    badges: "hot",
    rating: 5,
    reviews: 3,
    availability: "In stock",
    brand: "banix",
    categories: ["instruments"],
    attributes: [
      { slug: "color", values: ["silver", "cerise"] },
      { slug: "speed", values: "750-rpm", featured: true },
      { slug: "power-source", values: "cordless-electric", featured: true },
      { slug: "battery-cell-type", values: "lithium", featured: true },
      { slug: "voltage", values: "20-volts", featured: true },
      { slug: "battery-capacity", values: "2-Ah", featured: true },
    ],
    alternatePurchases: [
      {
        source: "amazon",
        icon: ["fab", "amazon"],
        link:
          "https://www.amazon.in/Vithamas-Smart-Multicolor-Powered-Banix/dp/B08TMCRLSW",
      },
      {
        source: "flipkart",
        icon: ["fab", "facebook"],
        link:
          "https://www.amazon.in/Vithamas-Smart-Multicolor-Powered-Banix/dp/B08TMCRLSW",
      },
    ],
  },
  {
    slug: "Vithamas Smart LED Strip Light Multicolor - 5 meters",
    name: "Vithamas Smart LED Strip Light Multicolor - 5 meters",
    price: 1499,
    compareAtPrice: 1600,
    badges: "sale",
    images: [
      "/media/images/card/3__vithamas_dc_lightstrip__primary__image.jpg",
      "/media/images/card/3__vithamas_dc_lightstrip__primary__image.jpg",
    ],
    rating: 4,
    reviews: 8,
    availability: "In stock",
    brand: "banix",
    categories: ["power-tools"],
    attributes: [
      { slug: "color", values: "yellow" },
      { slug: "speed", values: "750-rpm", featured: true },
      { slug: "power-source", values: "cordless-electric", featured: true },
      { slug: "battery-cell-type", values: "lithium", featured: true },
      { slug: "voltage", values: "20-volts", featured: true },
      { slug: "battery-capacity", values: "2-Ah", featured: true },
    ],
    alternatePurchases: [
      {
        source: "amazon",
        icon: ["fab", "amazon"],
        link:
          "https://www.amazon.in/Vithamas-Smart-Multicolor-Powered-Banix/dp/B08TMCRLSW",
      },
      {
        source: "flipkart",
        icon: ["fab", "facebook"],
        link:
          "https://www.amazon.in/Vithamas-Smart-Multicolor-Powered-Banix/dp/B08TMCRLSW",
      },
    ],
  },
  {
    slug: "Vithamas Smart LED Strip Light Multicolor - 10 meters",
    name: "Vithamas Smart LED Strip Light Multicolor - 10 meters",
    price: 1499,
    compareAtPrice: 1600,
    badges: "sale",
    images: [
      "/media/images/card/3__vithamas_dc_lightstrip__primary__image.jpg",
      "/media/images/card/3__vithamas_dc_lightstrip__primary__image.jpg",
    ],
    rating: 4,
    reviews: 8,
    availability: "In stock",
    brand: "banix",
    categories: ["power-tools"],
    attributes: [
      { slug: "color", values: "yellow" },
      { slug: "speed", values: "750-rpm", featured: true },
      { slug: "power-source", values: "cordless-electric", featured: true },
      { slug: "battery-cell-type", values: "lithium", featured: true },
      { slug: "voltage", values: "20-volts", featured: true },
      { slug: "battery-capacity", values: "2-Ah", featured: true },
    ],
    alternatePurchases: [
      {
        source: "amazon",
        icon: ["fab", "amazon"],
        link:
          "https://www.amazon.in/Vithamas-Smart-Multicolor-Powered-Banix/dp/B08TMCRLSW",
      },
      {
        source: "flipkart",
        icon: ["fab", "facebook"],
        link:
          "https://www.amazon.in/Vithamas-Smart-Multicolor-Powered-Banix/dp/B08TMCRLSW",
      },
    ],
  },
];

const productsData = productsDef.map((productDef) => {
  let badges = [];

  if (productDef.badges) {
    badges =
      typeof productDef.badges === "string"
        ? [productDef.badges]
        : productDef.badges;
  }

  const categories = categoriesListData
    .filter((category) => productDef.categories.includes(category.slug))
    .map((category) => prepareCategory(category));

  const attributes = (productDef.attributes || [])
    .map((productAttributeDef) => {
      const attributeDef = attributesDef.find(
        (x) => x.slug === productAttributeDef.slug
      );

      if (!attributeDef) {
        return null;
      }

      let valuesDef = [];

      if (typeof productAttributeDef.values === "string") {
        valuesDef = [productAttributeDef.values];
      } else if (productAttributeDef.values) {
        valuesDef = productAttributeDef.values;
      }

      const values = valuesDef
        .map((valueSlug) => {
          const valueDef = attributeDef.values.find(
            (x) => x.slug === valueSlug
          );

          if (!valueDef) {
            return null;
          }

          return {
            ...valueDef,
            customFields: {},
          };
        })
        .filter((x) => x !== null);

      if (!values.length) {
        return null;
      }

      return {
        name: attributeDef.name,
        slug: attributeDef.slug,
        featured: !!productAttributeDef.featured,
        values,
        customFields: {},
      };
    })
    .filter((x) => x !== null);

  return {
    id: getId(),
    name: productDef.name,
    sku: "83690/32",
    slug: productDef.slug,
    price: productDef.price,
    compareAtPrice: productDef.compareAtPrice || null,
    images: productDef.images.slice(),
    badges: badges.slice(),
    rating: productDef.rating,
    reviews: productDef.reviews,
    availability: productDef.availability,
    brand: brandsData.find((x) => x.slug === productDef.brand) || null,
    categories,
    attributes,
    customFields: {},
    alternatePurchases: productDef.alternatePurchases || [],
  };
});

export default productsData;
