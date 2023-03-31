import React, { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar } from '@fortawesome/free-solid-svg-icons'
import Characteristics from './Characteristics.jsx';

library.add(faStar);

function NewBreakdown({ metaData={}, filterParams, setFilterParams, avgRating, setAvgRating, starArr, setStars, allReviews }) {
  const [recommended, setRecommended] = useState(0);
  const [chartRatings, setChartRatings] = useState({});
  const [totalRatings, setTotalRatings] = useState(0);

  const calcAvgRating = (avg = 0, total = 0) => {
    for (const rating in metaData.ratings) {
      avg += (rating * metaData.ratings[rating]);
      total += Number(metaData.ratings[rating]);
    }
    setTotalRatings(total);
    setAvgRating(Number((avg / total).toFixed(1)));
  };

  const starCount = () => {
    let roundToNearestQuarter = Math.round(avgRating * 4) / 4;
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (roundToNearestQuarter > 1) {
        stars.push(<FontAwesomeIcon icon="fa-solid fa-star" />);
        roundToNearestQuarter--;
      } else if (roundToNearestQuarter < 1 && roundToNearestQuarter >= 0.75) {
        stars.push(<span className="threeQ"><FontAwesomeIcon icon="fa-solid fa-star" /></span>);
        roundToNearestQuarter--;
      } else if (roundToNearestQuarter < 0.75 && roundToNearestQuarter >= 0.5) {
        stars.push(<span className="oneHalf"><FontAwesomeIcon icon="fa-solid fa-star" /></span>);
        roundToNearestQuarter--;
      } else if (roundToNearestQuarter < 0.5 && roundToNearestQuarter >= 0.25) {
        stars.push(<span className="oneQuarter"><FontAwesomeIcon icon="fa-solid fa-star" /></span>);
        roundToNearestQuarter--;
      }
    }
    setStars(stars);
  };

  const calcRecommend = () => {
    if (metaData.recommended) {
      const didRecommend = Number(metaData.recommended.true);
      const total = Number(metaData.recommended.true) + Number(metaData.recommended.false);
      setRecommended(Math.round((didRecommend / total) * 100));
    }
  };

  const displayRecommended = () => (
    <div>
      {recommended}
      % recommended
    </div>
  );

  const calcReviewNum = (currentRating) => {
    if (allReviews.length) {
      const reviewsByRating = allReviews.filter((review) => {
        return review.rating === currentRating;
      });
      return reviewsByRating.length;
    }
  };

  const ratingsGraph = () => {
    if (totalRatings > 1) {
      return (
        chartRatings.map((rating, index) => {
          const barStyle = {
            backgroundColor: '#2E8B57',
            height: '10px',
            width: rating.count / 2,
          };

          return (
            <div key={index} className="bar" onClick={() => { filterClick(rating.rating); }}>
              <span className="leftBarText">
                {`${rating.rating} `}
                <FontAwesomeIcon icon="fa-solid fa-star" />
              </span>
              <div id="total-rating-bar" style={{ width: totalRatings / 2 }}>
                <div id={`${rating.rating}-rating-bar`} style={barStyle} />
              </div>
              <span className="rightBarText">{calcReviewNum(rating.rating)}</span>
            </div>
          );
        })
      );
    }
  };

  const filterClick = useCallback(
    (clickedRating) => {
      if (filterParams.includes(clickedRating)) {
        setFilterParams(filterParams.filter((rating) => rating !== clickedRating));
      } else {
        setFilterParams([...filterParams, clickedRating]);
      }
    },
    [filterParams, setFilterParams],
  );

  const displayFilters = () => {
    const sortedFilterParams = filterParams.sort().join(', ');
    if (filterParams.length > 0) {
      return (
        <div>
          Reviews filtered by
          {' '}
          {sortedFilterParams}
          {' '}
          stars
        </div>
      );
    }
  };

  const removeFilters = () => {
    if (filterParams.length > 0) {
      return (
        <button onClick={()=> setFilterParams([])}>
          Remove Filters
        </button>
      )
    }
  }

  useEffect(() => {
    const chartData = [
      { rating: 1, count: 0, total: totalRatings },
      { rating: 2, count: 0, total: totalRatings },
      { rating: 3, count: 0, total: totalRatings },
      { rating: 4, count: 0, total: totalRatings },
      { rating: 5, count: 0, total: totalRatings },
    ];

    for (const rating in metaData.ratings) {
      chartData[rating - 1].count = Number(metaData.ratings[rating]);
    }

    setChartRatings(chartData);
  }, [totalRatings]);

  useEffect(() => {
    calcAvgRating();
    calcRecommend();
  }, [metaData]);

  useEffect(() => {
    starCount();
  }, [avgRating]);

  return (
    <div id="breakdown" data-testid="reviews-breakdown">
      <span id="reviews-graph-avg">
        {avgRating}
        {" "}
        {starArr}
      </span>
      <div id="reviews-ratingsGraph">
        {ratingsGraph()}
      </div>
      <Characteristics
        characteristics={metaData.characteristics}
      />
      {displayRecommended()}
      {displayFilters()}
      {removeFilters()}
    </div>
  );
}

export default NewBreakdown;
