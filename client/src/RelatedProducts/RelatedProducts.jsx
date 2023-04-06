import React, { useState, useEffect } from 'react';
import RelatedList from './Components/RelatedList.jsx';
import OutfitList from './Components/OutfitList.jsx';
import Modal from './Components/Modal.jsx';
import axios from 'axios';

// this is the parent component for the Related Products widget
function RelatedProducts({ starArr, request, outfits, setOutfits, changeRequestHook, productId, product, productInformation, setProductId}) {
  const [showModal, setShowModal] = useState(false);
  const [comparedProduct, setComparedProduct] = useState();
  const [currentProduct, setCurrentProduct] = useState();
  const [clickedElement, clickedTime] = changeRequestHook('related');

  useEffect(() => {
    request(`/products/${productId}`, { product_id: productId }, 'get')
      .then((data) => {
        setCurrentProduct(data.data);
      })
      .then(() => (
        request(`/products/${productId}/styles`, { product_id: productId }, 'get')
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
  }, [productId]);

  const [related, setRelated] = useState([]);

  // get related products object data
  useEffect(() => {
    axios.get('/related/products', { params: { product_id: productId } })
      .then((response) => {
        setRelated(response.data);
      });
  }, [productId]);

  return (
    <div id="related-products">
      <RelatedList starArr={starArr} related={related} setShowModal={setShowModal} setComparedProduct={setComparedProduct} productId={productId} setProductId={setProductId}/>
      <OutfitList starArr={starArr} related={related} outfits={outfits} setOutfits={setOutfits} currentProduct={currentProduct} product={product} productInformation={productInformation} setProductId={setProductId}/>
      <Modal showModal={showModal} setShowModal={setShowModal} comparedProduct={comparedProduct} currentProduct={currentProduct} />
    </div>
  );
}

export default RelatedProducts;