import React, { useState } from 'react';

function RadioButtons({ id }) {
  const charLabels = {
    Size: ['A size too small', '1/2 a size too small', 'Perfect', '1/2 a size too big', 'Too Big'],
    Width: ['Too Narrow', 'Slightly Narrow', 'Perfect', 'Slightly Wide', 'Too Wide'],
    Comfort: ['Uncomfortable', 'Slightly Uncomfortable', 'Ok', 'Comfortable', 'Perfect'],
    Quality: ['Poor', 'Below Average', 'What I expected', 'Pretty Great', 'Perfect'],
    Length: ['Runs Short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs Long'],
    Fit: ['Runs Tight', 'Runs slightly tight', 'Perfect', 'Runs slightly long', 'Runs Long'],
  };

  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <label>
        <input
          type="radio"
          value={1}
          checked={selectedOption === '1'}
          onChange={handleOptionChange}
        />
        1
      </label>
      <label>
        <input
          type="radio"
          value={2}
          checked={selectedOption === '2'}
          onChange={handleOptionChange}
        />
        2
      </label>
      <label>
        <input
          type="radio"
          value={3}
          checked={selectedOption === '3'}
          onChange={handleOptionChange}
        />
        3
      </label>
      <label>
        <input
          type="radio"
          value={4}
          checked={selectedOption === '4'}
          onChange={handleOptionChange}
        />
        4
      </label>
      <label>
        <input
          type="radio"
          value={5}
          checked={selectedOption === '5'}
          onChange={handleOptionChange}
        />
        5
      </label>
      <span className="reviews-addReviewCharacteristicIndividualDisc">{charLabels[id][selectedOption]}</span>
    </div>
  );
}

export default RadioButtons;
