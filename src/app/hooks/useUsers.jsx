import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import userService from '../service/user.service';
import { toast } from 'react-toastify';
import Loading from '../components/ui/loading';

const UserContext = React.createContext();

export const useUser = () => {
  return useContext(UserContext);
};

const UserProvider = ({children}) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  function errorCatcher(error) {
    const {message} = error.response.data;
    setError(message);
  }
  async function getUsers() {
    try {
      const {content} = await userService.get();
      setUsers(content);
      setLoading(false);
    } catch (error) {
      errorCatcher(error);
    }
  }
  useEffect(() => { getUsers(); }, []);
  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);
  function getUserById(userId) {
    return users.find(user=>user._id === userId);
  }
  return (
    <UserContext.Provider value={{ users, getUserById }}>
      {!isLoading ? children : <Loading/>}
    </UserContext.Provider>
  );
};
UserProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
export default UserProvider;