import React, { useState, useEffect } from 'react';
import Carousel from './Carousel.jsx';

// this component is the carousel for "Your Outfit"
function OutfitList({ setProductId, starArr, related, outfits, setOutfits, currentProduct, product, productInformation }) {

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
          productId: product.id,
          productName: product.name,
          productPhoto: productInformation.photos[0].thumbnail_url,
          styleName: productInformation.name,
          productCost: (productInformation.sale_price || productInformation.original_price
                        || product.default_price),
          productCategory: product.category,
        });
      } else {
        updatedOutfits = [{
          productId: product.id,
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

  const handleRemove = (productDetails) => {
    let updatedOutfits = [...outfits];
    for (let i = 0; i < outfits.length; i += 1) {
      if (updatedOutfits[i].productName === productDetails.name
        && updatedOutfits[i].styleName === productDetails.style) {
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

  return (
    <div id="My Outfit">
      <h3>Your Outfit</h3>
      <Carousel setProductId={setProductId} currentProduct={currentProduct} starArr={starArr} related={related} products={outfits} setOutfits={setOutfits} listType={listType} handleAdd={handleAdd} handleRemove={handleRemove} />
    </div>
  );
}

export default OutfitList;
