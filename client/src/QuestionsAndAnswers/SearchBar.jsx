/* eslint-disable react/prop-types */
// client/src/QuestionsAndAnswers/SearchBar.jsx
import React, { useState } from 'react';

function SearchBar({ handleSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleClick = () => {
    handleSearch(searchTerm);
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    if (searchTerm.length >= 3 || searchTerm.length === 0) {
      handleSearch(searchTerm);
    }
  };

  return (
    <div className="qa-search-container">
      <input
        className="qa-search-input"
        type="text"
        placeholder="Have a question? Search for answers..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button className="qa-search-btn" type="button" onClick={handleClick} disabled={searchTerm.length < 3}>
        <span className="qa-search-icon">&#128269;</span>
      </button>
    </div>
  );
}

export default SearchBar;
