import React, { useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import UserPage from '../page/userPage';
import UsersListPage from '../page/usersListPage';
import EditUserPage from '../page/editUserPage/editUserPage';
import UserProvider from '../../hooks/useUsers';
import UsersLoader from '../ui/hoc/usersLoader';
import { getCurrentUserId } from '../../store/users';
import { useSelector } from 'react-redux';

const Users = () => {
  const params = useParams();
  const { userId, edit } = params;
  const currentUserId = useSelector(getCurrentUserId());
  return (
    <>
      <UsersLoader>
        <UserProvider>
          {userId
            ? (edit
              ? (userId === currentUserId
                ? (<EditUserPage/>)
                : (<Redirect to={`/users/${currentUserId}/edit`}/>))
              : (<UserPage userId={userId}/>))
            : (<UsersListPage/>)}
        </UserProvider>
      </UsersLoader>
    </>
  );
};

export default Users;