import React from 'react';
import { useState, useEffect } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const StarBox = (props) => {
  const [chartRatings, setChartRatings] = useState({})

  useEffect(() => {
    const chartData = [
      { rating: 1 + '⭐', count: 0, total: props.allReviews.length},
      { rating: 2 + '⭐', count: 0, total: props.allReviews.length},
      { rating: 3 + '⭐', count: 0, total: props.allReviews.length},
      { rating: 4 + '⭐', count: 0, total: props.allReviews.length},
      { rating: 5 + '⭐', count: 0, total: props.allReviews.length},
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
      <ResponsiveContainer width={500} height={300}>
        <BarChart
            layout="vertical"
            data={chartRatings}
            barGap={-45}>
          <XAxis hide/>
          <YAxis type="category" dataKey="rating" />
          <YAxis type="category" dataKey="rating" />
          <Bar dataKey="count" yAxisID={0} fill="#3A5311"/>
          <Bar dataKey="total" yAxisID={1} fill="#5A5A5A" fillOpacity={0.4}/>
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