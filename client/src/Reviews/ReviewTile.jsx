import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar, faCheck } from '@fortawesome/free-solid-svg-icons';
import { faStar as hollowStar } from '@fortawesome/free-regular-svg-icons';

library.add(faStar);
library.add(faCheck);

function ReviewTile({ review }) {
  const [reviewBodyButton, setReviewBodyButton] = useState(false);
  const [helpfulClick, setHelpfulClick] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const formatDate = () => {
    const year = review.date.slice(0, 4);
    const month = review.date.slice(5, 7);
    const day = review.date.slice(8, 10);
    return <span>{`${month}/${day}/${year}`}</span>;
  };

  const showPhotos = () => {
    const imgStyle = {
      cursor: 'pointer',
      maxWidth: expanded ? '300px' : '100px',
      maxHeight: expanded ? '300px' : '100px',
    };

    if (review.photos.length) {
      return (
        <>
          {review.photos.map((photo, ind) => (
            <img
              src={photo.url}
              alt="review-image"
              key={ind}
              data-testid="review-photo"
              onClick={() => { setExpanded(!expanded); }}
              style={imgStyle}
            />
          ))}
        </>
      );
    }
  };

  const starCount = (rating) => {
    const stars = [];
    while (rating > 0) {
      stars.push(<FontAwesomeIcon icon="fa-solid fa-star" data-testid="star" />);
      rating--;
    }
    return (
      <>
            {stars}
      </>
    );
  };

  const displayHollowStars = () => {
    return (
        <div className="hollow-stars">
          {[...Array(5)].map((_, index) => (
            <FontAwesomeIcon key={index} icon={hollowStar} />
          ))}
        </div>
    )
  }

  const displayAllStars = (rating) => {
    return (
      <div id="reviews-star-container" style={{position: 'relative'}}>
        {displayHollowStars()}
        <div style={{ position: 'absolute', top: 0, left: 0 }}>
        {starCount(rating)}
      </div>
      </div>
    )
  }

  const reviewBody = () => {
    if (!reviewBodyButton) {
      const reviewBody250 = review.body.slice(0, 250);
      return (
        <>
          {reviewBody250}
          <button data-testid="reviews-individualReview-bodyBtn" onClick={() => setReviewBodyButton(!reviewBodyButton)}>Expand</button>
        </>
      );
    }
    return (
      <>
        {review.body}
        <button onClick={() => setReviewBodyButton(!reviewBodyButton)}>Collapse</button>
      </>
    );
  };

  const reviewRecommend = () => {
    if (review.recommend) {
      return (
        <>
          <span>
            I recommend this product
          </span>
          <FontAwesomeIcon icon={faCheck} size="sm" />
        </>
      );
    }
  };

  const reviewHelpful = () => {
    const postHelpful = async () => {
      try {
        await axios.put(`/reviews/${review.review_id}/helpful`);
        setHelpfulClick(true);
      } catch (err) {
        console.log(err);
      }
    };

    if (!helpfulClick) {
      return (
        <div>
          <span>Helpful?</span>
          {' '}
          <button aria-label="Mark Review Helpful" data-testid="reviewHelpBtn" onClick={() => postHelpful()}>{` Yes ${review.helpfulness}`}</button>
        </div>
      );
    }
    return (
      <div>
        <span>Helpful?</span>
        {' '}
        <span datatest-id="reviewHelpBtnAfter">{` Yes ${review.helpfulness}`}</span>
      </div>
    );
  };

  return (
    <div id="reviewTile" data-testid="reviews-individualReview">
      <div id="reviewTile-top">
        <div id="reviewTile-stars" data-testid="reviews-individualReview-stars">
          {review.rating}
          {displayAllStars(review.rating)}
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
        <div id="reviewTile-body" data-testid="reviews-individualReview-body">{review.body.length < 250 ? review.body : reviewBody()}</div>
        <div id="reviewTile-photos">
          {' '}
          {showPhotos()}
        </div>
      </div>
      <div>
        {review.response ? `Response from seller: ${review.response}` : null}
      </div>
      <div>
        {reviewRecommend()}
      </div>
      {reviewHelpful()}
    </div>
  );
}

export default ReviewTile;
