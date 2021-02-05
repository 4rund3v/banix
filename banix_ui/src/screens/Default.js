import React from "react";
import { Link } from "react-router-dom";

const Default = () => {
  return (
    <React.Fragment>
      <div className="d-flex flex-column align-items-center justify-content-center">
        <h1 className="font-weight-bold">Page not found.</h1>
        <Link to="/">Return to Store</Link>
      </div>
    </React.Fragment>
  );
};

export default Default;
