import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import qualityService from '../service/qualities.service';

const QualitiesContext = React.createContext();

export const useQualities = () => {
  return useContext(QualitiesContext);
};
export const QualitiesProvider = ({children}) => {
  const [qualities, setQualities] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  function getQualityById(id) {
    return qualities.find((p)=>p._id===id);
  }

  useEffect(() => {
    const getQualitiesList = async () => {
      try {
        const { content } = await qualityService.get();
        setQualities(content);
        setIsLoading(false);
      } catch (error) {
        // eslint-disable-next-line no-use-before-define
        errorCather(error);
      }
    };
    getQualitiesList();
  }, []);
  function errorCather (error) {
    const { message } = error.response.data;
    setError(message);
  }
  useEffect(()=>{
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);
  return (
    <QualitiesContext.Provider value={{qualities, isLoading, getQualityById}}>
      {children}
    </QualitiesContext.Provider>
  );
};
QualitiesProvider.propTypes = {
  children: PropTypes.object
};