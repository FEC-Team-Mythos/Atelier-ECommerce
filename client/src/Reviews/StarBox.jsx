import { useState, useEffect, useCallback } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, LabelList } from 'recharts';

const StarBox = ({ allReviews, filterParams, setFilterParams }) => {
  const [chartRatings, setChartRatings] = useState({})

  useEffect(() => {
    const chartData = [
      { rating: 1, count: 0, total: allReviews.length},
      { rating: 2, count: 0, total: allReviews.length},
      { rating: 3, count: 0, total: allReviews.length},
      { rating: 4, count: 0, total: allReviews.length},
      { rating: 5, count: 0, total: allReviews.length},
    ];

    allReviews.forEach((review) => {
      const rating = review.rating;
      chartData[rating - 1].count += 1;
    });

    setChartRatings(chartData);
  }, [allReviews]);

  const avgRating = (avg=0) => {
    allReviews.forEach((review) => {
      avg += review.rating;
    })
    return avg / allReviews.length;
  }

  const avgRecommend = (avg=0) => {
    allReviews.forEach((review) => {
      review.recommend ? avg++ : null
    })
    return avg / allReviews.length * 100 + '% of reviews recommend this product';
  }

  const CustomLabel = ({ x, y, width, height, value, onClick, grabRating }) => {
    const handleClick = () => {
      onClick(grabRating(value));
    };

    return (
      <text style={{position: 'absolute'}}
        x={x + width + 10}
        y={y + height / 2}
        fontSize={14}
        onClick={handleClick}
        fill='#000000'
        dominantBaseline="middle"
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
            width={500}
            data={chartRatings}
            barGap={-45}>
          <XAxis  type="number"
            domain={[0, 7]}
            hide/>
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

  const filterClick = useCallback((clickedRating) => {
    if (filterParams.includes(clickedRating)) {
      setFilterParams(filterParams.filter(rating => rating !== clickedRating))
    } else {
      setFilterParams([...filterParams, clickedRating]);
      }
    },
    [filterParams, setFilterParams]
  )

  const displayFilters = () => {
    var sortedFilterParams = filterParams.sort().join(', ');
    if (filterParams.length > 0) {
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