import React from 'react';
import { useState, useEffect } from 'react';
import ReviewTile from './ReviewTile.jsx';
import Filter from './Filter.jsx'
import AddReviewModal from './AddReviewModal.jsx';

const ReviewList = ({ reviewList, sortParam, setSortParam }) => {
  const [reviewListLength, setReviewListLength] = useState(2);
  const [addReviewState, toggleAddReviewState] = useState(false);

  const moreReviewsButton = () => {
    if (reviewListLength < reviewList.length) {
      return (
        <button onClick={()=>setReviewListLength(reviewListLength + 2)}>More Reviews</button>
      )
    }
  }

  const addReview = () => {
    return (
      <button onClick={()=>toggleAddReviewState(!addReviewState)}>Add Review</button>
    )
  }

  return (
    <div id='reviewList'>
    <Filter
    allReviews={reviewList}
    sortParam={sortParam}
    setSortParam={setSortParam}
    />
    --
    {reviewList.slice(0,reviewListLength).map((review) => {
      return(
        <ReviewTile
        key={review.review_id}
        review={review}
        />
      )
    })}
    <AddReviewModal
      addReviewState={addReviewState}
      toggleAddReviewState={toggleAddReviewState}
    />
    {moreReviewsButton()}{addReview()}
    </div>
  )
}

export default ReviewList;