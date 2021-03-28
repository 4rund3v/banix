import React from "react";
import avatar2 from "../assets/images/users/avatar-2.jpg";
import { Image } from "react-bootstrap";

const Header = () => {
  return (
    <header className="topbar">
      <h2>
        <label for="">
          <span className="las la-bars"></span>
        </label>
      </h2>
      <div className="search-wrapper">
        <span className="las la-search"></span>
        <input type="search" placeholder="Search Here" />
      </div>
      <duv className="user-wrapper">
        <Image
          src={avatar2}
          alt="User avatar"
          height={"40px"}
          width={"40px"}
          rounded
          fluid
        />
        <div>
          <h4>Jhon Marshal</h4>
          <small> Site Admin</small>
        </div>
      </duv>
    </header>
  );
};

export default Header;
