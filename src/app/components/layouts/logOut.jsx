import React, { useEffect } from 'react';
import Loading from '../ui/loading';
import { useDispatch } from 'react-redux';
import { logOut } from '../../store/users';
const LogOut = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logOut());
  }, []);
  return <Loading/>;
};
export default LogOut;