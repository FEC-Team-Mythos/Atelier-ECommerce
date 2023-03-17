import React, { useState, useEffect } from 'react';

function Characteristics({ characteristics }) {
  const [characteristicRatings, setCharacteristicsRatings] = useState({});
  const factorLabels = {
    Size: ['Too Small', 'Too Big'],
    Width: ['Too Narrow', 'Too Wide'],
    Comfort: ['Uncomfortable', 'Perfect'],
    Quality: ['Poor', 'Perfect'],
    Length: ['Runs Short', 'Runs Long'],
    Fit: ['Runs Tight', 'Runs Long']
  }

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

          console.log(factorLabels[specificCharacteristic.name][0])

          return (
            <div>
              <span className='singular-character-title'>{specificCharacteristic.name}</span>
            <div className='singular-character-slider'>
              <span className={`${specificCharacteristic.name}-leftLabel`}>{factorLabels[specificCharacteristic.name][0]}</span>
              <div id="total-characteristics-bar">
                <span id={`${specificCharacteristic.name}-bar`} style={dotStyle} />
              </div>
              <span className={`${specificCharacteristic.name}-rightLabel`}>{factorLabels[specificCharacteristic.name][1]}</span>
            </div>
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
    <div id="characterSliders">{characteristicsSlider()}</div>
  );
}

export default Characteristics;
