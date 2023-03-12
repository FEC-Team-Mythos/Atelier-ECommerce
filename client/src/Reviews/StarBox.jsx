import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Label, ResponsiveContainer } from 'recharts';

const StarBox = (props) => {
  const [chartRatings, setChartRatings] = useState({})

  useEffect(() => {
    const chartData = [
      { rating: 1, count: 0, total: props.allReviews.length},
      { rating: 2, count: 0, total: props.allReviews.length},
      { rating: 3, count: 0, total: props.allReviews.length},
      { rating: 4, count: 0, total: props.allReviews.length},
      { rating: 5, count: 0, total: props.allReviews.length},
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
          <YAxis type="category" dataKey="rating" axisLine={false} tickLine={false}/>
          <Bar dataKey="count" yAxisID={0} fill="#3A5311"/>
          <Bar dataKey="total" yAxisID={1} fill="#5A5A5A"
               fillOpacity={0.4} onClick={(e)=>filterClick(e)}label={{dataKey: "count", position: 'right'}}/>
        </BarChart>
    </ResponsiveContainer>
    </div>
    )
  }

  //toggle rating filter
  const filterClick = useCallback((e) => {
    if (props.filterParams.includes(e.rating)) {
      props.setFilterParams(props.filterParams.filter(rating => rating !== e.rating))
    } else {
      props.setFilterParams([...props.filterParams, e.rating]);
      }
    },
    [props.filterParams, props.setFilterParams]
  )

  return (
    <div>
      <div>{avgRating()}⭐⭐⭐⭐⭐</div>
      <div>
        {starGraph()}
      </div>
      <div>{avgRecommend()}</div>
      ----
    </div>
  )
}

export default StarBox;