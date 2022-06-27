import React, { useEffect } from 'react';
import Qualities from './qualities';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  getQualitiesByIds,
  getQualitiesLoadingStatus, loadQualitiesList
} from '../../../store/qualities';

const QualitiesList = ({ qualities }) => {
  const dispatch = useDispatch();
  const qualitiesList = useSelector(getQualitiesByIds(qualities));
  const isLoading = useSelector(getQualitiesLoadingStatus());
  useEffect(()=> {
    dispatch(loadQualitiesList());
  }, []);
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