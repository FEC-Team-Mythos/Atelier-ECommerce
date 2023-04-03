import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ReviewList from './ReviewList.jsx';
import NewBreakdown from './NewBreakdown.jsx';

function Reviews({
  changeRequestHook, avgRating, setAvgRating, starArr, setStars, setTotalReviewsPerProduct
}) {
  const [clickedElement, clickedTime] = changeRequestHook('reviews');

  const [allReviews, setAllReviews] = useState([]);
  const [metaData, setMetaData] = useState([]);
  const [filterParams, setFilterParams] = useState([]);
  const [sortParam, setSortParam] = useState('relevance');
  const [reviewList, setReviewList] = useState([]);

  const getReviewData = async (count) => {
    // Product ID should be dynamic here, will grab from other widget
    try {
      const response = await axios.get('/reviews', { params: { count: 250, sort: 'relevant', product_id: 71697 } });
      setAllReviews(response.data.results);
      setReviewList(response.data.results);
      setTotalReviewsPerProduct(response.data.results.length);
    } catch (err) {
      console.log(err);
    }
  };

  const getReviewMetaData = async () => {
    // Product ID should be dynamic here, will grab from other widget
    try {
      const response = await axios.get('/reviews/meta', { params: { product_id: 71697 } });
      setMetaData(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const sortReviews = async () => {
    try {
      const response = await axios.get('/reviews/', { params: { count: 250, sort: sortParam, product_id: 71697 } });
      if (filterParams.length) {
        const newReviews = response.data.results.filter((review) => filterParams.includes(review.rating));
        setReviewList(newReviews);
      } else {
        setReviewList(response.data.results);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const filterReviews = async () => {
    try {
      if (!filterParams || filterParams.length === 0) {
        setReviewList(allReviews);
      } else {
        const newReviews = allReviews.filter((review) => filterParams.includes(review.rating));
        setReviewList(newReviews);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getReviewData();
    getReviewMetaData();
  }, []);

  useEffect(() => {
    sortReviews();
  }, [sortParam]);

  useEffect(() => {
    filterReviews();
  }, [filterParams]);

  return (
    <div id="reviews" data-testid="reviews">
      <NewBreakdown
        metaData={metaData}
        filterParams={filterParams}
        setFilterParams={setFilterParams}
        starArr={starArr}
        setStars={setStars}
        avgRating={avgRating}
        setAvgRating={setAvgRating}
        allReviews={allReviews}
      />
      <ReviewList
        sortParam={sortParam}
        setSortParam={setSortParam}
        reviewList={reviewList}
        metaData={metaData}
      />
    </div>
  );
}

export default Reviews;
