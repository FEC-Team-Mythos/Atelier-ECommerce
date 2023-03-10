import React, {useState, useEffect} from 'react';

const MainImageScreen = ({productStock}) => {

  const [mainImage, setMainImage] = useState(productStock.results[0].photos[0].url);


  return (
    <div>
      <ul>
        {productStock.results[0].photos.map(photo => (
          <img src={photo.thumbnail_url} key={photo.url}></img>
        ))}
      </ul>
      <img src={mainImage}/>
    </div>
  )
}

export default MainImageScreen;