import React, {useState, useEffect} from 'react';
import axios from 'axios';
import MainImageScreen from './components/MainImageScreen.jsx';
import ProductInformation from './components/ProductInformation.jsx';
import ProductDescription from './components/ProductDescription.jsx';

const ProductOverview = ({ request }) => {

  const [product, setProduct] = useState({});
  const [productStock, setProductStock] = useState({});

  useEffect(()=> {
    request('/products/71697', {product_id: 71697}, 'get')
      .then(data => {
        console.log(data.data);
        setProduct(data.data);
      })
      .catch(err => {
        console.log('Could not get: ', err);
      })
      .then(()=> (
        request('/products/71697/styles', {product_id: 71697}, 'get')
      ))
      .then(data => {
        console.log(data.data);
        setProductStock(data.data);
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
      <div className = "overview_overviewContainer">
        <MainImageScreen />
        <ProductInformation />
        <ProductDescription />
      </div>
    </div>
  )
}

export default ProductOverview;