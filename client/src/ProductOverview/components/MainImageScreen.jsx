/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/prop-types */
import React from 'react';

function MainImageScreen({ productInformation, mainImage, setMainImage }) {
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
        <button type="submit" id="overview-upButton">
          <span id="overview-upArrow" />
        </button>
        {productInformation.photos.map((photo, index) => (
          <img id="overview-sideImage" src={photo.thumbnail_url} key={photo.url} alt="Product View Options" data-testid={`image-${index}`} onClick={() => { setMainImage({ url: photo.url, index }); }} />
        ))}
        <button type="submit" id="overview-downButton">
          <span id="overview-downArrow" />
        </button>
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
      </div>
    </div>
  );
}

export default MainImageScreen;
