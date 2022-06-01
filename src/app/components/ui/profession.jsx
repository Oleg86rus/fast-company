import React from 'react';
import { useProfessions } from '../../hooks/useProfession';
import PropTypes from 'prop-types';
import Loading from './loading';

const Profession = ({ id }) => {
  const { isLoading, getProfession } = useProfessions();
  const prof = getProfession(id);
  if (!isLoading) {
    return <p>{prof.name}</p>;
  }
  return 'Loading ...';
};
Profession.propTypes = {
  id: PropTypes.string
};

export default Profession;