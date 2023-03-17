import React, { useState, useEffect } from 'react';

function Characteristics({ characteristics }) {
  const [characteristicRatings, setCharacteristicsRatings] = useState({});

  const marginCalc = (rating) =>
    // hardcoded value
    (rating / 5) * 400;

  const characteristicsSlider = () => {
    if (characteristicRatings.length) {
      return (
        characteristicRatings.map((specificCharacteristic) => {
          const dotStyle = {
            backgroundColor: 'black',
            width: 10,
            height: 10,
            marginLeft: marginCalc(specificCharacteristic.value),
          };

          return (
            <div id="total-characteristics-bar">
              Left
              <span id={`${specificCharacteristic.name}-bar`} style={dotStyle} />
              Right
            </div>
          );
        })
      );
    }
  };

  useEffect(() => {
    const chartData = [];
    for (const specific in characteristics) {
      chartData.push({
        name: specific,
        value: characteristics[specific].value,
        total: 5,
      });
    }
    setCharacteristicsRatings(chartData);
  }, [characteristics]);

  return (
    <div>{characteristicsSlider()}</div>
  );
}

export default Characteristics;
