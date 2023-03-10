import React from 'react';

const StarBox = (props) => {

  const avgRating = (avg=0) => {
    props.allReviews.forEach((review) => {
      avg += review.rating;
    })
    return avg / props.allReviews.length;
  }

  const avgRecommend = (avg=0) => {
    props.allReviews.forEach((review) => {
      review.recommend ? avg++ : null
    })
    return avg / props.allReviews.length * 100 + '% of reviews recommend this product';
  }

  return (
    <div>
      <div>{avgRating()} <span className="star">&#9733;</span>  </div>
      <div>
        5/4/3/2/1 STAR CHART
      </div>
      <div>{avgRecommend()}</div>
      ----
    </div>
  )
}

export default StarBox;