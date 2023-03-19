import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar } from '@fortawesome/free-solid-svg-icons';

library.add(faStar);

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

  const starCount = (rating) => {
    const stars = [];
    while (rating > 0) {
      stars.push(<FontAwesomeIcon icon="fa-solid fa-star" />);
      rating--;
    }
    return (
      <span id="stars">
        {stars}
      </span>
    );
  };

  return (
    <div id="reviewTile" data-testid="reviews-individualReview">
      <div>
        {review.rating}
        {starCount(review.rating)}
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
    </div>
  );
}

export default ReviewTile;
