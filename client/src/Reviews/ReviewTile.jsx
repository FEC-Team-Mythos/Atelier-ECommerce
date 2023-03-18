import React from 'react';

function ReviewTile({ review }) {
  const formatDate = () => {
    const year = review.date.slice(0, 4);
    const month = review.date.slice(5, 7);
    const day = review.date.slice(8, 10);
    return <span>{`${month}/${day}/${year}`}</span>;
  };

  const showPhotos = () => {
    if (review.photos.length) {
      return (
        <div id="review-photos">
          {review.photos.map((photo, ind) => <img src={photo.url} key={ind} />)}
        </div>
      );
    }
  };

  return (
    <div id="reviewTile" data-testid="reviews-individualReview">
      <div>
        {review.rating}
        {' '}
        /
        {' '}
        {review.reviewer_name}
        {' '}
        /
        {' '}
        {formatDate()}
      </div>
      <div>{review.summary}</div>
      <div>{review.body}</div>
      {showPhotos()}
      <div>
        Response from seller:
        {review.response}
      </div>
      <div>
        Helpful?
        {review.helpfulness}
      </div>
      -----
    </div>
  );
}

export default ReviewTile;
