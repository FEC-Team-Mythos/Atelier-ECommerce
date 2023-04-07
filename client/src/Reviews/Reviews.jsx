import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import ReviewList from './ReviewList.jsx';
import NewBreakdown from './NewBreakdown.jsx';

function Reviews({
  changeRequestHook, avgRating, setAvgRating, starArr, setStars, setTotalReviewsPerProduct, productId
}) {
  const [clickedElement, clickedTime] = changeRequestHook('reviews');

  const [allReviews, setAllReviews] = useState([]);
  const [metaData, setMetaData] = useState([]);
  const [filterParams, setFilterParams] = useState([]);
  const [sortParam, setSortParam] = useState('relevance');
  const [reviewList, setReviewList] = useState([]);

  const getReviewData = async () => {
    try {
      const response = await axios.get('/reviews', { params: { count: 250, sort: 'relevant', product_id: productId } });
      setAllReviews(response.data.results);
      setReviewList(response.data.results);
      setTotalReviewsPerProduct(response.data.results.length);
    } catch (err) {
      console.log(err);
    }
  };

  const getReviewMetaData = async () => {
    try {
      const response = await axios.get('/reviews/meta', { params: { product_id: productId } });
      setMetaData(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const sortReviews = useCallback(async () => {
    try {
      const response = await axios.get('/reviews/', { params: { count: 250, sort: sortParam, product_id: productId } });
      if (filterParams.length) {
        const newReviews = response.data.results.filter((review) => filterParams.includes(review.rating));
        setReviewList(newReviews);
      } else {
        setReviewList(response.data.results);
      }
    } catch (err) {
      console.log(err);
    }
  }, [filterParams, productId, sortParam]);

  const filterReviews = useCallback(async () => {
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
  }, [allReviews, filterParams]);

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
        productId={productId}
      />
    </div>
  );
}

export default Reviews;
