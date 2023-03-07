import React from 'react';
import Axios from 'axios';
import MainImageScreen from './components/MainImageScreen.jsx';
import ProductInformation from './components/ProductInformation.jsx';
import ProductDescription from './components/ProductDescription.jsx';

const ProductOverview = (props) => {


  return (
    <div>
      <h1>Logo</h1>
      <input type='text'></input>
      <h2>Search Icon</h2>
      <MainImageScreen />
      <ProductInformation />
      <ProductDescription />
    </div>
  )
}

export default ProductOverview;