import React from 'react';
import { useState, useEffect } from 'react';
import ReviewTile from './ReviewTile.jsx';
import Filter from './Filter.jsx'

const ReviewList = (props) => {
  const [reviewListLength, setReviewListLength] = useState(2);

  const moreReviewsButton = () => {
    if (reviewListLength < props.reviewList.length) {
      return (
        <button onClick={()=>setReviewListLength(reviewListLength + 2)}>More Reviews</button>
      )
    }
  }

  return (
    <div id='reviewList'>
    <Filter
    allReviews={props.reviewList}
    sortParam={props.sortParam}
    setSortParam={props.setSortParam}
    />
    --
    {props.reviewList.slice(0,reviewListLength).map((review) => {
      return(
        <ReviewTile
        key={review.review_id}
        review={review}
        />
      )
    })}
    {moreReviewsButton()}
    </div>
  )
}

export default ReviewList;