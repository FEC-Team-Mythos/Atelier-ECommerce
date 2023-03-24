/* eslint-disable react/prop-types */
import React from 'react';

function ProductInformation({ productInformation, product }) {
  return (
    <div>
      <div>Reviews</div>
      <h3>{product.category}</h3>
      <h1>{product.name}</h1>
      <h2>{`STYLE > ${productInformation.name}`}</h2>
      {productInformation.sale_price
        ? (
          <div>
            <h3 style={{ textDecoration: 'line-through' }}>
              {`$${productInformation.original_price || product.default_price}`}
            </h3>
            <h2 style={{ color: 'red' }}>
              {`${productInformation.sale_price}`}
            </h2>
          </div>
        )
        : <h3>{`${productInformation.original_price || product.default_price}`}</h3>}
    </div>
  );
}

export default ProductInformation;
