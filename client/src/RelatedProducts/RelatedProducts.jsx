import React, { useState, useEffect } from 'react';
import RelatedList from './Components/RelatedList.jsx';
import OutfitList from './Components/OutfitList.jsx';
import Carousel from './Components/Carousel.jsx';
import Modal from './Components/Modal.jsx';

// this is the parent component for the Related Products widget
function RelatedProducts({ request }) {
  const [showModal, setShowModal] = useState(false);
  const [comparedProduct, setComparedProduct] = useState();
  const [currentProduct, setCurrentProduct] = useState();

  useEffect(() => {
    request('/products/71697', { product_id: 71697 }, 'get')
      .then((data) => {
        setCurrentProduct(data.data);
      })
      .then(() => (
        request('/products/71697/styles', { product_id: 71697 }, 'get')
      ))
      .then((data) => {
        setCurrentProduct((prevState) => ({
          ...prevState,
          styles: data.data,
        }));
      })
      .catch((err) => {
        console.log('Could not get: ', err);
      });
  }, []);

  return (
    <div id="related-products">
      Related Products Confirmation
      <RelatedList setShowModal={setShowModal} setComparedProduct={setComparedProduct} />
      <OutfitList currentProduct={currentProduct} />
      <Modal showModal={showModal} setShowModal={setShowModal} comparedProduct={comparedProduct} currentProduct={currentProduct} />
    </div>
  );
}

export default RelatedProducts;
