import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import Characteristics from './Characteristics.jsx';

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
    setAvgRating((avg/total).toFixed(2));

    //TO DO: Render Stars with FontAwesome
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
            <div id='total-rating-bar' style={{width: totalRatings}}>
              <div id={`${rating.rating}-rating-bar`} style={barStyle}/>
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
      <div>
      {avgRating}
      </div>
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