import React from 'react';
import { useState, useEffect } from 'react';
import ReviewTile from './ReviewTile.jsx';
import Filter from './Filter.jsx'
import AddReviewModal from './AddReviewModal.jsx';

const ReviewList = ({ reviewList, sortParam, setSortParam, reviewToAdd, setReviewToAdd }) => {
  const [reviewListLength, setReviewListLength] = useState(2);
  const [addReviewState, toggleAddReviewState] = useState(false);

  const moreReviewsButton = () => {
    return (
      reviewList && reviewList.length > reviewListLength &&
      <button id='reviews-moreReviews-button' data-testid='reviews-moreReviews-button'
        onClick={() => setReviewListLength(reviewListLength + 2)}>
        More Reviews
      </button>
    )
  }

  const addReview = () => {
    return (
      <button id='reviews-addReview-button' data-tesid='reviews-addReview-button'
      onClick={()=>toggleAddReviewState(!addReviewState)}>Add Review</button>
    )
  }

  return (
    <div id='reviewList' data-testid="reviewList">
    <Filter
    allReviews={reviewList}
    sortParam={sortParam}
    setSortParam={setSortParam}
    />
    {reviewList && reviewList.slice(0,reviewListLength).map((review) => {
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
      setReviewToAdd={setReviewToAdd}
    />
    {moreReviewsButton()}{addReview()}
    </div>
  )
}

export default ReviewList;