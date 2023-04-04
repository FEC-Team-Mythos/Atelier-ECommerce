import React, { useState, useEffect } from 'react';
import Carousel from './Carousel.jsx';

// this component is the carousel for "Your Outfit"
function OutfitList({ currentProduct }) {
  const [outfit, setOutfit] = useState([]);
  const listType = { type: 'outfit' };

  useEffect(() => {
    const outfitList = JSON.parse(localStorage.getItem('outfit'));
    setOutfit(outfitList);
  },[]);

  // add current product to outfit list both in local storage and in state
  const handleAdd = () => {
    const outfitList = JSON.parse(localStorage.getItem('outfit'));

    if (outfitList !== null) {
      for (let i = 0; i < outfitList.length; i++) {
        if (outfitList[i].name === currentProduct.name) {
          var alreadyAdded = true;
        }
      }
    }

    if (!alreadyAdded) {
      setOutfit((prevState) => [...prevState, currentProduct]);
      const updatedOutfitList = [];
      updatedOutfitList.push(currentProduct);
      localStorage.setItem('outfit', JSON.stringify(updatedOutfitList));
    }
  };

  // remove selected product from outfit list both in local storage and in state
  const handleRemove = (product) => {
    const outfitList = JSON.parse(localStorage.getItem('outfit'));
    const updatedOutfitList = [];
    for (let i = 0; i < outfitList.length; i++) {
      if (!outfitList[i].name === product) {
        updatedOutfitList.push(outfitList[i]);
      }
    }
    setOutfit(updatedOutfitList);
    localStorage.setItem('outfit', JSON.stringify(updatedOutfitList));
  };

  return (
    <div id="My Outfit">
      <h3>Your Outfit</h3>
      <Carousel products={outfit} setOutfit={setOutfit} listType={listType} handleAdd={handleAdd} handleRemove={handleRemove} />
    </div>
  );
}

export default OutfitList;
