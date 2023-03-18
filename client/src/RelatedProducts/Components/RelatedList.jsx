import React, { useState, useEffect } from 'react';
import Carousel from './Carousel.jsx';
import axios from 'axios';

// this component is the carousel for "Related Products"
function RelatedList({ setShowModal }) {

  const [related, setRelated] = useState([]);
  const listType = {type: 'related'};

  // get related products object data
  useEffect(() => {
    axios.get('/related')
    .then((response) => {
      setRelated(response.data);
    })
  }, [])

  return (
    <div id="Related Products">
    <h3>Related Products</h3>
    <Carousel product={related} listType={listType} setShowModal={setShowModal}/>
    </div>
  );

}

export default RelatedList;
