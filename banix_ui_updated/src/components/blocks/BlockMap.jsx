// react
import React from "react";

export default function BlockMap() {
  return (
    <div className="block-map block">
      <div className="block-map__body">
        <iframe
          title="Google Map"
          src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Banix%20Bengaluru&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=&amp;output=embed"
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
        />
      </div>
    </div>
  );
}
