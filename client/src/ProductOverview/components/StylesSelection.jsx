import React from 'react';

const StylesSelection = ({productStock, setProductStock, productStyles}) => {
  return (
    <div>
      <ul>
        {productStyles.map(product => (
          <img src={product.photos[0].thumbnail_url} key={product.photos[0].thumbnail_url} onClick={()=>{setProductStock(product)}}/>
        ))}
      </ul>
      <select name="productSize">
        <option defaultValue="defaultSize">SELECT SIZE</option>
        <option value="small">Small</option>
        <option value="medium">Medium</option>
      </select>
      <select name="productQuant">
        <option defaultValue="defaultStyle">SELECT QUANTITY</option>
        <option value="s1">1</option>
        <option value="s2">2</option>
      </select>
    </div>
  )
}

//Select size, make ALL styles that have that available or in stock not grey
//Options only UP to quantity amount
export default StylesSelection;