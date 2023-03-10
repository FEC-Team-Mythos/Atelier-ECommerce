import React, { useState } from 'react';

const Filter = (props) => {
  const filterDropDown = () => {
    const [selectedOption, setSelectedOption] = useState('relevance');

    const handleSubmit = (sorting) => {
      props.sortReviews(sorting);
    }

    const handleChange = (e) => {
      var val = e.target.value
      setSelectedOption(val);
      handleSubmit(val)
    }

    return (
        <select value={selectedOption} onChange={handleChange}>
          <option value="relevance">Relevance</option>
          <option value="helpful">Helpful</option>
          <option value="newest">Newest</option>
        </select>
    )
  }

  return (
    <div>
      {props.allReviews.length} Total Reviews, sorted by <span>{filterDropDown()}</span>
    </div>
  )
}

export default Filter;