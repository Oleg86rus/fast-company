import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import userService from '../service/user.service';
import { toast } from 'react-toastify';
import localStorageService, { setTokens } from '../service/localStorage.service';
import Loading from '../components/ui/loading';
import { useHistory } from 'react-router-dom';

export const httpAuth = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1/',
  params: {
    key: process.env.REACT_APP_FIREBASE_KEY
  }
});
const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({children}) => {
  const [currentUser, setUser] = useState();
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const history = useHistory();

  function errorCatcher(error) {
    const {message} = error.response.data;
    setError(message);
  };
  async function getUserData() {
    try {
      const {content} = await userService.getCurrentUser();
      setUser(content);
    } catch (error) {
      errorCatcher(error);
    } finally {
      setLoading(false);
    }
  }
  async function createUser(data) {
    try {
      const {content} = await userService.create(data);
      setUser(content);
    } catch (error) {
      errorCatcher(error);
    }
  }
  function logOut() {
    localStorageService.removeAuthData();
    setUser(null);
    history.push('/');
  }
  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  async function signUp ({email, password, ...rest}) {
    try {
      const {data} = await httpAuth.post(`accounts:signUp`, {email, password, returnSecureToken: true});
      setTokens(data);
      await createUser({_id:data.localId, email, rate: randomInt(1, 5), completedMeetings: randomInt(0, 200), ...rest});
    } catch (error) {
      errorCatcher(error);
      const {code, message} = error.response.data.error;
      if (code === 400) {
        if (message === 'EMAIL_EXISTS') {
          const errorObject = {email:'Пользователь с таким Email уже существует'};
          throw errorObject;
        }
      }
    }
  }
  async function signIn ({email, password}) {
    try {
      const {data} = await httpAuth.post(`accounts:signInWithPassword`, {email, password, returnSecureToken: true});
      setTokens(data);
      await getUserData();
    } catch (error) {
      const {code, message} = error.response.data.error;
      if (code === 400) {
        switch (message) {
        case 'INVALID_PASSWORD':
          throw new Error('Email или пароль введены некорректно');
        default:
          throw new Error('Слишком много попыток входа. Повторите позднее');
        }
      }
    }
  }

  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);

  useEffect(() => {
    if (localStorageService.getAccessToken()) {
      getUserData();
    } else {
      setLoading(false);
    }
  }, []);
  return (
    <AuthContext.Provider value={{ singUp: signUp, currentUser, singIn: signIn, logOut }}>
      {!isLoading ? children : <Loading/>}
    </AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
export default AuthProvider;
