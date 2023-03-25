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
    <div>
      <div className="overview-imagesContainer">
        <button type="submit" id="overview-upButton">
          <div>
            Up
          </div>
        </button>
        <ul className="overview-sideImages">
          {productInformation.photos.map((photo, index) => (
            <img id="overview-sideImage" src={photo.thumbnail_url} key={photo.url} alt="Product View Options" data-testid={`image-${index}`} onClick={() => { setMainImage({ url: photo.url, index }); }} />
          ))}
        </ul>
        <button type="submit" id="overview-downButton">
          <div>
            Down
          </div>
        </button>
      </div>
      {productInformation.photos[mainImage.index - 1]
        ? (
          <button type="submit" id="overview-leftButton" onClick={() => { changeImage('left'); }}>
            <div>
              {'<'}
            </div>
          </button>
        )
        : null }
      <img src={mainImage.url} alt="Main Product" id="overview-mainImage" />
      {productInformation.photos[mainImage.index + 1]
        ? (
          <button type="submit" id="overview-rightButton" onClick={() => { changeImage('right'); }}>
            <div>
              {'>'}
            </div>
          </button>
        )
        : null }
    </div>
  );
}

export default MainImageScreen;
