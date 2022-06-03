import React from 'react';
import Qualities from './qualities';
import PropTypes from 'prop-types';
import { useQualities } from '../../../hooks/useQalities';

const QualitiesList = ({ qualities }) => {
  const { isLoading } = useQualities();
  if (isLoading) return "Loading...";
  return (
    <>
      {qualities.map((quality) => (
        <Qualities key={quality} id={quality} />
      ))}
    </>
  );
};
QualitiesList.propTypes = {
  qualities: PropTypes.array
};
export default QualitiesList;