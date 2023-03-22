import React from 'react';

function MainImageScreen({ productInformation, mainImage, setMainImage }) {
  return (
    <div>
      <ul>
        {productInformation.photos.map((photo, index) => (
          <img src={photo.thumbnail_url} key={photo.url} alt="Product View Options" data-testid={`image-${index}`} onClick={() => {setMainImage(photo.url) }} />
        ))}
      </ul>
      <img src={mainImage} alt="Main Product" />
    </div>
  );
}

export default MainImageScreen;
