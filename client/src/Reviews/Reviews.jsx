import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';

import ReviewList from './ReviewList.jsx';
import NewBreakdown from './NewBreakdown.jsx';


const Reviews = () => {
  const [allReviews, setAllReviews] = useState([]);
  const [metaData, setMetaData] = useState([]);

  const [filteredReviews, setFilteredReviews] = useState([]);
  const [filterParams, setFilterParams] = useState([]);
  const [sortParam, setSortParam] = useState('relevance');

  const [reviewList, setReviewList] = useState([]);
  const [reviewToAdd, setReviewToAdd] = useState({});

  const getReviewData = async () => {
    //Product ID should be dynamic here, will grab from other widget
    try {
      var response = await axios.get('/reviews', {params: {sort: 'relevance', product_id: 71697}})
      setAllReviews(response.data.results);
      setReviewList(response.data.results);
    } catch(err) {
      console.log(err);
    }
  }

  const getReviewMetaData = async () => {
    //Product ID should be dynamic here, will grab from other widget
    try {
      var response = await axios.get('/reviews/meta', {params: {product_id: 71697}})
      setMetaData(response.data);
    } catch(err) {
      console.log(err);
    }
  }

  const sortReviews = async () => {
    try {
      var response = await axios.get('/reviews/', {params: {sort: sortParam, product_id: 71697}})
      if (filterParams.length) {
        var newReviews = response.data.results.filter((review) => {
          return filterParams.includes(review.rating);
        })
        setReviewList(newReviews)
      } else {
        setReviewList(response.data.results);
      }
    } catch(err) {
      console.log(err);
    }
  }

  const filterReviews = async () => {
    try {
      if (!filterParams || filterParams.length === 0) {
        setReviewList(allReviews);
      } else {
        var newReviews = allReviews.filter((review) => {
          return filterParams.includes(review.rating);
        })
        setReviewList(newReviews)
      }
    } catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getReviewData()
    getReviewMetaData()
  }, []);

  useEffect(() => {
    sortReviews()
  }, [sortParam]);

  useEffect(() => {
    filterReviews()
  }, [filterParams]);

  useEffect(() => {
    // console.log(reviewToAdd)
  }, [reviewToAdd]);

  return (
    <div id='reviews'>
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
    />
    </div>
  )
}

export default Reviews;