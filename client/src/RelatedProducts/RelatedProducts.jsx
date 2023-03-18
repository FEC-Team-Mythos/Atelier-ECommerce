import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import RelatedList from './Components/RelatedList.jsx';
import OutfitList from './Components/OutfitList.jsx';
import Carousel from './Components/Carousel.jsx';
import Modal from './Components/Modal.jsx';

// this is the parent component for the Related Products widget
const RelatedProducts = () => {

  const [showModal, setShowModal] = useState(false);

  return (
    <div id="related-products">
      Related Products Confirmation
      <RelatedList setShowModal={setShowModal}/>
      <OutfitList />
      <Modal showModal={showModal} setShowModal={setShowModal} />
    </div>
  )
}

export default RelatedProducts;