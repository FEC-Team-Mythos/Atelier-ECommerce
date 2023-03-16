import React, { useState, useEffect } from 'react';
import ReactSimplyCarousel from 'react-simply-carousel';
import ProductCard from './ProductCard.jsx';
import axios from 'axios';

// this component is the carousel for "Related Products"
function RelatedList() {

  const [related, setRelated] = useState([]);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  // get related products object data
  useEffect(() => {
    axios.get('/related')
    .then((response) => {
      setRelated(response.data);
    })
  }, [])

  return (
    // this large block of code is for the carousel
    <div>
    <h3>Related Products</h3>
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
      {/* here you can also pass any other element attributes. Also, you can use your custom components as slides */}
      {related.map((item, index) => (
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

export default RelatedList;