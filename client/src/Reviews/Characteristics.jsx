import React, { useState, useEffect } from 'react';

function Characteristics({ characteristics }) {
  const [characteristicRatings, setCharacteristicsRatings] = useState({});
  const factorLabels = {
    Size: ['Too Small', 'Too Big'],
    Width: ['Too Narrow', 'Too Wide'],
    Comfort: ['Uncomfortable', 'Perfect'],
    Quality: ['Poor', 'Perfect'],
    Length: ['Runs Short', 'Runs Long'],
    Fit: ['Runs Tight', 'Runs Long'],
  };

  const marginCalc = (rating) => (rating / 5) * 200;

  const characteristicsSlider = () => {
    if (characteristicRatings.length) {
      return (
        characteristicRatings.map((specificCharacteristic) => {
          const dotStyle = {
            borderRadius: '30%',
            width: 5,
            height: 15,
            marginLeft: marginCalc(specificCharacteristic.value),
          };

          return (
            <div>
              <span className="singular-character-title">{specificCharacteristic.name}</span>
              <div className="singular-character-slider">
                <span className="slider-leftLabel">{factorLabels[specificCharacteristic.name][0]}</span>
                <div id="total-characteristics-bar">
                  <span className="slider-bar" style={dotStyle} />
                </div>
                <span className="slider-rightLabel">{factorLabels[specificCharacteristic.name][1]}</span>
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
    <div id="characterSliders" data-testid="reviews-sliders">{characteristicsSlider()}</div>
  );
}

export default Characteristics;
