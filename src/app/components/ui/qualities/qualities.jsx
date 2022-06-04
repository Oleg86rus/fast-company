import React from 'react';
import PropTypes from 'prop-types';
import { useQualities } from '../../../hooks/useQalities';

const Qualities = ({ id }) => {
  const { getQualityById } = useQualities();
  const { color, name } = getQualityById(id);
  return (
    <>
      <span className={'badge m-1 bg-' + color}>
        {name}
      </span>
    </>
  );
};
Qualities.propTypes = {
  id: PropTypes.string
};
export default Qualities;