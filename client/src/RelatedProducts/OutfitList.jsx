import React, { useState, useEffect } from 'react';
import ReactSimplyCarousel from 'react-simply-carousel';
import ProductCard from './ProductCard.jsx';
import axios from 'axios';

// this component is the carousel for "My Outfit"
function OutfitList() {

  const [outfit, setOutfit] = useState([]);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  return (
    // this large block of code is for the carousel
    <div>
    <h3>My Outfit</h3>
    <ReactSimplyCarousel
      activeSlideIndex={activeSlideIndex}
      onRequestChange={setActiveSlideIndex}
      itemsToShow={1}
      itemsToScroll={1}
      forwardBtnProps={{
        //here you can also pass className, or any other button element attributes
        style: {
          alignSelf: 'center',
          background: 'black',
          border: 'none',
          borderRadius: '50%',
          color: 'white',
          cursor: 'pointer',
          fontSize: '20px',
          height: 30,
          lineHeight: 1,
          textAlign: 'center',
          width: 30,
        },
        children: <span>{`>`}</span>,
      }}
      backwardBtnProps={{
        //here you can also pass className, or any other button element attributes
        style: {
          alignSelf: 'center',
          background: 'black',
          border: 'none',
          borderRadius: '50%',
          color: 'white',
          cursor: 'pointer',
          fontSize: '20px',
          height: 30,
          lineHeight: 1,
          textAlign: 'center',
          width: 30,
        },
        children: <span>{`<`}</span>,
      }}
      responsiveProps={[
        {
          itemsToShow: 3,
          itemsToScroll: 1,
          minWidth: 768,
        },
      ]}
      speed={400}
      easing="linear"
    >
      {/* First slide needs to be an empty card with a "+" sign to add current product to outfit */}
      <div
            style={{
              background: "white",
              width: 250,
              height: 250,
              border: "10px solid white",
              textAlign: "left",
              lineHeight: "20px",
              boxSizing: "border-box"
            }}
          >
            <ProductCard />
          </div>
      {/* Map through outfit array to render every product as a slide on the carousel */}
      {outfit.map((item, index) => (
          <div
            style={{
              background: "white",
              width: 250,
              height: 250,
              border: "10px solid white",
              textAlign: "left",
              lineHeight: "20px",
              boxSizing: "border-box"
            }}
            key={index}
          >
            <ProductCard product={item} />
          </div>
        ))}
      </ReactSimplyCarousel>
    </div>
  );

}

export default OutfitList;