import React, { Component } from "react";
import { Image } from "react-bootstrap";
import { GUEST_USER_IMAGE } from "../config";

class UserPic extends Component {
  state = {};
  render() {
    return <Image src={GUEST_USER_IMAGE} roundedCircle height={45} />;
  }
}

export default UserPic;
