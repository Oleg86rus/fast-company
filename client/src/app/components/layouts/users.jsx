import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import UserPage from '../page/userPage';
import UsersListPage from '../page/usersListPage';
import EditUserPage from '../page/editUserPage/editUserPage';
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
        {userId
          ? (edit
            ? (userId === currentUserId
              ? (<EditUserPage/>)
              : (<Redirect to={`/users/${currentUserId}/edit`}/>))
            : (<UserPage userId={userId}/>))
          : (<UsersListPage/>)}
      </UsersLoader>
    </>
  );
};

export default Users;