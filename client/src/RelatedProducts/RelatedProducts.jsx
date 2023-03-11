import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import RelatedList from './RelatedList.jsx';
import OutfitList from './OutfitList.jsx';

const RelatedProducts = () => {

  const request = (endpoint, params={}, method='get') => {
    return axios({
      method: method,
      url: endpoint,
      params: params
    })
  }

  request('/products/71704', {product_id:71704}, 'get')
  .then(data=>{
    console.log(data.data);
  })
  .catch(err=>{
    console.log(err);
  })

  return (
    <div>
      Related Products Confirmation
      <RelatedList />
      <OutfitList />
    </div>
  )
}

export default RelatedProducts;