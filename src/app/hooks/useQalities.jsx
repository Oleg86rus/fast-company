import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import qualityService from '../service/qualities.service';

const QualitiesContext = React.createContext();

export const useQualities = () => {
  return useContext(QualitiesContext);
};
export const QualitiesProvider = ({children}) => {
  const [qualitiesList, setQualities] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  function errorCather (error) {
    const { message } = error.response.data;
    setError(message);
  }
  
  function getQualityById(id) {
    return qualitiesList.find((p)=>p._id===id);
  }
  const getQualitiesList = async () => {
    try {
      const { content } = await qualityService.get();
      setQualities(content);
      setIsLoading(false);
    } catch (error) {
      errorCather(error);
    }
  };
  useEffect(() => {
    getQualitiesList();
  }, []);

  useEffect(()=>{
    if (error !== 0) {
      toast(error);
      setError(null);
    }
  }, [error]);
  return (
    <QualitiesContext.Provider value={{getQualityById}}>
      {!isLoading ? children : <p>Loading ...</p>}
    </QualitiesContext.Provider>
  );
};
QualitiesProvider.propTypes = {
  children: PropTypes.object
};