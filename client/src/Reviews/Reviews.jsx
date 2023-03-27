import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ReviewList from './ReviewList.jsx';
import NewBreakdown from './NewBreakdown.jsx';

function Reviews({ request, changeRequestHook }) {
  // add state to top component of Widget to track all clicks in widget. Set widget in initial state declaration
  const [clickedElement, clickedTime] = changeRequestHook('reviews');

  const [allReviews, setAllReviews] = useState([]);
  const [metaData, setMetaData] = useState([]);

  const [filteredReviews, setFilteredReviews] = useState([]);
  const [filterParams, setFilterParams] = useState([]);
  const [sortParam, setSortParam] = useState('relevance');

  const [reviewList, setReviewList] = useState([]);
  const [reviewToAdd, setReviewToAdd] = useState({});

  const getReviewData = async () => {
    // Product ID should be dynamic here, will grab from other widget
    try {
      const response = await axios.get('/reviews', { params: { count: 250, sort: 'relevant', product_id: 71697 } });
      setAllReviews(response.data.results);
      setReviewList(response.data.results);
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

  useEffect(() => {
    // console.log(reviewToAdd)
  }, [reviewToAdd]);

  return (
    <div id="reviews" data-testid="reviews">
      <NewBreakdown
        metaData={metaData}
        filterParams={filterParams}
        setFilterParams={setFilterParams}
      />
      <ReviewList
        sortParam={sortParam}
        setSortParam={setSortParam}
        reviewList={reviewList}
        setReviewToAdd={setReviewToAdd}
        metaData={metaData}
      />
    </div>
  );
}

export default Reviews;
