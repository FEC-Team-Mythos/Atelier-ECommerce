import React from 'react';
import StylesSelection from './StylesSelection.jsx';

const ProductInformation = ({productStock, product}) => {
  return (
    <div>
      <div>Reviews</div>
      <h3>{product.category}</h3>
      <h1>{product.name}</h1>
      <h2>${product.default_price}</h2>
      <StylesSelection />
      <button>Add to Bag</button>
      <button>Favorite</button>
    </div>
  )
}

export default ProductInformation;