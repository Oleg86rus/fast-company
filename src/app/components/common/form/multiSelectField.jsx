import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

const MultiSelectField = ({options, onChange, name, label, defaultValue, value, error}) => {
  const optionsArray = !Array.isArray(options) && typeof options === "object"
    ? Object.values(options)
    : options;
  const handleChange = (value) => {
    onChange( {name: name, value});
  };
  const getInputClasses = () => {
    return 'basic-multi-select' + (error
      ? ' is-invalid'
      : '');
  };
  return (
    <div className="mb-4">
      <label className="form-label">
        {label}
      </label>
      <Select
        isMulti
        closeMenuOnSelect={false}
        defaultValue={defaultValue}
        options={optionsArray}
        className={getInputClasses()}
        placeholder='Выберите качества...'
        classNamePrefix="select"
        value={value}
        onChange={handleChange}
        name={name}
      />
      {error && <div className="invalid-feedback">
        {error}
      </div>}
    </div>
  );
};
MultiSelectField.propTypes = {
  onChange: PropTypes.func,
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  name: PropTypes.string,
  label: PropTypes.string,
  defaultValue: PropTypes.array,
  value: PropTypes.array,
  error: PropTypes.string
};
export default MultiSelectField;