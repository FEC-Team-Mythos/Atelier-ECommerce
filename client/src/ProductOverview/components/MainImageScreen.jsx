import React, {useState, useEffect} from 'react';

const MainImageScreen = ({productInformation, mainImage, setMainImage}) => {

  return (
    <div>
      <ul>
        {productInformation.photos.map((photo,index) => (
          <img src={photo.thumbnail_url} key={photo.url} data-testid={`image-${index}`} onClick={()=>{setMainImage(photo.url)}}></img>
        ))}
      </ul>
      <img src={mainImage}/>
    </div>
  )
}

export default MainImageScreen;