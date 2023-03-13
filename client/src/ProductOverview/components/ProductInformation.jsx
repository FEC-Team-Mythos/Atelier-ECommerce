import React, {useState} from 'react';
import StylesSelection from './StylesSelection.jsx';

const ProductInformation = ({productInformation, product, setProductInformation, productStyles, setMainImage}) => {

  return (
    <div>
      <div>Reviews</div>
      <h3>{product.category}</h3>
      <h1>{product.name}</h1>
      <h2>{productInformation.name}</h2>
      {productInformation.sale_price ?
        <div>
          <h3>${productInformation.original_price || product.default_price}</h3>
          <h2>${productInformation.sale_price}</h2>
        </div>
        :
        <h3>${productInformation.original_price || product.default_price}</h3>
      }
      <StylesSelection productInformation={productInformation} setProductInformation={setProductInformation} productStyles={productStyles} setMainImage={setMainImage}/>
      <button>Add to Bag</button>
      <button>Favorite</button>
    </div>
  )
}

export default ProductInformation;