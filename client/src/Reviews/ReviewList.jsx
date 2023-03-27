import React, { useState, useEffect } from 'react';
import ReviewTile from './ReviewTile.jsx';
import Filter from './Filter.jsx';
import AddReviewModal from './AddReviewModal.jsx';

function ReviewList({
  reviewList, sortParam, setSortParam, reviewToAdd, setReviewToAdd, metaData
}) {
  const [reviewListLength, setReviewListLength] = useState(2);
  const [addReviewState, toggleAddReviewState] = useState(false);

  const moreReviewsButton = () => (
    reviewList && reviewList.length > reviewListLength
      && (
      <button
        id="reviews-moreReviews-button"
        data-testid="reviews-moreReviews-button"
        onClick={() => setReviewListLength(reviewListLength + 2)}
      >
        More Reviews
      </button>
      )
  );

  const addReview = () => (
    <button
      id="reviews-addReview-button"
      data-testid="reviews-addReview-button"
      onClick={() => toggleAddReviewState(!addReviewState)}
    >
      Add Review
    </button>
  );

  return (
    <div id="reviewList" data-testid="reviewList">
      <Filter
        allReviews={reviewList}
        sortParam={sortParam}
        setSortParam={setSortParam}
      />
      {reviewList && reviewList.slice(0, reviewListLength).map((review) => (
        <ReviewTile
          key={review.review_id}
          review={review}
        />
      ))}
      <AddReviewModal
        addReviewState={addReviewState}
        toggleAddReviewState={toggleAddReviewState}
        setReviewToAdd={setReviewToAdd}
        characteristics={metaData.characteristics}
      />
      {moreReviewsButton()}
      {addReview()}
    </div>
  );
}

export default ReviewList;
