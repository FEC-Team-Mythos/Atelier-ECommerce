import React from 'react';

function Filter({ allReviews, sortParam, setSortParam }) {
  const filterDropDown = () => {
    const handleChange = (e) => {
      const val = e.target.value;
      setSortParam(val);
    };

    return (
      <select id="reviews-sorting" data-testid="reviews-sorting" value={sortParam} onChange={handleChange}>
        <option value="relevance">Relevance</option>
        <option data-testid="reviews-dropNew" value="helpful">Helpful</option>
        <option value="newest">Newest</option>
      </select>
    );
  };

  const tallyReviews = () => {
    if (allReviews) {
      return (<>{allReviews.length}</>);
    }
  };

  return (
    <div id="reviews-filter" data-testid="reviews-filter">
      {tallyReviews()}
      {' '}
      Total Reviews, sorted by
      <span>{filterDropDown()}</span>
    </div>
  );
}

export default Filter;
