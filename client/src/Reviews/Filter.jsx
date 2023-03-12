import React, { useState } from 'react';

const Filter = (props) => {
  const filterDropDown = () => {

    const handleChange = (e) => {
      var val = e.target.value
      props.setSortParam(val);
    }

    return (
        <select value={props.sortParam} onChange={handleChange}>
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