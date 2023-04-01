// client/src/QuestionsAndAnswers/SearchBar.jsx
import React, { useState } from 'react';

const SearchBar = ({ handleSearch }) => {
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
    <>
      <div className="qa-search-container">
        <input
          type="text"
          placeholder="Have a question? Search for answers..."
          value={searchTerm}A
          onChange={handleInputChange}
        />
      <button className="qa-search-btn" type="button" onClick={handleClick} disabled={searchTerm.length < 3}>
        <span className="qa-search-icon">&#128269;</span>
      </button>
      </div>
    </>
  );
};

export default SearchBar;