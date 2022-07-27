import React from 'react';
import PropTypes from 'prop-types';
import {
  getProfessionsByIds,
  getProfessionsLoadingStatus
} from '../../store/professions';
import { useSelector } from 'react-redux';

const Profession = ({ id }) => {
  const isLoading = useSelector(getProfessionsLoadingStatus());
  const getProfession = useSelector(getProfessionsByIds(id));
  if (!isLoading) {
    return <p>{getProfession.name}</p>;
  }
  return 'Loading ...';
};
Profession.propTypes = {
  id: PropTypes.string
};

export default Profession;