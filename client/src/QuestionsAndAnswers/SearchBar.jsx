// client/src/QuestionsAndAnswers/SearchBar.jsx
import React, { useState } from 'react';

const SearchBar = ({ handleSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleClick = () => {
    handleSearch(searchTerm);
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    if (searchTerm.length >= 3 || searchTerm. length === 0) {
      handleSearch(searchTerm);
    }
  };

  return (
    <>
      <input
        type="text"
        placeholder="Have a question? Search for answers..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button type="button" onClick={handleClick} disabled={searchTerm.length < 3}>
        Search
      </button>
    </>
  );
};

export default SearchBar;