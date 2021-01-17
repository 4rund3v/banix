import React, { Component } from "react";
import { Image } from "react-bootstrap";
import { HEADER_IMAGE } from "../config";

class BanixBanner extends Component {
  state = {};
  render() {
    return <Image src={HEADER_IMAGE} height={80} width={208}></Image>;
  }
}

export default BanixBanner;
