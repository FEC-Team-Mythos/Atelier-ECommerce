import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import RelatedList from './Components/RelatedList.jsx';
import OutfitList from './Components/OutfitList.jsx';
import Carousel from './Components/Carousel.jsx';
import Modal from './Components/Modal.jsx';

// this is the parent component for the Related Products widget
const RelatedProducts = ({ request }) => {

  const [showModal, setShowModal] = useState(false);
  const [comparedProduct, setComparedProduct] = useState();
  const [currentProduct, setCurrentProduct] = useState();

  useEffect(() => {
    request('/products/71697', { product_id: 71697 }, 'get')
      .then((data) => {
        setCurrentProduct(data.data);
      })
      .catch((err) => {
        console.log('Could not get: ', err);
      });
  }, []);

  return (
    <div id="related-products">
      Related Products Confirmation
      <RelatedList setShowModal={setShowModal} setComparedProduct={setComparedProduct}/>
      <OutfitList />
      <Modal showModal={showModal} setShowModal={setShowModal} comparedProduct={comparedProduct} currentProduct={currentProduct}/>
    </div>
  )
}

export default RelatedProducts;