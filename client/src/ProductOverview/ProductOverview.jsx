import React, {useState, useEffect} from 'react';
import axios from 'axios';
import MainImageScreen from './components/MainImageScreen.jsx';
import ProductInformation from './components/ProductInformation.jsx';
import ProductDescription from './components/ProductDescription.jsx';
import PurchaseOptions from './components/PurchaseOptions.jsx';
import ShoppingCart from './components/ShoppingCart.jsx';

const ProductOverview = ({ request, outfits, setOutfits }) => {

  const [product, setProduct] = useState({});
  const [productInformation, setProductInformation] = useState({});
  const [productStyles, setProductStyles] = useState([]);
  const [mainImage, setMainImage] = useState('');
  const [cartItems, setCartItems] = useState([]);

  useEffect(()=> {
    request('/products/71697', {product_id: 71697}, 'get')
      .then(data => {
        setProduct(data.data);
      })
      .then(()=> (
        request('/products/71697/styles', {product_id: 71697}, 'get')
      ))
      .then(data => {
        setProductInformation(data.data.results[0]);
        setProductStyles(data.data.results);
        setMainImage(data.data.results[0].photos[0].url);
        if (localStorage.getItem('cart')) {
          let cart = JSON.parse(localStorage.getItem('cart'))
          setCartItems(cart);
        }
      })
      .catch(err => {
        console.log('Could not get: ', err);
      })
  }, [])

  return (
    <div>
      <h1>Logo</h1>
      <input type='text'></input>
      <button>Search Icon</button>
      {cartItems.length ? <ShoppingCart cartItems={cartItems} setCartItems={setCartItems}/> : null}
      {(Object.keys(product).length && Object.keys(productInformation).length) ?
        <div className = "overview_overviewContainer">
          <MainImageScreen productInformation={productInformation} mainImage={mainImage} setMainImage={setMainImage}/>
          <ProductInformation productInformation={productInformation} product={product}/>
          <PurchaseOptions product={product} productInformation={productInformation} setProductInformation={setProductInformation}
            productStyles={productStyles} setMainImage={setMainImage} cartItems={cartItems} setCartItems={setCartItems} setOutfits={setOutfits} outfits={outfits}/>
          <ProductDescription product={product}/>
        </div>
        : null
      }
    </div>
  )
}

export default ProductOverview;