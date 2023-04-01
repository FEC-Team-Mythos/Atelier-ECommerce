/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import React from 'react';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as hollowStar } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';

function ProductInformation({ productInformation, product, starArr, totalReviewsPerProduct }) {
  library.add(solidStar, hollowStar);

  const displayHollowStars = () => (
    <div className="hollow-stars">
      {[...Array(5)].map((_, index) => (
        <FontAwesomeIcon key={index} icon={hollowStar} />
      ))}
    </div>
  );

  const displayAllStars = () => (
    <div id="reviews-star-container" style={{ position: 'relative' }}>
      {displayHollowStars()}
      <div style={{ position: 'absolute', top: 0, left: 0 }}>
        {starArr}
      </div>
    </div>
  );

  const scrollToReview = () => {
    const elem = document.getElementById('reviews');
    elem.scrollIntoView();
  };

  return (
    <div>
      <div className="overview-reviewContainer">
        <span id="reviews-graph-avg" style={{position: 'relative', left: '-3.5%'}}>
          {displayAllStars()}
        </span>
        <span id="overview-allReviews" onClick={scrollToReview}>{`Read all ${totalReviewsPerProduct} reviews`}</span>
      </div>
      <div id="overview-categoryName">{product.category}</div>
      <div id="overview-productName">{product.name}</div>
      {productInformation.sale_price
        ? (
          <div id="overview-productPrice">
            <p style={{ color: 'red' }}>
              {`$${productInformation.sale_price}`}
            </p>
            <p style={{ textDecoration: 'line-through' }}>
              {`$${productInformation.original_price || product.default_price}`}
            </p>
          </div>
        )
        : <p id="overview-productPrice">{`$${productInformation.original_price || product.default_price}`}</p>}
    </div>
  );
}

export default ProductInformation;
