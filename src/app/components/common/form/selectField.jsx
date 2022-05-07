import React from 'react';
import PropTypes from 'prop-types';

const SelectField = ({
  label,
  value,
  onChange,
  defaultOption,
  options,
  error
}) => {
  const handleChange = ({target}) => {
    onChange({name: target.name, value: target.value});
  };
  const getInputClasses = () => {
    return 'form-select' + (error
      ? ' is-invalid'
      : '');
  };
  const optionsArray = !Array.isArray(options) && typeof (options) === 'object'
    ?
    Object.keys(options).map(optionName => ({
      name: options[optionName].name,
      value: options[optionName]._id
    }))
    : options;
  
  return (
    <div className="mb-4">
      <label htmlFor="validationCustom04" className="form-label">
        {label}
      </label>
      <select
        className={getInputClasses()}
        id="validationCustom04"
        value={value}
        name="profession"
        onChange={handleChange}
      >
        <option disabled value="">{defaultOption}</option>
        {/* eslint-disable-next-line react/jsx-key */}
        {optionsArray && optionsArray.map((option, index) => (
          <option
            key={index}
            value={option.value}
          >
            {option.name}
          </option>
        ))}
        {/* <option value="_id">...</option> */}
      </select>
      {error && <div className="invalid-feedback">
        {error}
      </div>}
    </div>
  );
};
SelectField.propTypes = {
  defaultOption: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
export default SelectField;