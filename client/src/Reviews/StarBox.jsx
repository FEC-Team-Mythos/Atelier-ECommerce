import React from 'react';
import { useState, useEffect } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const StarBox = (props) => {
  const [chartRatings, setChartRatings] = useState({})

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

  const calcChartRatings = () => {
    var newChart = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0
    }
    props.allReviews.forEach((review) => {
      console.log(review);
      newChart[review.rating]++
    })
    setChartRatings(newChart);
  }

  const starGraph = () => {
    return (
      <BarChart
        width={200}
        height={200}
        layout="vertical"
        data={props.allReviews}>
      <XAxis type="number"/>
      <YAxis type="category" dataKey="rating" />
      <Bar dataKey="rating" fill="#8884d8" />
      </BarChart>
    )
  }

  return (
    <div>
      <div>{avgRating()} <span className="star">&#9733;</span>  </div>
      <div>
        <button onClick={()=>calcChartRatings()}>Hi</button>
        {starGraph()}
      </div>
      <div>{avgRecommend()}</div>
      ----
    </div>
  )
}

export default StarBox;