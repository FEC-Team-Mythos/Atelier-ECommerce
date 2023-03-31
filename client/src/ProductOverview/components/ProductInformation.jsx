/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import React from 'react';

function ProductInformation({ productInformation, product }) {
  const scrollToReview = () => {
    const elem = document.getElementById('reviews');
    elem.scrollIntoView();
  };

  return (
    <div>
      <div className="overview-reviewContainer" onClick={scrollToReview}>Read all reviews</div>
      <p id="overview-categoryName">{product.category}</p>
      <p id="overview-productName">{product.name}</p>
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
