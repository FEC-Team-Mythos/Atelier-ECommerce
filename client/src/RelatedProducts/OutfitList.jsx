import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Card from './Card.jsx';
import Carousel from './Carousel.jsx';

const OutfitList = () => {


  return (
    <div>
      <h3>My Outfit</h3>
      <Carousel />
    </div>
  )

}

export default OutfitList;