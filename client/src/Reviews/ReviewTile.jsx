import React from 'react';

const ReviewTile = ({ review }) => {
  const formatDate = () => {
    var year = review.date.slice(0, 4);
    var month = review.date.slice(5, 7);
    var day = review.date.slice(8, 10)
    return <span>{`${month}/${day}/${year}`}</span>
  }

  const showPhotos = () => {
    if (review.photos.length) {
      return <div id="review-photos">
        {review.photos.map((photo) => {
          return <img src={photo.url} />
        })}
      </div>
    }
  }

  return (
    <div id='reviewTile'>
      {console.log(review)}
      <div>{review.rating} / {review.reviewer_name} / {formatDate()}</div>
      <div>{review.summary}</div>
      <div>{review.body}</div>
      {showPhotos()}
      <div>Response from seller: {review.response}</div>
      <div>Helpful? {review.helpfulness}</div>
      -----
    </div>
  )
}

export default ReviewTile;