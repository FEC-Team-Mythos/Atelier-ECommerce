import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import ProductOverview from './ProductOverview/ProductOverview.jsx';
import QuestionsAndAnswers from './QuestionsAndAnswers/QuestionsAndAnswers.jsx';
import RelatedProducts from './RelatedProducts/RelatedProducts.jsx';
import Reviews from './Reviews/Reviews.jsx';



const App = () => {
  return (
    <>
      <ProductOverview />
      <RelatedProducts />
      <QuestionsAndAnswers />
      <Reviews />
    </>
  )
}

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);