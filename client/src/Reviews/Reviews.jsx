import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';

import ReviewList from './ReviewList.jsx';
import StarBox from './StarBox.jsx';

const Reviews = () => {
  const [allReviews, setAllReviews] = useState([]);

  const getReviewData = async () => {
    //Product ID should be dynamic here, will grab from other widget
    try {
      var response = await axios.get('/reviews/', {params: {product_id: 71697}})
      setAllReviews(response.data.results);
    } catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getReviewData()
  }, [setAllReviews]);

  return (
    <>
    <ReviewList
      allReviews={allReviews}
    />
    </>
  )
}

export default Reviews;