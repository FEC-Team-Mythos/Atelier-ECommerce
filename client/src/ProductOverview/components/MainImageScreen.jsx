import React, {useState, useEffect} from 'react';

const MainImageScreen = ({productStock, mainImage, setMainImage}) => {

  return (
    <div>
      <ul>
        {productStock.photos.map(photo => (
          <img src={photo.thumbnail_url} key={photo.url} onClick={()=>{setMainImage(photo.url)}}></img>
        ))}
      </ul>
      <img src={mainImage}/>
    </div>
  )
}

export default MainImageScreen;