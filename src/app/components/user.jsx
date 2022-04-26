import React, { useEffect, useState } from 'react';
import API from '../api';
import { useHistory, useParams } from 'react-router-dom';
import QualitiesList from './qualitiesList';

const User = () => {
  const history = useHistory();
  const params = useParams();
  const { userId } = params;
  const [user, setUser] = useState();
  useEffect(() => {
    API.users.getById(userId).then((data) => setUser(data));
  },
  []);
  const setAllUsers = () => {
    history.replace('/users');
  };
  return (
    <>
      {user
        ? (
          <>
            <h1>{user.name}</h1>
            <h2>Профессия: {user.profession.name}</h2>
            <QualitiesList qualities={user.qualities}/>
            <h4>completedMeetings: {user.completedMeetings}</h4>
            <h3>Rate: {user.rate}</h3>
            <button onClick={setAllUsers} type="button"
              className="btn btn-outline-dark">Все пользователи
            </button>
          </>
        )
        : <h1>User NotFound</h1>}
    </>
  );
};

export default User;