import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import { toast } from 'react-toastify';

const CommentContext = React.createContext();
export const useComments = () => {
  return useContext(CommentContext);
};

export const CommentsProvider = ({children}) => {
  // const [isLoading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  // const [error, setError] = useState(null);
  useEffect(()=> {
    setComments(null);
  }, []);
  
  return <CommentContext.Provider value={{comments}}>
    {children}
  </CommentContext.Provider>;
};
CommentsProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};