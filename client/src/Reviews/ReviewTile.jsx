import React from 'react';

const ReviewTile = (props) => {
  return (
    <div id='reviewTile'>
      {props.review.rating}
      {props.review.reviewer_name}
      {props.review.date}
      {props.review.summary}
      {props.review.body}
      {props.review.response}
      {props.review.helpfulness}
    </div>
  )
}

export default ReviewTile;