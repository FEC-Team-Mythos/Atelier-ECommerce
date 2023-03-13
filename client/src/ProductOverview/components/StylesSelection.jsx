import React, {useState} from 'react';

const StylesSelection = ({productInformation, setProductInformation, productStyles, setMainImage}) => {

  const [selectedSize, setSelectedSize] = useState({});

  const getSelectedValue = () => {
    var e = document.getElementById('overview_productSize');
    setSelectedSize(productInformation.skus[e.value]);
  }


  return (
    <div>
      <ul>
        {productStyles.map(product => (
          <img src={product.photos[0].thumbnail_url} key={product.photos[0].thumbnail_url} onClick={()=>{
            setProductInformation(product);
            setMainImage(product.photos[0].url)
          }}/>
        ))}
      </ul>

      <select id="overview_productSize" onChange={getSelectedValue}>
        <option defaultValue="defaultSize">SELECT SIZE</option>
        {Object.keys(productInformation.skus).map((style, index) => (
          <option key={index} value={style}>{productInformation.skus[style].size}</option>
        ))}
      </select>

      <select id="overview_productQuant">
        <option defaultValue="defaultStyle">SELECT QUANTITY</option>
        {(Object.keys(selectedSize).length && selectedSize.quantity < 5) ?
        Array.from({length: selectedSize.quantity}, (_, index) => index + 1).map(quantity => (
          <option value={quantity} key={quantity}>{quantity}</option>
        ))
        : [1,2,3,4,5].map(quantity => (
          <option value={quantity} key={quantity}>{quantity}</option>
        ))}
      </select>
    </div>
  )
}

//Select size, make ALL styles that have that available or in stock not grey
//Options only UP to quantity amount
export default StylesSelection;