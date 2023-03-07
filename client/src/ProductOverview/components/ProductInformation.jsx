import React from 'react';
import StylesSelection from './StylesSelection.jsx';

const ProductInformation = (props) => {
  return (
    <div>
      <div>Reviews</div>
      <h3>Category</h3>
      <h1>Product Name</h1>
      <h2>Price</h2>
      <StylesSelection />
      <button>Add to Bag</button>
      <button>Favorite</button>
    </div>
  )
}

export default ProductInformation;