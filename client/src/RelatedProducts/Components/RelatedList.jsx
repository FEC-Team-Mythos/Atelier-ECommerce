import React, { useState, useEffect } from 'react';
import Carousel from './Carousel.jsx';
import axios from 'axios';

// this component gets the data for "Related Products" and sends it to the Carousel component
function RelatedList({ setShowModal, setComparedProduct }) {

  const [related, setRelated] = useState([]);
  const listType = {type: 'related'};

  // get related products object data
  useEffect(() => {
    axios.get('/related/products', {params: {product_id: 71697}})
    .then((response) => {
      setRelated(response.data);
    })
  }, [])

  return (
    <div id="Related Products">
    <h3>Related Products</h3>
    <Carousel product={related} listType={listType} setShowModal={setShowModal} setComparedProduct={setComparedProduct}/>
    </div>
  );

}

export default RelatedList;
