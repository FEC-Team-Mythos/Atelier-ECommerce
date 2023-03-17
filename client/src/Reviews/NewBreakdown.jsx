import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Characteristics from './Characteristics.jsx';

library.add(faStar);

const NewBreakdown = ({ metaData, filterParams, setFilterParams }) => {
  const [avgRating, setAvgRating] = useState(0);
  const [recommended, setRecommended] = useState(0);
  const [chartRatings, setChartRatings] = useState({})
  const [totalRatings, setTotalRatings] = useState(0);

  const calcAvgRating = (avg=0, total=0) => {
    for (var rating in metaData.ratings) {
      avg += (rating * metaData.ratings[rating]);
      total += Number(metaData.ratings[rating])
      }
    setTotalRatings(total);
    setAvgRating(Number((avg/total).toFixed(2)));
  }

  const starCount = () => {
    var roundToNearestQuarter = Math.round(avgRating * 4) / 4;
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (roundToNearestQuarter > 1) {
        stars.push(<FontAwesomeIcon icon="fa-solid fa-star" />);
        roundToNearestQuarter--;
      } else if (roundToNearestQuarter < 1 && roundToNearestQuarter >= 0.75) {
        stars.push(<span className='threeQ' ><FontAwesomeIcon icon="fa-solid fa-star" /></span>);
        roundToNearestQuarter--;
      } else if (roundToNearestQuarter < 0.75 && roundToNearestQuarter >= 0.5) {
        stars.push(<span className="oneHalf"><FontAwesomeIcon icon="fa-solid fa-star" /></span>);
        roundToNearestQuarter--;
      } else if (roundToNearestQuarter < 0.5 && roundToNearestQuarter >= 0.25) {
        stars.push(<span className="oneQuarter"><FontAwesomeIcon icon="fa-solid fa-star" /></span>);
        roundToNearestQuarter--;
      }
    }
    return (<span id="stars">
      {stars}
    </span>)
  }

  const calcRecommend = () => {
    if (metaData.recommended) {
      const didRecommend = Number(metaData.recommended[true])
      const total = Number(metaData.recommended[true]) + Number(metaData.recommended[false]);
      setRecommended(Math.round((didRecommend / total) * 100));
    }
  }

  const displayRecommended = () => {
    return (
      <div>
        {recommended}% recommended
      </div>
    )
  }

  const ratingsGraph = () => {
    if (totalRatings > 1) {
      return (
        chartRatings.map((rating) => {
          var barStyle = {
            backgroundColor: 'blue',
            height: "20px",
            width: rating.count,
          }

          return (
            <div className='bar' onClick={() => {console.log(rating.rating)}}>
            <span className='leftBarText'>{rating.rating + " "}<FontAwesomeIcon icon="fa-solid fa-star" /></span>
              <div id='total-rating-bar' style={{width: totalRatings}}>
                <div id={`${rating.rating}-rating-bar`} style={barStyle}>
              </div>
            </div>
              <span className="rightBarText">{rating.count}</span>
              </div>
          )
        })
      )
    }
  }


  const displayFilters = () => {
    var sortedFilterParams = filterParams.sort().join(', ');
    if (filterParams.length > 0) {
      return <div>
        Reviews filtered by {sortedFilterParams} stars
      </div>
    }
  }

  useEffect(() => {
    const chartData = [
      { rating: 1, count: 0, total: totalRatings},
      { rating: 2, count: 0, total: totalRatings},
      { rating: 3, count: 0, total: totalRatings},
      { rating: 4, count: 0, total: totalRatings},
      { rating: 5, count: 0, total: totalRatings},
    ];

    for (var rating in metaData.ratings) {
      chartData[rating - 1].count = Number(metaData.ratings[rating]);
      }

    setChartRatings(chartData);
  }, [totalRatings]);

  useEffect(() => {
    calcAvgRating()
    calcRecommend()
  }, [metaData])

  return (
    <div id="breakdown">
      <span>{avgRating}{starCount()}</span>
      {ratingsGraph()}
      <Characteristics
        characteristics={metaData.characteristics}
      />
      {displayRecommended()}
      {displayFilters()}
    </div>
  )
}

export default NewBreakdown;