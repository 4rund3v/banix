import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

// users
import avatar2 from "../../../assets/images/users/avatar-2.jpg";

const ProfileMenu = () => {
  let username = "Admin";
  if (localStorage.getItem("authUser")) {
    const obj = JSON.parse(localStorage.getItem("authUser"));
    const uNm = obj.email.split("@")[0];
    username = uNm.charAt(0).toUpperCase() + uNm.slice(1);
  }
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const menuItems = [
    {
      menuItemName: "Profile",
      menuItemClass: "ri-user-line align-middle mr-1",
    },
    {
      menuItemName: "Orders",
      menuItemClass: "ri-wallet-2-line align-middle mr-1",
    },
    {
      menuItemName: "Log-Out",
      menuItemClass: "ri-shut-down-line align-middle mr-1 text-danger",
    },
  ];
  return (
    <React.Fragment>
      <Dropdown
        isOpen={menuOpen}
        toggle={toggleMenu}
        className="d-inline-block user-dropdown mr-2"
      >
        <DropdownToggle
          tag="button"
          className="btn header-item waves-effect"
          id="page-header-user-dropdown"
        >
          <img
            className="rounded-circle header-profile-user mr-1"
            src={avatar2}
            alt="Header Avatar"
          />
          <span className="d-none d-xl-inline-block ml-1 text-transform">
            {username}
          </span>
          <i className="mdi mdi-chevron-down d-none ml-1 d-xl-inline-block"></i>
        </DropdownToggle>

        <DropdownMenu right>
          {menuItems.map((menuItem) => {
            return (
              <DropdownItem href="#">
                <i className={menuItem.menuItemClass}></i>
                {menuItem.menuItemName}
              </DropdownItem>
            );
          })}
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

export default ProfileMenu;
