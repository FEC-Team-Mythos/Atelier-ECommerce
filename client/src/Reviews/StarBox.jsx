import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, LabelList } from 'recharts';

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

  const CustomLabel = ({ x, y, width, height, value, onClick, grabRating }) => {
    const handleClick = () => {
      onClick(grabRating(value));
    };

    return (
      <text
        x={x + width + 10}
        y={y + height / 2}
        fill="#333"
        fontSize={14}
        textAnchor="start"
        onClick={handleClick}
      >
        {value}
      </text>
    );
  };

  const grabRatingFromChart = (count) => {
    const entry = chartRatings.find((entry) => entry.count === count);
    return entry.rating;
  }

  const starGraph = () => {
    return (
      <div id='star-chart'>
        <BarChart
            layout="vertical"
            height={300}
            width={700}
            data={chartRatings}
            barGap={-45}>
          <XAxis hide/>
          <YAxis type="category" dataKey="rating" axisLine={false} tickLine={false} onClick={(e)=>filterClick(e.value)}/>
          <Bar dataKey="count" yAxisID={0} fill="#3A5311"/>
          <Bar dataKey="total" yAxisID={1} fill="#5A5A5A"
               fillOpacity={0.4} onClick={(e)=>filterClick(e.rating)}>
            <LabelList dataKey="count" position="right" content={<CustomLabel onClick={filterClick} grabRating={grabRatingFromChart}/>} />
          </Bar>
        </BarChart>
    </div>
    )
  }

  //toggle rating filter
  const filterClick = useCallback((clickedRating) => {
    console.log(clickedRating);
    if (props.filterParams.includes(clickedRating)) {
      props.setFilterParams(props.filterParams.filter(rating => rating !== clickedRating))
    } else {
      props.setFilterParams([...props.filterParams, clickedRating]);
      }
    },
    [props.filterParams, props.setFilterParams]
  )

  const displayFilters = () => {
    var sortedFilterParams = props.filterParams.sort().join(', ');

    if (props.filterParams.length > 0) {
      return <div>
        Reviews filtered by {sortedFilterParams} stars
      </div>
    }
  }

  return (
    <div>
      <div>{avgRating()}⭐⭐⭐⭐⭐</div>
      <div>
        {starGraph()}
      </div>
      {displayFilters()}
      <div>{avgRecommend()}</div>
      ----
    </div>
  )
}

export default StarBox;