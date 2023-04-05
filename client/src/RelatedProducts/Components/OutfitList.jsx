import React, { useState, useEffect } from 'react';
import Carousel from './Carousel.jsx';

// this component is the carousel for "Your Outfit"
function OutfitList({ outfits, setOutfits, currentProduct, product, productInformation }) {

  const listType = { type: 'outfit' };

  useEffect(() => {
    const outfitList = JSON.parse(localStorage.getItem('outfits'));
    if (outfitList) {
      setOutfits(outfitList);
    }
  },[]);

  const handleAdd = () => {
    let updatedOutfits = [...outfits];

    var favorited = false;
    for (let i = 0; i < outfits.length; i += 1) {
      if (updatedOutfits[i].productName === product.name
        && updatedOutfits[i].styleName === productInformation.name) {
        favorited = true;
      }
    }
    if (favorited === false) {
      if (updatedOutfits.length) {
        updatedOutfits.push({
          productName: product.name,
          productPhoto: productInformation.photos[0].thumbnail_url,
          styleName: productInformation.name,
          productCost: (productInformation.sale_price || productInformation.original_price
                        || product.default_price),
          productCategory: product.category,
        });
      } else {
        updatedOutfits = [{
          productName: product.name,
          productPhoto: productInformation.photos[0].thumbnail_url,
          styleName: productInformation.name,
          productCost: (productInformation.sale_price || productInformation.original_price
                        || product.default_price),
          productCategory: product.category,
        }];
      }
      if (!updatedOutfits.length) {
        localStorage.removeItem('outfits');
      } else {
        localStorage.setItem('outfits', JSON.stringify(updatedOutfits));
      }
      setOutfits(updatedOutfits);
    }
  };

  const handleRemove = () => {
    let updatedOutfits = [...outfits];
    for (let i = 0; i < outfits.length; i += 1) {
      if (updatedOutfits[i].productName === product.name
        && updatedOutfits[i].styleName === productInformation.name) {
        updatedOutfits.splice(i, 1);
        break;
      }
    }
    if (!updatedOutfits.length) {
      localStorage.removeItem('outfits');
    } else {
      localStorage.setItem('outfits', JSON.stringify(updatedOutfits));
    }
    setOutfits(updatedOutfits);
  };

  /*
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
  */

  return (
    <div id="My Outfit">
      <h3>Your Outfit</h3>
      <Carousel products={outfits} setOutfits={setOutfits} listType={listType} handleAdd={handleAdd} handleRemove={handleRemove} />
    </div>
  );
}

export default OutfitList;
