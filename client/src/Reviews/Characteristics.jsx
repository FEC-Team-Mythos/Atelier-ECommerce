import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, ZAxis, CartesianGrid, LabelList, Dot } from 'recharts';

const Characteristics = ({ characteristics }) => {
  const [characteristicRatings, setCharacteristicsRatings] = useState({})

  const marginCalc = (rating) => {
    //hardcoded value
    return (rating / 5) * 400;
  }

  const characteristicsSlider = () => {
    if (characteristicRatings.length) {
      return (
        characteristicRatings.map((specificCharacteristic) => {
          var dotStyle = {
            backgroundColor: 'black',
            width: 10,
            height: 10,
            marginLeft: marginCalc(specificCharacteristic.value)
          }

          return (
            <div id='total-characteristics-bar'>
              <div id={`${specificCharacteristic.name}-bar`} style={dotStyle}/>
            </div>
          )
        })
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
    <div>{characteristicsSlider()}</div>
  )
}

export default Characteristics;