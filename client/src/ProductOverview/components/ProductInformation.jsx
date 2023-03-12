import React, {useState} from 'react';
import StylesSelection from './StylesSelection.jsx';

const ProductInformation = ({productStock, product, setProductStock, productStyles}) => {

  return (
    <div>
      <div>Reviews</div>
      <h3>{product.category}</h3>
      <h1>{product.name}</h1>
      <h2>${productStock.original_price || product.default_price}</h2>
      <StylesSelection productStock={productStock} setProductStock={setProductStock} productStyles={productStyles}/>
      <button>Add to Bag</button>
      <button>Favorite</button>
    </div>
  )
}

export default ProductInformation;