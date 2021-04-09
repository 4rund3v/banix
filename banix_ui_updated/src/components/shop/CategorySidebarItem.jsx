// react
import React from "react";

// third-party
import classNames from "classnames";

const CategorySidebarItem = ({ children, className }) => {
  const classes = classNames("block-sidebar__item", className);
  return <div className={classes}>{children}</div>;
};

export default CategorySidebarItem;
