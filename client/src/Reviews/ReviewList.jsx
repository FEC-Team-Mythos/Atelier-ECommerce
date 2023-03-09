import React from 'react';
import ReviewTile from './ReviewTile.jsx';

const ReviewList = (props) => {
  return (
    <div id='reviewList'>
    {props.allReviews.map((review) => {
      return(
        <ReviewTile
        key={review.review_id}
        review={review}
        />
      )
    })}
    </div>
  )
}

export default ReviewList;