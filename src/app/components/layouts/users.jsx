import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserPage from '../page/userPage';
import UsersListPage from '../page/usersListPage';
import EditUserPage from '../page/editUserPage/editUserPage';
import UserProvider from '../../hooks/useUsers';
import { useDispatch, useSelector } from 'react-redux';
import { getDataStatus, loadUsersList } from '../../store/users';

const Users = () => {
  const params = useParams();
  const { userId, edit } = params;
  const dataStatus = useSelector(getDataStatus());
  const dispatch = useDispatch();
  useEffect(() => {
    if (!dataStatus) dispatch(loadUsersList());
  }, []);
  if (!dataStatus) return 'Loading...';
  return (
    <>
      <UserProvider>
        {userId
          ? (edit ? (<EditUserPage/>) : (<UserPage userId={userId}/>))
          : <UsersListPage />
        }
      </UserProvider>
    </>
  );
};

export default Users;