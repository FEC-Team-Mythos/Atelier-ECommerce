import React, { useState, useEffect } from 'react';
import Carousel from './Carousel.jsx';

// this component gets the data for "Related Products" and sends it to the Carousel component
function RelatedList({ starArr, related, setShowModal, setComparedProduct, productId, setProductId }) {

  const listType = { type: 'related' };

  return (
    <div id="Related-Products">
      <h3>Related Products</h3>
      <Carousel starArr={starArr} products={related} listType={listType} setShowModal={setShowModal} setComparedProduct={setComparedProduct} setProductId={setProductId} related={related}/>
    </div>
  );
}

export default RelatedList;
