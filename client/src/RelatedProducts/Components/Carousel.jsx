import React, { useRef, useState, useEffect } from 'react';
import ProductCard from './ProductCard.jsx';

// this component is for the carousel which serves both related products and your outfit sections
function Carousel({ products, listType, setShowModal, setComparedProduct, handleAdd, handleRemove }) {

  const [carouselBox, setCarouselBox] = useState(listType.type === 'related' ? document.querySelector('.related-product-container') : document.querySelector('.related-outfit-container'));
  const [carouselPos, setCarouselPos] = useState(0);
  const [width, setWidth] = useState(0);
  const [showRight, setShowRight] = useState(true);
  const [partialScroll, setPartialScroll] = useState(0);
  const cardSize = 204;
  const windowWidth = useRef(window.innerWidth).current - 16;

  var numberOfCards = products.length;
  if (listType.type === 'outfit') {
    numberOfCards++;
  }

  useEffect(() => {
    if (windowWidth > (numberOfCards * cardSize)) {
      setShowRight(false);
    } else {
      setShowRight(true);
    }
  }, [products]);

  useEffect(() => {
    if (listType.type === 'related') {
      setCarouselBox(document.querySelector('.related-product-container'));
      setWidth(document.querySelector('.related-product-container').clientWidth);
    } else {
      setCarouselBox(document.querySelector('.related-outfit-container'));
      setWidth(document.querySelector('.related-outfit-container').clientWidth);
    }
  }, [carouselPos]);


  const prev = () => {
    var pos = carouselBox.scrollLeft;

    if (!(pos % cardSize === 0))  {
      carouselBox.scrollLeft -= partialScroll;
      pos -= partialScroll;
    } else {
      carouselBox.scrollLeft -= cardSize;
      pos -= cardSize;
    }
    setShowRight(true);
    setCarouselPos(pos);
  };

  const next = () => {
    const lastPos = carouselBox.scrollLeft;
    var pos = carouselBox.scrollLeft;
    if (((cardSize * numberOfCards) - pos - width) < cardSize) {
      carouselBox.scrollLeft += ((cardSize * numberOfCards) - pos - width);
      pos += ((cardSize * numberOfCards) - pos - width);
      setPartialScroll(pos - lastPos);
      setShowRight(false);
    } else {
      carouselBox.scrollLeft += cardSize;
      pos += cardSize;
    }
    setCarouselPos(pos);
  };

  if (listType.type === 'related') {
    return (
      <div className="related-product-carousel">
        { carouselPos === 0 ? (null) : (<button className="related-pre-btn" onClick={prev}><p>&lt;</p></button>) }
        { showRight ? (<button className="related-next-btn" onClick={next}><p>&gt;</p></button>) : (null) }
        <div className="related-product-container">
          {products.map((item, index) => (
            <ProductCard product={item} listType={listType} setShowModal={setShowModal} setComparedProduct={setComparedProduct} key={index} index={index} handleRemove={handleRemove} />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="related-outfit-carousel">
      { carouselPos === 0 ? (null) : (<button className="related-pre-btn" onClick={prev}><p>&lt;</p></button>) }
      { showRight ? (<button className="related-next-btn" onClick={next}><p>&gt;</p></button>) : (null) }
      <div className="related-outfit-container">
          <ProductCard product={products} listType={listType} setShowModal={setShowModal} handleAdd={handleAdd} />
        {products.map((item, index) => (
          <ProductCard product={item} listType={listType} setShowModal={setShowModal} setComparedProduct={setComparedProduct} key={index} index={index} handleRemove={handleRemove} />
        ))}
      </div>
    </div>
  );
}

export default Carousel;