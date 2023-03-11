import React from 'react';
import ReviewTile from './ReviewTile.jsx';
import Filter from './Filter.jsx'

const ReviewList = (props) => {
  return (
    <div id='reviewList'>
    <Filter
    allReviews={props.reviewList}
    sortReviews={props.sortReviews}
    />
    --
    {props.reviewList.map((review) => {
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