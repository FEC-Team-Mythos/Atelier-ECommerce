import React, {useState} from 'react';

const ProductInformation = ({productInformation, product}) => {

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
    </div>
  )
}

export default ProductInformation;