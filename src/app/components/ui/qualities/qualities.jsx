import React from 'react';
import PropTypes from 'prop-types';
import { useQualities } from '../../../hooks/useQalities';

const Qualities = ({ _id }) => {
  const { name, color } = useQualities().getQualityById(_id);
  return (
    <>
      <span key={_id} className={'badge m-1 bg-' + color}>
        {name}
      </span>
    </>
  );
};
Qualities.propTypes = {
  _id: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};
export default Qualities;