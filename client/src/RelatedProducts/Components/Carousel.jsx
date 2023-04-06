import React, { useRef, useState, useEffect } from 'react';
import ProductCard from './ProductCard.jsx';

// this component is for the carousel which serves both related products and your outfit sections
function Carousel({ currentProduct, starArr, related, products, listType, setShowModal, setComparedProduct, handleAdd, handleRemove, setProductId}) {

  const [carouselBox, setCarouselBox] = useState(listType.type === 'related' ? document.querySelector('.related-product-container') : document.querySelector('.related-outfit-container'));
  const [carouselPos, setCarouselPos] = useState(0);
  const [width, setWidth] = useState(0);
  const [showRight, setShowRight] = useState(true);
  const [partialScroll, setPartialScroll] = useState(0);
  const cardSize = 200;
  const additionalScroll = 30;
  const windowWidth = useRef(window.innerWidth).current - 16;

  var numberOfCards = products.length;
  if (listType.type === 'outfit') {
    numberOfCards++;
  }

  // if the width of the window is greater than the width of the cards, dont show right arrow
  useEffect(() => {
    if (windowWidth > (numberOfCards * cardSize)) {
      setShowRight(false);
    } else {
      setShowRight(true);
    }
    if (listType.type === 'related') {
      setCarouselBox(document.querySelector('.related-product-container'));
      setWidth(document.querySelector('.related-product-container').clientWidth);
    } else {
      setCarouselBox(document.querySelector('.related-outfit-container'));
      setWidth(document.querySelector('.related-outfit-container').clientWidth);
    }
    if (carouselBox) {
      carouselBox.scrollLeft = 0;
      setCarouselPos(0);
    }
  }, [related]);

  useEffect(() => {
    if (listType.type === 'related') {
      setCarouselBox(document.querySelector('.related-product-container'));
      setWidth(document.querySelector('.related-product-container').clientWidth);
    } else {
      setCarouselBox(document.querySelector('.related-outfit-container'));
      setWidth(document.querySelector('.related-outfit-container').clientWidth);
    }
  }, [carouselPos]);

  // go back 1 product card
  const prev = () => {
    var pos = carouselBox.scrollLeft;
    if (!(pos % cardSize === 0))  {
      carouselBox.scrollLeft -= partialScroll + additionalScroll;
      pos -= partialScroll + additionalScroll;
    } else {
      carouselBox.scrollLeft -= cardSize;
      pos -= cardSize;
    }
    setShowRight(true);
    setCarouselPos(pos);
  };

  // go forward 1 product card
  const next = () => {
    const lastPos = carouselBox.scrollLeft;
    var pos = carouselBox.scrollLeft;
    if (((cardSize * numberOfCards) - pos - width) < cardSize) {
      carouselBox.scrollLeft += ((cardSize * numberOfCards) - pos - width - additionalScroll);
      pos += ((cardSize * numberOfCards) - pos - width - additionalScroll);
      setPartialScroll(pos - lastPos - additionalScroll);
      setShowRight(false);
    } else {
      carouselBox.scrollLeft += cardSize;
      pos += cardSize;
    }
    setCarouselPos(pos);
  };

  // if carousel list is for related products
  if (listType.type === 'related') {
    return (
      <div className="related-product-carousel">
        { carouselPos === 0 ? (null) : (<button className="related-pre-btn" onClick={prev}><p>&lt;</p></button>) }
        { showRight ? (<button className="related-next-btn" onClick={next}><p>&gt;</p></button>) : (null) }
        <div className="related-product-container">
          {products.map((item, index) => (
            <ProductCard starArr={starArr} product={item} listType={listType} setShowModal={setShowModal} setComparedProduct={setComparedProduct} key={index} index={index} handleRemove={handleRemove} setProductId={setProductId}/>
          ))}
        </div>
      </div>
    );
  }
  // if carousel list is for outfit products
  return (
    <div className="related-outfit-carousel">
      { carouselPos === 0 ? (null) : (<button className="related-pre-btn" onClick={prev}><p>&lt;</p></button>) }
      { showRight ? (<button className="related-next-btn" onClick={next}><p>&gt;</p></button>) : (null) }
      <div className="related-outfit-container">
          <ProductCard currentProduct={currentProduct} product={products} listType={listType} setShowModal={setShowModal} handleAdd={handleAdd} />
        {products.map((item, index) => (
          <ProductCard starArr={starArr} product={item} listType={listType} setShowModal={setShowModal} setComparedProduct={setComparedProduct} key={index} index={index} handleRemove={handleRemove} setProductId={setProductId}/>
        ))}
      </div>
    </div>
  );
}

export default Carousel;