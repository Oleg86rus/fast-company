import React from 'react';
import PropTypes from 'prop-types';

const SearchUsers = ({ userName, handleChange }) => {

  return (
    <div className="mb-3">
      <input
        type="text"
        className="form-control"
        id="formGroupExampleInput"
        value={userName}
        onChange={handleChange}
        placeholder="Поиск по имени..."
      />
    </div>
  );
};
SearchUsers.propTypes = {
  handleChange: PropTypes.func,
  userName: PropTypes.string
};
export default SearchUsers;