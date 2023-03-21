import React from 'react';
import {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar, faCheck } from '@fortawesome/free-solid-svg-icons';

library.add(faStar);
library.add(faCheck);

function ReviewTile({ review }) {
  const [reviewBodyButton, setReviewBodyButton] = useState(false);

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

  const reviewBody = () => {
    if (!reviewBodyButton) {
      var reviewBody250 = review.body.slice(0, 250);
      return (
      <>
        {reviewBody250}
        <button onClick={()=>setReviewBodyButton(!reviewBodyButton)}>Expand</button>
      </>
      )
    } else {
      return (
        <>
        {review.body}
        <button onClick={()=>setReviewBodyButton(!reviewBodyButton)}>Collapse</button>
        </>
      )
    }
  };

  const reviewRecommend = () => {
    if (review.recommend) {
      return <>
      <span>
        I recommend this product
      </span>
      <FontAwesomeIcon icon={faCheck} size="sm" />
      </>
    }
  }

  return (
    <div id="reviewTile" data-testid="reviews-individualReview">
      <div id="reviewTile-top">
        <div id="reviewTile-stars">
        {review.rating}{starCount(review.rating)}
        </div>
        <div id="reviewTile-date">
        {formatDate()}
        </div>
      </div>
      <div id="reviewTile-username">
        {review.reviewer_name}
        </div>
      <div id="reviewTile-text">
        <div id="reviewTile-summary">{review.summary}</div>
        <div id="reviewTile-body">{review.body.length < 250 ? review.body : reviewBody()}</div>
        <div id="reviewTile-photos">      {showPhotos()}</div>
      </div>
      <div>
        {review.response ? `Response from seller: ${review.response}` : null}
      </div>
      <div>
        {reviewRecommend()}
      </div>
      <div>
        Helpful?
        {review.helpfulness}
      </div>
    </div>
  );
}

export default ReviewTile;
