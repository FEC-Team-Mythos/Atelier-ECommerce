import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, LabelList } from 'recharts';

const Characteristics = ({ characteristics }) => {
  const [characteristicRatings, setCharacteristicsRatings] = useState({})
  const characteristicsGraph = () => {
    return (
    <BarChart
      layout="vertical"
      width={500}
      height={300}
      data={characteristicRatings}
      barGap={-45}>
      <XAxis type="number"
            domain={[0, 5]}/>
      <YAxis type="category" dataKey="name"/>
      <Bar dataKey="value" yAxisID={0} fill="#8884d8" />
      <Bar dataKey={5} yAxisID={1} fill="#5A5A5A" />
    </BarChart>
    )
  }

  useEffect(() => {
    const chartData = []
    for (var specific in characteristics) {
      chartData.push({
        name: specific,
        value: characteristics[specific].value
      })
    }
    setCharacteristicsRatings(chartData);
  }, [characteristics])

  return (
    <div>{characteristicsGraph()}</div>
  )
}

export default Characteristics;