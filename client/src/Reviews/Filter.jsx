import React from 'react';

function Filter({ allReviews, sortParam, setSortParam }) {
  const filterDropDown = () => {
    const handleChange = (e) => {
      const val = e.target.value;
      setSortParam(val);
    };

    return (
      <select id="reviews-sorting" data-testid="reviews-sorting" value={sortParam} onChange={handleChange}>
        <option value="relevant" aria-label="Sort By Relevant">Relevance</option>
        <option data-testid="reviews-dropNew" value="helpful" aria-label="Sort By Helpful">Helpful</option>
        <option value="newest" aria-label="Sort By Newest">Newest</option>
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
