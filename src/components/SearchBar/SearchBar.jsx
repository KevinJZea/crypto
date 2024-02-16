import { useRef } from 'react';
import './SearchBar.css';

export const SearchBar = ({ value, setValue }) => {
  const input = useRef(null);

  const handleChange = () => {
    setValue(input.current.value.toUpperCase());
  };

  const handleSubmit = (event) => event.preventDefault();

  return (
    <form
      className="SearchBar--container"
      onSubmit={handleSubmit}
    >
      <p className="SearchBar--text">Type to filter the currencies</p>
      <input
        className="SearchBar"
        placeholder="Currency"
        ref={input}
        type="search"
        value={value}
        onChange={handleChange}
      />
    </form>
  );
};
