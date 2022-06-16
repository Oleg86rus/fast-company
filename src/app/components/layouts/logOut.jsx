import React, { useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Loading from '../ui/loading';
const LogOut = () => {
  const {logOut} = useAuth();
  useEffect(() => {
    logOut();
  }, []);
  return <Loading/>;
};
export default LogOut;