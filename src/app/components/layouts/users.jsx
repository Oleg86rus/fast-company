import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserPage from '../page/userPage';
import UsersListPage from '../page/usersListPage';
import API from '../../api';
import EditUserPage from '../page/editUserPage/editUserPage';
import UserProvider from '../../hooks/useUsers';

const Users = () => {
  const params = useParams();
  const { userId, edit } = params;

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