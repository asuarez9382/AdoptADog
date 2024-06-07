import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [input, setInput] = useState('');

  const handleChange = (e) => {
    setInput(e.target.value);
    console.log(input)
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Search for breeds"
      />
    </div>
  );
}

export default SearchBar;
