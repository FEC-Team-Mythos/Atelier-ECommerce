/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/prop-types */
import React from 'react';

function MainImageScreen({ productInformation, mainImage, setMainImage }) {
  return (
    <div>
      <ul className="overview-sideImages">
        {productInformation.photos.map((photo, index) => (
          <img id="overview-sideImage" src={photo.thumbnail_url} key={photo.url} alt="Product View Options" data-testid={`image-${index}`} onClick={() => { setMainImage(photo.url); }} />
        ))}
      </ul>
      <button type="submit" id="overview-leftButton">
        <div>
          {'<'}
        </div>
      </button>
      <img src={mainImage} alt="Main Product" id="overview-mainImage" />
      <button type="submit" id="overview-rightButton">
        <div>
          {'>'}
        </div>
      </button>
    </div>
  );
}

export default MainImageScreen;
