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
  const [users, setUsers] = useState(API.users.fetchAll());
  useEffect(() => {
    API.users.fetchAll().then((data) => setUsers(data));
  },
  []);
  
  const handleLineDelete = (id) => {
    setUsers(users.filter((user) => user._id !== id));
  };
  const handleToggleBookMark = (id) => {
    setUsers(
      users.map((user) => {
        if (user._id === id) {
          return { ...user, bookmark: !user.bookmark };
        }
        return user;
      })
    );
  };
  return (
    <>
      <UserProvider>
        {userId
          ? (
            edit
              ? (
                <EditUserPage/>
              )
              : (
                <UserPage userId={userId}/>
              )
          )
          : <UsersListPage onDelete={handleLineDelete}
            onToggleBookMark={handleToggleBookMark}
            users={Object.values(users)}/>}
      </UserProvider>
    </>
  );
};

export default Users;