import React from 'react';

const StylesSelection = ({productStock, setProductStock, productStyles, setMainImage}) => {
  return (
    <div>
      <ul>
        {productStyles.map(product => (
          <img src={product.photos[0].thumbnail_url} key={product.photos[0].thumbnail_url} onClick={()=>{
            setProductStock(product);
            setMainImage(product.photos[0].url)
          }}/>
        ))}
      </ul>
      <select name="productSize">
        <option defaultValue="defaultSize">SELECT SIZE</option>
        {Object.keys(productStock.skus).map((style, index) => (
          <option key={index} value={productStock.skus[style].size}>{productStock.skus[style].size}</option>
        ))}
      </select>
      <select name="productQuant">
        <option defaultValue="defaultStyle">SELECT QUANTITY</option>
        {Object.keys(productStock.skus).map((style, index) => (
          <option key={index} value={index + 1}>{index + 1}</option>
        ))}
      </select>
    </div>
  )
}

//Select size, make ALL styles that have that available or in stock not grey
//Options only UP to quantity amount
export default StylesSelection;