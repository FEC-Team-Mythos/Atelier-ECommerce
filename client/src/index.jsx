import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { createRoot } from 'react-dom/client';
import ProductOverview from './ProductOverview/ProductOverview.jsx';
import QuestionsAndAnswers from './QuestionsAndAnswers/QuestionsAndAnswers.jsx';
import RelatedProducts from './RelatedProducts/RelatedProducts.jsx';
import Reviews from './Reviews/Reviews.jsx';


import { changeRequestHook } from '../../changeRequestHook.js';

const App = () => {

  const request = (endpoint, params={}, method='get') => {
    return axios({
      method: method,
      url: endpoint,
      params: params
    });
  };
  /* EXAMPLE REQUEST WITHIN WIDGET. MAKE SURE TO EITHER CALL props.request OR { request }
  ___________________________________________________________________________________________

  request('/products/71704', {product_id:71704}, 'get')
    .then(data=>{
      console.log(data.data);
    })
    .catch(err=>{
      console.log(err);
    })
    */

    const [outfits, setOutfits] = useState([]);

  return (
    <>
      <div className="content">
        <ProductOverview request={request} outfits={outfits} setOutfits={setOutfits} changeRequestHook={changeRequestHook}/>
        <RelatedProducts  request={request}/>
        <QuestionsAndAnswers  request={request}/>
        <Reviews  request={request} changeRequestHook={changeRequestHook}/>
      </div>
    </>
  )
}

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);