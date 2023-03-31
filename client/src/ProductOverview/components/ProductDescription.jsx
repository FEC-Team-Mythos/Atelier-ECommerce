/* eslint-disable react/prop-types */
import React from 'react';

function ProductDescription({ product }) {
  return (
    <div className="overview-descriptionContainer">
      <div className="overview-description">
        <span id="overview-slogan">{product.slogan}</span>
        <span id="overview-productDescription">{product.description}</span>
      </div>
      <div className="overview-featuresContainer">
        {product.features.map((feature) => (
          <div className="overview-features" key={feature.feature}>
            <div className="overview-checkmark">L</div>
            <div key={feature.feature}>
              &nbsp;&nbsp;&nbsp;
              {`${feature.feature} - ${feature.value}`}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductDescription;
