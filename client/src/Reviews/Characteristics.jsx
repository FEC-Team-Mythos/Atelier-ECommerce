import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, ZAxis, CartesianGrid, LabelList, Dot } from 'recharts';

const Characteristics = ({ characteristics }) => {
  const [characteristicRatings, setCharacteristicsRatings] = useState({})

  const characteristicsGraph = () => {
    if (characteristicRatings.length) {
      return (
        <BarChart
          layout="vertical"
          width={400}
          height={150}
          data={characteristicRatings}
        >
          <XAxis type="number"
            domain={[0, 5]}
            hide/>
          <YAxis type="category" dataKey="name" />
          <Bar dataKey="value" yAxisID={0} fill="#8884d8">
            <LabelList data="•" position="right"/>
          </Bar>
          <Bar dataKey="total" yAxisID={1} fill="#82ca9d" />
        </BarChart>
      )
    }
  }

  useEffect(() => {
    const chartData = []
    for (var specific in characteristics) {
      chartData.push({
        name: specific,
        value: characteristics[specific].value,
        total: 5
      })
    }
    setCharacteristicsRatings(chartData);
  }, [characteristics])

  return (
    <div>{characteristicsGraph()}</div>
  )
}

export default Characteristics;