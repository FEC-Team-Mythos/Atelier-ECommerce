/* eslint-disable react/prop-types */
import React from 'react';

function ProductInformation({ productInformation, product }) {
  return (
    <div>
      <div>Reviews</div>
      <p>{product.category}</p>
      <p>{product.name}</p>
      <p>{`STYLE > ${productInformation.name}`}</p>
      {productInformation.sale_price
        ? (
          <div>
            <p style={{ textDecoration: 'line-through' }}>
              {`$${productInformation.original_price || product.default_price}`}
            </p>
            <p style={{ color: 'red' }}>
              {`${productInformation.sale_price}`}
            </p>
          </div>
        )
        : <p>{`${productInformation.original_price || product.default_price}`}</p>}
    </div>
  );
}

export default ProductInformation;
