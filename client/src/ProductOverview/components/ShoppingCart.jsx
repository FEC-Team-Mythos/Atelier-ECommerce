import React, {useState, useEffect} from 'react';

const ShoppingCart = ({ product }) => {
  return (
    <div>
      <div>{product.slogan}</div>
      <div>{product.description}</div>
      {product.features.map(feature => (
        <div key={feature.feature}>{feature.feature} : {feature.value}</div>
      ))}
    </div>
  )
}

export default ShoppingCart;