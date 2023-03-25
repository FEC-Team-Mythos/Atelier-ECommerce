import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard.jsx';

// this component is for the carousel which serves both related products and your outfit sections
function Carousel({ products, listType, setShowModal, setComparedProduct, setOutfit, handleAdd, handleRemove}) {

  const [carouselBox, setCarouselBox] = useState(document.querySelector('.related-product-container'));
  const [carouselPos, setCarouselPos] = useState(0);

  useEffect(() => {
    setCarouselBox(document.querySelector('.related-product-container'));
  });

  const prev = () => {
    const width = carouselBox.clientWidth;
    carouselBox.scrollLeft -= width;
  };

  const next = () => {
    const width = carouselBox.clientWidth;
    carouselBox.scrollLeft += width;
  };

  return (
    <div className="related-product-carousel">
      { carouselPos === 0 ? (null) : (<button className="related-pre-btn" onClick={prev}><p>&lt;</p></button>) }
      <button className="related-next-btn" onClick={next}><p>&gt;</p></button>
      <div className="related-product-container">
        {listType.type === 'outfit' ? <ProductCard product={products} listType={listType} setShowModal={setShowModal} handleAdd={handleAdd}/> : null}
        {products.map((item, index) => (
          <ProductCard product={item} listType={listType} setShowModal={setShowModal} setComparedProduct={setComparedProduct} key={index} index={index}/>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
