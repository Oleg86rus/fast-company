import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import userService from '../service/user.service';
import { toast } from 'react-toastify';
import Loading from '../components/ui/loading';
import { useSelector } from 'react-redux';
import { getCurrentUserData, getCurrentUserId } from '../store/users';

const UserContext = React.createContext();

const UserProvider = ({children}) => {
  const currentUserId = useSelector(getCurrentUserId());
  const currentUser = useSelector(getCurrentUserData());
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
  useEffect(() => {
    if (!isLoading) {
      const newUsers = [...users];
      const indexUser = newUsers.findIndex(
        (u) => u._id === currentUserId
      );
      newUsers[indexUser] = currentUser;
      setUsers(newUsers);
    }
  }, [currentUser]);
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