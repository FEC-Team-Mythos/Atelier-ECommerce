import React, { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Characteristics from './Characteristics.jsx';

library.add(faStar);

function NewBreakdown({ metaData, filterParams, setFilterParams }) {
  const [avgRating, setAvgRating] = useState(0);
  const [recommended, setRecommended] = useState(0);
  const [chartRatings, setChartRatings] = useState({});
  const [totalRatings, setTotalRatings] = useState(0);

  const calcAvgRating = (avg = 0, total = 0) => {
    for (const rating in metaData.ratings) {
      avg += (rating * metaData.ratings[rating]);
      total += Number(metaData.ratings[rating]);
    }
    setTotalRatings(total);
    setAvgRating(Number((avg / total).toFixed(2)));
  };

  const starCount = () => {
    let roundToNearestQuarter = Math.round(avgRating * 4) / 4;
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      console.log(roundToNearestQuarter);
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
    return (
      <span id="stars">
        {stars}
      </span>
    );
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

  const ratingsGraph = () => {
    if (totalRatings > 1) {
      return (
        chartRatings.map((rating) => {
          const barStyle = {
            backgroundColor: '#2E8B57',
            height: '10px',
            width: rating.count / 2,
          };

          return (
            <div className="bar" onClick={() => { filterClick(rating.rating); }}>
              <span className="leftBarText">
                {`${rating.rating} `}
                <FontAwesomeIcon icon="fa-solid fa-star" />
              </span>
              <div id="total-rating-bar" style={{ width: totalRatings / 2 }}>
                <div id={`${rating.rating}-rating-bar`} style={barStyle} />
              </div>
              <span className="rightBarText">{rating.count}</span>
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

  return (
    <div id="breakdown">
      <span id="reviews-graph-avg">
        {avgRating}
        {" "}
        {starCount()}
      </span>
      <div id="reviews-ratingsGraph">
        {ratingsGraph()}
      </div>
      <Characteristics
        characteristics={metaData.characteristics}
      />
      {displayRecommended()}
      {displayFilters()}
    </div>
  );
}

export default NewBreakdown;
