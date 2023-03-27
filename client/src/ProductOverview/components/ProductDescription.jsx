/* eslint-disable react/prop-types */
import React from 'react';

function ProductDescription({ product }) {
  return (
    <div className="overview-descriptionContainer">
      <div className="overview-description">
        <div id="overview-slogan">{product.slogan}</div>
        <div>{product.description}</div>
      </div>
      <div className="overview-features">
        {product.features.map((feature) => (
          <div key={feature.feature}>
            {`${feature.feature}: ${feature.value}`}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductDescription;
