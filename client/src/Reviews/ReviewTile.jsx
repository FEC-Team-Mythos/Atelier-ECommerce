import React from 'react';

const ReviewTile = ({ review }) => {
  return (
    <div id='reviewTile'>
      <div>{review.rating} / {review.reviewer_name} / {review.date}</div>
      <div>{review.summary}</div>
      <div>{review.body}</div>
      <div>{review.response}</div>
      <div>Helpful? {review.helpfulness}</div>
      -----
    </div>
  )
}

export default ReviewTile;