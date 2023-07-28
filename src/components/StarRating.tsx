import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

interface StarRatingProps {
  rating: number;
  maxRating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, maxRating }) => {
  const getStarIcon = (starNumber: number): JSX.Element => {
    if (rating >= starNumber) {
      return <FaStar color="#ffda08" />;
    } else if (rating + 0.5 === starNumber) {
      return <FaStarHalfAlt color="#ffda08" />;
    } else {
      return <FaRegStar color="#ffda08" />;
    }
  };

  return (
    <div>
      {Array.from({ length: maxRating }, (_, index) => index + 1).map(
        (starNumber) => (
          <span key={starNumber}>{getStarIcon(starNumber)}</span>
        ),
      )}
    </div>
  );
};

export default StarRating;
