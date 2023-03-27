/* eslint-disable react/prop-types */
import React from 'react';

function ProductInformation({ productInformation, product }) {
  return (
    <div>
      <div className="overview-reviewContainer">Reviews</div>
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
