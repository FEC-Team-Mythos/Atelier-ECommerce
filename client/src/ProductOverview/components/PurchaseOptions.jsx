import React, {useState} from 'react';

const PurchaseOptions = ({product, productInformation, setProductInformation, productStyles, setMainImage}) => {

  const [selectedSize, setSelectedSize] = useState({});
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const [selectedSku, setSelectedSku] = useState('');

  const getSelectedSize = () => {
    var e = document.getElementById('overview_productSize');
    setSelectedSize(productInformation.skus[e.value]);
    setSelectedSku(e.value);
  }

  const getSelectedQuantity = () => {
    var e = document.getElementById('overview_productQuantity');
    setSelectedQuantity(e.value);
  }

  const addToCart = () => {
    if (sessionStorage.getItem('cart')) {
      let cartItems = JSON.parse(sessionStorage.getItem('cart'));
      cartItems.push({product_id: product.id, style_id: productInformation.style_id, sku_id: selectedSku, size: selectedSize.size, quantity: selectedQuantity});
      sessionStorage.setItem('cart', JSON.stringify(cartItems));
    } else {
      let item = [{product_id: product.id, style_id: productInformation.style_id, sku_id: selectedSku, size: selectedSize.size, quantity: selectedQuantity}]
      sessionStorage.setItem('cart', JSON.stringify(item));
    }
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
      <button onClick={addToCart}>Add to Bag</button>
      <button>Favorite</button>
    </div>
  )
}

export default PurchaseOptions;