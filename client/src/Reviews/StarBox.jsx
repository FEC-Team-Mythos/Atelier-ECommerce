import React from 'react';
import { useState, useEffect } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const StarBox = (props) => {
  const [chartRatings, setChartRatings] = useState({})

  useEffect(() => {
    const chartData = [
      { rating: 1, count: 0 },
      { rating: 2, count: 0 },
      { rating: 3, count: 0 },
      { rating: 4, count: 0 },
      { rating: 5, count: 0 },
    ];

    props.allReviews.forEach((review) => {
      const rating = review.rating;
      chartData[rating - 1].count += 1;
    });

    setChartRatings(chartData);
  }, [props.allReviews]);

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

  const starGraph = () => {
    return (
      <div id='star-chart'>
      <ResponsiveContainer width={200} height={200}>
        <BarChart layout="vertical" data={chartRatings} margin={{ left: 0 }}>
          <XAxis type="number"/>
          <YAxis type="category" dataKey="rating" />
          <Bar dataKey="count" fill="#005C29"/>
        </BarChart>
    </ResponsiveContainer>
    </div>
    )
  }

  return (
    <div>
      <div>{avgRating()} <span className="star">&#9733;</span>  </div>
      <div>
        {starGraph()}
      </div>
      <div>{avgRecommend()}</div>
      ----
    </div>
  )
}

export default StarBox;