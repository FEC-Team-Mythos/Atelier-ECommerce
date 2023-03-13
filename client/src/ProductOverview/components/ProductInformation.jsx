import React, {useState} from 'react';
import StylesSelection from './StylesSelection.jsx';

const ProductInformation = ({productStock, product, setProductStock, productStyles, setMainImage}) => {

  return (
    <div>
      <div>Reviews</div>
      <h3>{product.category}</h3>
      <h1>{product.name}</h1>
      <h2>{productStock.name}</h2>
      {productStock.sale_price ?
        <div>
          <h3>${productStock.original_price || product.default_price}</h3>
          <h2>${productStock.sale_price}</h2>
        </div>
        :
        <h3>${productStock.original_price || product.default_price}</h3>
      }
      <StylesSelection productStock={productStock} setProductStock={setProductStock} productStyles={productStyles} setMainImage={setMainImage}/>
      <button>Add to Bag</button>
      <button>Favorite</button>
    </div>
  )
}

export default ProductInformation;