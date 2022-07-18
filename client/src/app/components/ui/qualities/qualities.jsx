import React from 'react';
import PropTypes from 'prop-types';

const Qualities = ({ color, name }) => {

  return (
    <span className={'badge m-1 bg-' + color}>
      {name}
    </span>
  );
};
Qualities.propTypes = {
  color: PropTypes.string,
  name: PropTypes.string
};
export default Qualities;