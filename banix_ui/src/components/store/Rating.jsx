import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

const getRatingStar = (ratingValue, color) => {
  let ratings = [];
  for (let i = 1; i < 6; i++) {
    if (ratingValue > i) {
      ratings.push(<FontAwesomeIcon icon="star" color={color} />);
    } else if (i - ratingValue >= 0.5 && i - ratingValue < 1) {
      ratings.push(<FontAwesomeIcon icon="star-half-alt" color={color} />);
    } else {
      ratings.push(
        <FontAwesomeIcon icon="star" aria-hidden={true} color={color} />
      );
    }
  }
  return ratings;
};

function Rating({ ratingValue, ratingText, ratingColor }) {
  return (
    <div className="rating">
      {getRatingStar(ratingValue, ratingColor).map((ratingStar, index) => (
        <span key={index}>{ratingStar}</span>
      ))}
      {ratingValue > 0 ? (
        <span className="rating__text">
          {"   "} {ratingText && ratingText}
        </span>
      ) : (
        ""
      )}
    </div>
  );
}

Rating.propTypes = {
  ratingValue: PropTypes.number.isRequired,
  ratingText: PropTypes.string.isRequired,
  ratingColor: PropTypes.string,
};

Rating.defaultProps = {
  ratingValue: 0,
  ratingText: "",
  ratingColor: "#f8e825",
};
export default Rating;
