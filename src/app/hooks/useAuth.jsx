import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import userService from '../service/user.service';
import { toast } from 'react-toastify';
import localStorageService, { setTokens } from '../service/localStorage.service';

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
  const [currentUser, setUser] = useState({});
  const [error, setError] = useState(null);

  function errorCatcher(error) {
    const {message} = error.response.data;
    setError(message);
  }
  async function getUserData() {
    try {
      const {content} = await userService.getCurrentUser();
      setUser(content);
    } catch (error) {
      errorCatcher(error);
    }
  }
  async function createUser(data) {
    try {
      const {content} = await userService.create(data);
      console.log(content);
      setUser(content);
    } catch (error) {
      errorCatcher(error);
    }
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
      getUserData();
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
    }
  }, []);
  return (
    <AuthContext.Provider value={{ singUp: signUp, currentUser, singIn: signIn }}>
      {children}
    </AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
export default AuthProvider;
