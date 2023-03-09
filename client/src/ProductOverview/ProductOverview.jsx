import React from 'react';
import axios from 'axios';
import MainImageScreen from './components/MainImageScreen.jsx';
import ProductInformation from './components/ProductInformation.jsx';
import ProductDescription from './components/ProductDescription.jsx';

const ProductOverview = (props) => {


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