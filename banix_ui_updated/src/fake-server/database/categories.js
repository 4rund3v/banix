import { makeIdGenerator } from "../utils";

const getId = makeIdGenerator();

const categoriesDef = [
  {
    name: "Smart Electronics",
    slug: "Smart Electronics",
    items: 272,
    children: [
      {
        name: "Light Strips",
        slug: "power-tools",
        image: "assets/images/categories/category-1.jpg",
        items: 370,
        children: [
          {
            name: "Drills & Mixers",
            slug: "drills-mixers",
            items: 57,
          },
          {
            name: "Cordless Screwdrivers",
            slug: "cordless-screwdrivers",
            items: 15,
          },
          {
            name: "Screwdrivers",
            slug: "screwdrivers",
            items: 126,
          },
          {
            name: "Wrenches",
            slug: "wrenches",
            items: 12,
          },
          {
            name: "Grinding Machines",
            slug: "grinding-machines",
            items: 25,
          },
          {
            name: "Milling Cutters",
            slug: "milling-cutters",
            items: 78,
          },
          {
            name: "Electric Spray Guns",
            slug: "electric-spray-guns",
            items: 3,
          },
        ],
      },
      {
        name: "Remotes",
        slug: "hand-tools",
        image: "assets/images/categories/category-2.jpg",
        items: 134,
        children: [
          {
            name: "Tool Kits",
            slug: "tool-kits",
            items: 57,
          },
          {
            name: "Hammers",
            slug: "hammers",
            items: 15,
          },
          {
            name: "Spanners",
            slug: "spanners",
            items: 5,
          },
          {
            name: "Handsaws",
            slug: "handsaws",
            items: 54,
          },
          {
            name: "Paint Tools",
            slug: "paint-tools",
            items: 13,
          },
        ],
      },
      //   {
      //     name: "Piese de schimb",
      //     slug: "machine-tools",
      //     image: "assets/images/categories/category-3.jpg",
      //     items: 302,
      //     children: [
      //       {
      //         name: "Lathes",
      //         slug: "lathes",
      //         items: 104,
      //       },
      //       {
      //         name: "Milling Machines",
      //         slug: "milling-machines",
      //         items: 12,
      //       },
      //       {
      //         name: "Grinding Machines",
      //         slug: "grinding-machines",
      //         items: 67,
      //       },
      //       {
      //         name: "CNC Machines",
      //         slug: "cnc-machines",
      //         items: 5,
      //       },
      //       {
      //         name: "Sharpening Machines",
      //         slug: "sharpening-machines",
      //         items: 88,
      //       },
      //     ],
      //   },
    ],
  },
  {
    name: "LEDS",
    slug: "instruments",
    items: 272,
    children: [
      {
        name: "Centrale Termice",
        slug: "power-tools",
        image: "assets/images/categories/category-1.jpg",
        items: 370,
        children: [
          {
            name: "Drills & Mixers",
            slug: "drills-mixers",
            items: 57,
          },
          {
            name: "Cordless Screwdrivers",
            slug: "cordless-screwdrivers",
            items: 15,
          },
          {
            name: "Screwdrivers",
            slug: "screwdrivers",
            items: 126,
          },
          {
            name: "Wrenches",
            slug: "wrenches",
            items: 12,
          },
          {
            name: "Grinding Machines",
            slug: "grinding-machines",
            items: 25,
          },
          {
            name: "Milling Cutters",
            slug: "milling-cutters",
            items: 78,
          },
          {
            name: "Electric Spray Guns",
            slug: "electric-spray-guns",
            items: 3,
          },
        ],
      },
      {
        name: "Cazane",
        slug: "hand-tools",
        image: "assets/images/categories/category-2.jpg",
        items: 134,
        children: [
          {
            name: "Tool Kits",
            slug: "tool-kits",
            items: 57,
          },
          {
            name: "Hammers",
            slug: "hammers",
            items: 15,
          },
          {
            name: "Spanners",
            slug: "spanners",
            items: 5,
          },
          {
            name: "Handsaws",
            slug: "handsaws",
            items: 54,
          },
          {
            name: "Paint Tools",
            slug: "paint-tools",
            items: 13,
          },
        ],
      },
      {
        name: "Arzatoare",
        slug: "machine-tools",
        image: "assets/images/categories/category-3.jpg",
        items: 302,
        children: [
          {
            name: "Lathes",
            slug: "lathes",
            items: 104,
          },
          {
            name: "Milling Machines",
            slug: "milling-machines",
            items: 12,
          },
          {
            name: "Grinding Machines",
            slug: "grinding-machines",
            items: 67,
          },
          {
            name: "CNC Machines",
            slug: "cnc-machines",
            items: 5,
          },
          {
            name: "Sharpening Machines",
            slug: "sharpening-machines",
            items: 88,
          },
        ],
      },
      {
        name: "Accesorii",
        slug: "machine-tools",
        image: "assets/images/categories/category-3.jpg",
        items: 302,
        children: [
          {
            name: "Lathes",
            slug: "lathes",
            items: 104,
          },
          {
            name: "Milling Machines",
            slug: "milling-machines",
            items: 12,
          },
          {
            name: "Grinding Machines",
            slug: "grinding-machines",
            items: 67,
          },
          {
            name: "CNC Machines",
            slug: "cnc-machines",
            items: 5,
          },
          {
            name: "Sharpening Machines",
            slug: "sharpening-machines",
            items: 88,
          },
        ],
      },
      {
        name: "Pompe de circulatie",
        slug: "machine-tools",
        image: "assets/images/categories/category-3.jpg",
        items: 302,
        children: [
          {
            name: "Lathes",
            slug: "lathes",
            items: 104,
          },
          {
            name: "Milling Machines",
            slug: "milling-machines",
            items: 12,
          },
          {
            name: "Grinding Machines",
            slug: "grinding-machines",
            items: 67,
          },
          {
            name: "CNC Machines",
            slug: "cnc-machines",
            items: 5,
          },
          {
            name: "Sharpening Machines",
            slug: "sharpening-machines",
            items: 88,
          },
        ],
      },
      {
        name: "Arzatoare",
        slug: "machine-tools",
        image: "assets/images/categories/category-3.jpg",
        items: 302,
        children: [
          {
            name: "Lathes",
            slug: "lathes",
            items: 104,
          },
          {
            name: "Milling Machines",
            slug: "milling-machines",
            items: 12,
          },
          {
            name: "Grinding Machines",
            slug: "grinding-machines",
            items: 67,
          },
          {
            name: "CNC Machines",
            slug: "cnc-machines",
            items: 5,
          },
          {
            name: "Sharpening Machines",
            slug: "sharpening-machines",
            items: 88,
          },
        ],
      },
      {
        name: "Sisteme Solare",
        slug: "machine-tools",
        image: "assets/images/categories/category-3.jpg",
        items: 302,
        children: [
          {
            name: "Lathes",
            slug: "lathes",
            items: 104,
          },
          {
            name: "Milling Machines",
            slug: "milling-machines",
            items: 12,
          },
          {
            name: "Grinding Machines",
            slug: "grinding-machines",
            items: 67,
          },
          {
            name: "CNC Machines",
            slug: "cnc-machines",
            items: 5,
          },
          {
            name: "Sharpening Machines",
            slug: "sharpening-machines",
            items: 88,
          },
        ],
      },
    ],
  },
  {
    name: "Components",
    slug: "instruments",
    items: 272,
    children: [
      {
        name: "Termice",
        slug: "power-tools",
        image: "assets/images/categories/category-1.jpg",
        items: 370,
        children: [
          {
            name: "Drills & Mixers",
            slug: "drills-mixers",
            items: 57,
          },
          {
            name: "Cordless Screwdrivers",
            slug: "cordless-screwdrivers",
            items: 15,
          },
          {
            name: "Screwdrivers",
            slug: "screwdrivers",
            items: 126,
          },
          {
            name: "Wrenches",
            slug: "wrenches",
            items: 12,
          },
          {
            name: "Grinding Machines",
            slug: "grinding-machines",
            items: 25,
          },
          {
            name: "Milling Cutters",
            slug: "milling-cutters",
            items: 78,
          },
          {
            name: "Electric Spray Guns",
            slug: "electric-spray-guns",
            items: 3,
          },
        ],
      },
      {
        name: "Climatizare",
        slug: "hand-tools",
        image: "assets/images/categories/category-2.jpg",
        items: 134,
        children: [
          {
            name: "Tool Kits",
            slug: "tool-kits",
            items: 57,
          },
          {
            name: "Hammers",
            slug: "hammers",
            items: 15,
          },
          {
            name: "Spanners",
            slug: "spanners",
            items: 5,
          },
          {
            name: "Handsaws",
            slug: "handsaws",
            items: 54,
          },
          {
            name: "Paint Tools",
            slug: "paint-tools",
            items: 13,
          },
        ],
      },
      {
        name: "Electrice",
        slug: "machine-tools",
        image: "assets/images/categories/category-3.jpg",
        items: 302,
        children: [
          {
            name: "Lathes",
            slug: "lathes",
            items: 104,
          },
          {
            name: "Milling Machines",
            slug: "milling-machines",
            items: 12,
          },
          {
            name: "Grinding Machines",
            slug: "grinding-machines",
            items: 67,
          },
          {
            name: "CNC Machines",
            slug: "cnc-machines",
            items: 5,
          },
          {
            name: "Sharpening Machines",
            slug: "sharpening-machines",
            items: 88,
          },
        ],
      },
      {
        name: "Altele",
        slug: "machine-tools",
        image: "assets/images/categories/category-3.jpg",
        items: 302,
        children: [
          {
            name: "Lathes",
            slug: "lathes",
            items: 104,
          },
          {
            name: "Milling Machines",
            slug: "milling-machines",
            items: 12,
          },
          {
            name: "Grinding Machines",
            slug: "grinding-machines",
            items: 67,
          },
          {
            name: "CNC Machines",
            slug: "cnc-machines",
            items: 5,
          },
          {
            name: "Sharpening Machines",
            slug: "sharpening-machines",
            items: 88,
          },
        ],
      },
    ],
  },
  //     {
  //         name: 'Boilere',
  //         slug: 'electronics',
  //         items: 54,
  //     },
];

function walkTree(defs, parent = null) {
  let list = [];
  const tree = defs.map((def) => {
    const category = {
      id: getId(),
      name: def.name,
      slug: def.slug,
      image: def.image || null,
      items: def.items || 0,
      customFields: {},
      parent,
      children: [],
    };

    const [childrenTree, childrenList] = walkTree(def.children || [], category);

    category.children = childrenTree;
    list = [...list, category, ...childrenList];

    return category;
  });

  return [tree, list];
}

export function prepareCategory(category, depth) {
  let children;

  if (depth && depth > 0) {
    children = category.children.map((x) => prepareCategory(x, depth - 1));
  }

  return JSON.parse(
    JSON.stringify({
      ...category,
      parent: category.parent ? prepareCategory(category.parent) : null,
      children,
    })
  );
}

export const [categoriesTreeData, categoriesListData] = walkTree(categoriesDef);
