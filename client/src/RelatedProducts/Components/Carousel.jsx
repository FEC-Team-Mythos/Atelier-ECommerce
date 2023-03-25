import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard.jsx';
import axios from 'axios';

// this component is for the carousel which serves both related products and your outfit sections
const Carousel = ({ product, listType, setShowModal, setComparedProduct }) => {

    var [carouselBox, setCarouselBox] = useState(document.querySelector('.related-product-container'));
    var [carouselPos, setCarouselPos] = useState(0);

    useEffect(() => {
        setCarouselBox(document.querySelector('.related-product-container'));
    });

    const prev = () => {
        let width = carouselBox.clientWidth;
        carouselBox.scrollLeft = carouselBox.scrollLeft - width;
    }

    const next = () => {
        let width = carouselBox.clientWidth;
        carouselBox.scrollLeft = carouselBox.scrollLeft + width;
    }

    return (
        <div className="related-product-carousel">
            { carouselPos === 0 ? (null) : (<button className="related-pre-btn" onClick={prev}><p>&lt;</p></button>) }
            <button className="related-next-btn" onClick={next}><p>&gt;</p></button>
            <div className="related-product-container">
            {listType.type === 'outfit' ? <ProductCard product={product} listType={listType} setShowModal={setShowModal} /> : null}
            {product.map((item, index) => (
                <ProductCard product={item} listType={listType} setShowModal={setShowModal} setComparedProduct={setComparedProduct} key={index}/>
            ))}
            </div>
        </div>
    )
}

export default Carousel;