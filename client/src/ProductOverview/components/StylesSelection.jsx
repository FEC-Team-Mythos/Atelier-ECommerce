import React, {useState} from 'react';

const StylesSelection = ({productInformation, setProductInformation, productStyles, setMainImage}) => {

  const [selectedSize, setSelectedSize] = useState({});
  const [selectedQuantity, setSelectedQuantity] = useState(0);

  const getSelectedSize = () => {
    var e = document.getElementById('overview_productSize');
    setSelectedSize(productInformation.skus[e.value]);
  }

  const getSelectedQuantity = () => {
    var e = document.getElementById('overview_productQuantity');
    setSelectedQuantity(e.value);
    console.log(e.value);
  }

  //ProductInformation is the style information
  // Will need product id, productinformation style id, sku id, selected quantity, selected size


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

      <select id="overview_productSize" onChange={getSelectedSize}>
        <option value='0'>SELECT SIZE</option>
        {Object.keys(productInformation.skus).map((style, index) => (
          <option key={index} value={style}>{productInformation.skus[style].size}</option>
        ))}
      </select>

      <select id="overview_productQuantity" onChange={getSelectedQuantity}>
        <option value="0">SELECT QUANTITY</option>
        {(Object.keys(selectedSize).length && selectedSize.quantity < 5) ?
        Array.from({length: selectedSize.quantity}, (_, index) => index + 1).map(quantity => (
          <option value={quantity} key={quantity}>{quantity}</option>
        ))
        : [1,2,3,4,5].map(quantity => (
          <option value={quantity} key={quantity}>{quantity}</option>
        ))}
      </select>
      <button>Add to Bag</button>
      <button>Favorite</button>
    </div>
  )
}

export default StylesSelection;