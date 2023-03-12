import React, {useState} from 'react';
import StylesSelection from './StylesSelection.jsx';

const ProductInformation = ({productStock, product, setProductStock}) => {

  return (
    <div>
      <div>Reviews</div>
      <h3>{product.category}</h3>
      <h1>{product.name}</h1>
      <h2>${product.original_price || product.default_price}</h2>
      <StylesSelection productStock={productStock} setProductStock={setProductStock}/>
      <button>Add to Bag</button>
      <button>Favorite</button>
    </div>
  )
}

export default ProductInformation;