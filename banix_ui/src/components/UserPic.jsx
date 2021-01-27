import React, { Component } from "react";
import { Image } from "react-bootstrap";
import { GUEST_USER_IMAGE } from "../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
class UserPic extends Component {
  state = {};
  render() {
    return <FontAwesomeIcon icon="faUser" fill="red" />;
  }
}

export default UserPic;
