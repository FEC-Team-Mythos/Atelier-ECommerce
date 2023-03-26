/* eslint-disable react/prop-types */
import React from 'react';

function ProductDescription({ product }) {
  return (
    <div className="overview-descriptionContainer">
      <div>{product.slogan}</div>
      <div>{product.description}</div>
      {product.features.map((feature) => (
        <div key={feature.feature}>
          {`${feature.feature}: ${feature.value}`}
        </div>
      ))}
    </div>
  );
}

export default ProductDescription;
