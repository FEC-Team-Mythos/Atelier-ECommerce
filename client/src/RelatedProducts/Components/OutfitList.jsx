import React, { useState, useEffect } from 'react';
import Carousel from './Carousel.jsx';

// this component is the carousel for "Your Outfit"
function OutfitList({ currentProduct }) {

  const [outfit, setOutfit] = useState([]);
  const listType = { type: 'outfit' };

  const handleAdd = () => {

    var outfitList = JSON.parse(localStorage.getItem('outfit'));

    if (outfitList !== null) {
      for (var i = 0; i < outfitList.length; i++) {
        if (outfitList[i].name === currentProduct.name) {
          var alreadyAdded = true;
        }
      }
    }

    if (!alreadyAdded) {
      setOutfit(prevState => [...prevState, currentProduct]);
      var updatedOutfitList = [];
      updatedOutfitList.push(currentProduct);
      localStorage.setItem('outfit', JSON.stringify(updatedOutfitList));
    }

  };

  const handleRemove = () => {

  }

  return (
    <div id="My Outfit">
      <h3>Your Outfit</h3>
      <Carousel products={outfit} setOutfit={setOutfit} listType={listType} handleAdd={handleAdd} handleRemove={handleRemove} />
    </div>
  );
}

export default OutfitList;
