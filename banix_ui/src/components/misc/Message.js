import React from "react";
import { Alert } from "react-bootstrap";

const Message = ({ variant, children }) => {
  console.log(
    "[Message] Message to be displayed is ::: ",
    variant,
    "children are ",
    children
  );
  return <Alert variant={variant}>{children}</Alert>;
};

Message.defaultProps = {
  variant: "info",
};

export default Message;
