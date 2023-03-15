import React, { useState } from 'react';

const Filter = ({ allReviews, sortParam, setSortParam }) => {
  const filterDropDown = () => {

    const handleChange = (e) => {
      var val = e.target.value
      setSortParam(val);
    }

    return (
        <select value={sortParam} onChange={handleChange}>
          <option value="relevance">Relevance</option>
          <option value="helpful">Helpful</option>
          <option value="newest">Newest</option>
        </select>
    )
  }

  return (
    <div>
      {allReviews.length} Total Reviews, sorted by <span>{filterDropDown()}</span>
    </div>
  )
}

export default Filter;