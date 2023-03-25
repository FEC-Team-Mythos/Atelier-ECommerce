import React, { useState, useEffect } from 'react';
import Carousel from './Carousel.jsx';
import axios from 'axios';

// this component is the carousel for "Your Outfit"
function OutfitList() {

  const [outfit, setOutfit] = useState([]);
  const listType = {type: 'outfit'};

  return (
    <div id="My Outfit">
    <h3>Your Outfit</h3>
    <Carousel product={outfit} listType={listType}/>
    </div>
  );

}

export default OutfitList;