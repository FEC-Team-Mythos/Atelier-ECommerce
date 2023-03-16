import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import RelatedList from './RelatedList.jsx';
import OutfitList from './OutfitList.jsx';

// this is the parent component for the Related Products widget
const RelatedProducts = () => {
  return (
    <div>
      Related Products Confirmation
      <RelatedList />
      <OutfitList />
    </div>
  )
}

export default RelatedProducts;