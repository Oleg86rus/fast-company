import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import userService from '../service/user.service';
import { toast } from 'react-toastify';
import { setTokens } from '../service/localStorage.service';
const httpAuth = axios.create();
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
  async function createUser(data) {
    try {
      const {content} = userService.create(data);
      setUser(content);
    } catch (error) {
      errorCatcher(error);
    }
  }
  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  async function signUp ({email, password, ...rest}) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`;
    try {
      const {data} = await httpAuth.post(url, {email, password, returnSecureToken: true});
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
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`;
    try {
      const {data} = await httpAuth.post(url, {email, password, returnSecureToken: true});
      setTokens(data);
    } catch (error) {
      const {code, message} = error.response.data.error;
      if (code === 400) {
        if (message === 'EMAIL_NOT_FOUND') {
          const errorObject = {email:'Пользователь с таким Email не найден'};
          throw errorObject;
        }
        if (message === 'INVALID_PASSWORD') {
          const errorObject = {password:'Неверный пароль'};
          throw errorObject;
        }
        if (message === 'TOO_MANY_ATTEMPTS_TRY_LATER : Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.') {
          const errorObject = {email:'Слишком много попыток, повторите позднее'};
          throw errorObject;
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
