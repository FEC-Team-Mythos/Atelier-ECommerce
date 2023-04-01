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
        characteristicRatings.map((specificCharacteristic, ind) => {
          const dotStyle = {
            borderRadius: '30%',
            width: 5,
            height: 15,
            marginLeft: marginCalc(specificCharacteristic.value),
          };

          return (
            <div key={ind}>
              <span className="reviews-singular-character-title">{specificCharacteristic.name}</span>
              <div className="reviews-singular-character-slider">
                <span className="reviews-slider-leftLabel">{factorLabels[specificCharacteristic.name][0]}</span>
                <div id="reviews-total-characteristics-bar">
                  <span className="reviews-slider-bar" style={dotStyle} />
                </div>
                <span className="reviews-slider-rightLabel">{factorLabels[specificCharacteristic.name][1]}</span>
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
    <div id="reviews-characterSliders" data-testid="reviews-sliders">{characteristicsSlider()}</div>
  );
}

export default Characteristics;
