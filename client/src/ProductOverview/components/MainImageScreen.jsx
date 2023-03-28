/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';

function MainImageScreen({ productInformation, mainImage, setMainImage }) {
  const [imageSelection, setImageSelection] = useState({
    indexSet: 0,
    productInfoList: productInformation.photos.slice(0, 7),
  });

  useEffect(() => {
    setImageSelection({
      indexSet: 0,
      productInfoList: productInformation.photos.slice(0, 7),
    });
  }, [productInformation]);

  const setList = (direction) => {
    const currentSetIndex = imageSelection.indexSet;
    if (direction === 'up') {
      if (productInformation.photos[currentSetIndex - 7]) {
        setImageSelection({
          indexSet: currentSetIndex - 7,
          productInfoList: productInformation.photos.slice(currentSetIndex - 7, 7),
        });
      } else {
        setImageSelection({
          indexSet: 0,
          productInfoList: productInformation.photos.slice(0, 7),
        });
      }
    } else if (direction === 'down') {
      if (productInformation.photos[currentSetIndex + 7]) {
        setImageSelection({
          indexSet: currentSetIndex + 7,
          productInfoList: productInformation.photos.slice(currentSetIndex + 7, currentSetIndex + 14),
        });
      }
    }
  };

  const changeImage = (direction) => {
    const currentPhotoIndex = mainImage.index;
    if (direction === 'left') {
      setMainImage({
        url: productInformation.photos[currentPhotoIndex - 1].url,
        index: currentPhotoIndex - 1,
      });
    } else if (direction === 'right') {
      setMainImage({
        url: productInformation.photos[currentPhotoIndex + 1].url,
        index: currentPhotoIndex + 1,
      });
    }
  };

  return (
    <div className="overview-imagesContainer">
      <ul className="overview-sideImages">
        {productInformation.photos[imageSelection.indexSet - 1]
          ? (
            <button type="submit" id="overview-upButton" onClick={() => { setList('up'); }}>
              <span id="overview-upArrow" />
            </button>
          )
          : null }
        {imageSelection.productInfoList.map((photo, index) => (
          <img
            id="overview-sideImage"
            src={photo.thumbnail_url}
            key={photo.url}
            alt="Product View Options"
            data-testid={`image-${index}`}
            onClick={() => {
              setMainImage({ url: photo.url, index: imageSelection.indexSet + index });
            }}
          />
        ))}
        {productInformation.photos[imageSelection.indexSet + 7]
          ? (
            <button type="submit" id="overview-downButton" onClick={() => { setList('down'); }}>
              <span id="overview-downArrow" />
            </button>
          )
          : null }
      </ul>
      <div className="overview-mainImageContainer">
        {productInformation.photos[mainImage.index - 1]
          ? (
            <button type="submit" id="overview-leftButton" onClick={() => { changeImage('left'); }}>
              <span id="overview-leftArrow" />
            </button>
          )
          : null }
        <img src={mainImage.url} alt="Main Product" id="overview-mainImage" />
        {productInformation.photos[mainImage.index + 1]
          ? (
            <button type="submit" id="overview-rightButton" onClick={() => { changeImage('right'); }}>
              <span id="overview-rightArrow" />
            </button>
          )
          : null }
        <button type="submit" id="overview-expand">Expand</button>
      </div>
    </div>
  );
}

export default MainImageScreen;
