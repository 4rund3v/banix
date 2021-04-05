import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AlternativePurchases = ({ alternatePurchases }) => {
  let alternativePurchasesInfo = null;
  if (alternatePurchases && alternatePurchases.length > 0) {
    alternativePurchasesInfo = (
      <React.Fragment>
        <span className="text-muted"> {"You can also buy from "} </span>
        {alternatePurchases.map((item) => (
          <a target="_blank" rel="noopener noreferrer" href={item.link}>
            <button className="btn btn-info ml-2 p-2" onClick={() => {}}>
              {"  "}
              <FontAwesomeIcon icon={item.icon} />
            </button>
          </a>
        ))}
      </React.Fragment>
    );
  }
  return (
    <div className="product__actions-item alternate-options">
      {alternativePurchasesInfo}
    </div>
  );
};

export default AlternativePurchases;
