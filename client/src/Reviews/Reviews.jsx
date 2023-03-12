import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';

import ReviewList from './ReviewList.jsx';
import StarBox from './StarBox.jsx';

const Reviews = () => {
  const [allReviews, setAllReviews] = useState([]);

  const [filteredReviews, setFilteredReviews] = useState([]);
  const [filterParams, setFilterParams] = useState([]);
  const [sortParam, setSortParam] = useState('relevance');

  const [reviewList, setReviewList] = useState([]);

  const getReviewData = async () => {
    //Product ID should be dynamic here, will grab from other widget
    try {
      var response = await axios.get('/reviews/', {params: {sort: 'relevance', product_id: 71697}})
      setAllReviews(response.data.results);
      setReviewList(response.data.results);
    } catch(err) {
      console.log(err);
    }
  }

  const sortReviews = async (sortParam) => {
    try {
      setSortParam(sortParam);
      var response = await axios.get('/reviews/', {params: {sort: sortParam, product_id: 71697}})
      if (filterParams) {
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
  }, []);

  useEffect(() => {
    filterReviews()
  }, [filterParams]);

  return (
    <div id='reviews'>
    <StarBox
      allReviews={allReviews}
      filteredReviews={filteredReviews}
      filterParams={filterParams}
      setFilterParams={setFilterParams}
    />
    <ReviewList
      sortReviews={sortReviews}
      reviewList={reviewList}
    />
    </div>
  )
}

export default Reviews;