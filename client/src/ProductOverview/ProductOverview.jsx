import React, {useState, useEffect} from 'react';
import axios from 'axios';
import MainImageScreen from './components/MainImageScreen.jsx';
import ProductInformation from './components/ProductInformation.jsx';
import ProductDescription from './components/ProductDescription.jsx';

const ProductOverview = ({ request }) => {

  const [product, setProduct] = useState({});
  const [productStock, setProductStock] = useState({});
  const [productStyles, setProductStyles] = useState([]);
  const [mainImage, setMainImage] = useState('');

  useEffect(()=> {
    request('/products/71697', {product_id: 71697}, 'get')
      .then(data => {
        setProduct(data.data);
      })
      .catch(err => {
        console.log('Could not get: ', err);
      })
      .then(()=> (
        request('/products/71697/styles', {product_id: 71697}, 'get')
      ))
      .then(data => {
        setProductStock(data.data.results[0]);
        setProductStyles(data.data.results);
        setMainImage(data.data.results[0].photos[0].url);
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
      {(Object.keys(product).length && Object.keys(productStock).length) ?
        <div className = "overview_overviewContainer">
          <MainImageScreen productStock={productStock} mainImage={mainImage} setMainImage={setMainImage}/>
          <ProductInformation productStock={productStock} product={product} setProductStock={setProductStock} productStyles={productStyles} setMainImage={setMainImage}/>
          <ProductDescription product={product}/>
        </div>
        : null
      }
    </div>
  )
}

export default ProductOverview;