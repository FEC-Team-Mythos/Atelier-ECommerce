import React from 'react';
import Axios from 'axios';
import MainImageScreen from './components/MainImageScreen.jsx';
import StylesSelection from './components/StylesSelection.jsx';
import ProductInformation from './components/ProductInformation.jsx';

const ProductOverview = (props) => {


  return (
    <div>
      <h1>Title</h1>
      <MainImageScreen />
      <StylesSelection />
      <ProductInformation />
    </div>
  )
}

export default ProductOverview;