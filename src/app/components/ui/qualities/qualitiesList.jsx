import React from 'react';
import Qualities from './qualities';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {
  getQualitiesByIds,
  getQualitiesLoadingStatus
} from '../../../store/qualities';

const QualitiesList = ({ qualities }) => {
  const qualitiesList = useSelector(getQualitiesByIds(qualities));
  const isLoading = useSelector(getQualitiesLoadingStatus());
  if (isLoading) return "Loading...";
  return (
    <>
      {qualitiesList.map((quality) => (
        <Qualities key={quality._id} {...quality} />
      ))}
    </>
  );
};
QualitiesList.propTypes = {
  qualities: PropTypes.array
};
export default QualitiesList;