import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, LabelList } from 'recharts';
import Characteristics from './Characteristics.jsx';

const Breakdown = ({ metaData, filterParams, setFilterParams }) => {
  const [avgRating, setAvgRating] = useState(0);
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

  const grabRatingFromChart = (count) => {
    const entry = chartRatings.find((entry) => entry.count === count);
    return entry.rating;
  }

  const CustomLabel = ({ x, y, width, height, value, onClick, grabRating }) => {
    return (
      <text style={{position: 'absolute'}}
        x={x + width + 10}
        y={y + height / 2}
        fontSize={14}
        onClick={()=> onClick(grabRating(value))}
        fill='#000000'
        dominantBaseline="middle"
      >
        {value}
      </text>
    );
  };

  const ratingsGraph = () => {
    return(
      <div id='ratings-Graph'>
        <BarChart
          layout="vertical"
          height={300}
          width={500}
          data={chartRatings}
          barGap={-45}>
          <XAxis
            type="number"
            domain={[0, totalRatings + 100]}
            hide/>
          <YAxis
            type="category"
            dataKey="rating"
            axisLine={false}
            tickLine={false}
            onClick={(e)=>filterClick(e.value)}/>
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
  }, [metaData])

  return (
    <div>
      <div>
      {avgRating}
      </div>
      {ratingsGraph()}
      <Characteristics
        characteristics={metaData.characteristics}
      />
      {displayFilters()}
    </div>
  )
}

export default Breakdown;