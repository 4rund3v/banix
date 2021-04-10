import { makeIdGenerator } from "../utils";

const getId = makeIdGenerator();

const categoriesDef = [
  {
    name: "Smart Electronics",
    slug: "Smart Electronics",
    items: 3,
    children: [],
  },
  {
    name: "Components",
    slug: "Components",
    items: 2,
    children: [],
  },
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
