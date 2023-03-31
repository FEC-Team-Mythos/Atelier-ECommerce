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
  const additionalScroll = 30;
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
    //console.log('partial', partialScroll);
    var pos = carouselBox.scrollLeft;
    //console.log('pos', pos);

    if (!(pos % cardSize === 0))  {
      carouselBox.scrollLeft -= partialScroll + additionalScroll;
      pos -= partialScroll + additionalScroll;

    } else {
      carouselBox.scrollLeft -= cardSize;
      pos -= cardSize;
    }
    //console.log('pos after', pos)
    setShowRight(true);
    setCarouselPos(pos);
  };

  const next = () => {
    const lastPos = carouselBox.scrollLeft;
    var pos = carouselBox.scrollLeft;
    //console.log('pos', pos);
    if (((cardSize * numberOfCards) - pos - width) < cardSize) {
      //console.log('cbox', carouselBox.scrollLeft);
      //console.log('calc', (cardSize * numberOfCards) - pos - width);
      carouselBox.scrollLeft += ((cardSize * numberOfCards) - pos - width - additionalScroll);
      pos += ((cardSize * numberOfCards) - pos - width - additionalScroll);
      //console.log('partial', pos - lastPos)
      setPartialScroll(pos - lastPos - additionalScroll);
      setShowRight(false);
    } else {
      carouselBox.scrollLeft += cardSize;
      pos += cardSize;
    }
    //console.log('pos after', pos);
    setCarouselPos(pos);
    /*setTimeout(() => {
      console.log(carouselBox.scrollLeft);
    }, 1000)
    */
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