import React from 'react';

const ReviewTile = (props) => {
  return (
    <div id='reviewTile'>
      <div>{props.review.rating} / {props.review.reviewer_name} / {props.review.date}</div>
      <div>{props.review.summary}</div>
      <div>{props.review.body}</div>
      <div>{props.review.response}</div>
      <div>Helpful? {props.review.helpfulness}</div>
      -----
    </div>
  )
}

export default ReviewTile;