import { useState } from 'react';
import propTypes from 'prop-types';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import toastParams from 'helpers/ToastParams';

import '../styles.css';

const Searchbar = ({ onSubmit }) => {
  const [currentQuery, setCurrentQuery] = useState('');

  const handleInputChange = e => {
    const { value } = e.currentTarget;
    setCurrentQuery(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const normalizeQuery = currentQuery.trim().toLowerCase();

    if (!normalizeQuery || normalizeQuery === '') {
      toast.error('🦄Lets start the search', toastParams);
      return;
    }

    onSubmit(normalizeQuery);
    resetForm();
  };

  const resetForm = () => setCurrentQuery('');

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>
        <input
          className="SearchForm-input"
          type="text"
          name="currentQuery"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={currentQuery}
          onChange={handleInputChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: propTypes.func.isRequired,
};
export default Searchbar;
