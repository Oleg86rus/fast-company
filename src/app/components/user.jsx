import React, { useEffect, useState } from 'react';
import API from '../api';
import { useHistory, useParams } from 'react-router-dom';
import QualitiesList from './qualitiesList';
import Loading from './loading';

const User = () => {
  const history = useHistory();
  const params = useParams();
  const { userId } = params;
  const [user, setUser] = useState();
  useEffect(() => {
    API.users.getById(userId).then((resolve) => setUser(resolve));
  },
  []);
  const setAllUsers = () => {
    history.replace('/users');
  };

  return (
    <>
      {user ? (
        <>
          <div className="card text-center">
            <h3 className="card-header ">{user.name}</h3>
            <div className="card-body text-center">
              <h4>Профессия: {user.profession.name}</h4>
              <h4>Качества:</h4>
              <QualitiesList qualities={user.qualities}/>
              <h4>Количество встреч: {user.completedMeetings}</h4>
              <h4>Оценка: {user.rate} </h4>
            </div>
            <div className="card-footer text-center"> <button onClick={setAllUsers} className="btn btn-primary">Все пользователи</button></div>
          </div>
        </>
      ) : <Loading/>}
    </>
  );
};

export default User;