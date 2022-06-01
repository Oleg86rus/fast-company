import React from 'react';
import Qualities from './qualities';
import PropTypes from 'prop-types';

const QualitiesList = ({ qualities }) => {
  console.log(qualities);
  return (
    <>
      {qualities.map((quality) => (
        <Qualities key={quality} _id={quality} />
      ))}
  
    </>
  );
};
QualitiesList.propTypes = {
  qualities: PropTypes.array
};
export default QualitiesList;