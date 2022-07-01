import { createAction, createSlice } from '@reduxjs/toolkit';
import userService from '../service/user.service';
import authService from '../service/auth.service';
import localStorageService from '../service/localStorage.service';
import { getRandomInt } from '../utils/getRandomInt';
import history from '../utils/history';

const initialState = localStorageService.getAccessToken() ? {
  entities: null,
  isLoading: true,
  error: null,
  auth: { userId: localStorageService.getUserId() },
  isLoggedIn: true,
  dataLoaded: false
} : {
  entities: null,
  isLoading: false,
  error: null,
  auth: null,
  isLoggedIn: false,
  dataLoaded: false
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    usersRequested: state => {
      state.isLoading = true;
    },
    usersReceved: (state, action) => {
      state.entities = action.payload;
      state.dataLoaded = true;
      state.isLoading = false;
    },
    usersRequestFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    authRequestSuccess: (state, action) => {
      state.auth = action.payload;
      state.isLoggedIn = true;
    },
    authRequestFailed: (state, action) => {
      state.error =  action.payload;
    },
    userCreated: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    },
    userLoggedOut: (state) => {
      state.entities = null;
      state.isLoggedIn = false;
      state.auth = null;
      state.dataLoaded = false;
    }
  }
});

const {reducer: usersReducer, actions} = usersSlice;
const {
  usersRequested,
  usersReceved,
  usersRequestFiled,
  authRequestSuccess,
  authRequestFailed,
  userCreated,
  userLoggedOut
} = actions;

const authRequested = createAction("users/authRequested");
const userCreateRequested = createAction("user/userCreateRequested");
const createUserFailed = createAction("user/userCreateRequested");

export const login = ({ payload, redirect }) => async (dispatch) => {
  const {email, password} = payload;
  dispatch(authRequested());
  try {
    const data = await authService.login({email, password});
    dispatch(authRequestSuccess({ userId: data.localId }));
    localStorageService.setTokens(data);
    history.push(redirect);
  } catch (error) {
    dispatch(authRequestFailed(error.message));
  }
};

export const logOut = () => (dispatch) => {
  localStorageService.removeAuthData();
  dispatch(userLoggedOut());
  history.push('/');
};

export const sighUp = ({email, password, ...rest}) => async (dispatch) => {
  dispatch(authRequested());
  try {
    const data = await authService.register({email, password});
    localStorageService.setTokens(data);
    dispatch(authRequestSuccess({ userId: data.localId }));
    // eslint-disable-next-line no-use-before-define
    dispatch(createUser({
      _id:data.localId,
      email,
      rate: getRandomInt(1, 5),
      completedMeetings: getRandomInt(0, 200),
      image: `https://avatars.dicebear.com/api/avataaars/${(
        Math.random() + 1
      )
        .toString(36)
        .substring(7)}.svg`,
      ...rest
    }));
  } catch (error) {
    dispatch(authRequestFailed(error.message));
  }
};

function createUser(payload) {
  return async function(dispatch) {
    dispatch(userCreateRequested());
    try {
      const {content} = await userService.create(payload);
      dispatch(userCreated(content));
      history.push('/users');
    } catch (error) {
      dispatch(createUserFailed(error.message));
    }
  };}

export const loadUsersList = () => async (dispatch, getState) => {
  dispatch(usersRequested());
  try {
    const { content } = await userService.get();
    dispatch(usersReceved(content));
  } catch (error) {
    dispatch(usersRequestFiled(error.message));
  }
};

export const getUsersList = () => state => state.users.entities;
export const getCurrentUserData = () => state => {
  return state.users.entities ? state.users.entities.find(u=>u._id === state.users.auth.userId) : null;
};
export const getUserById = (userId) => state => {
  if (state.users.entities) return state.users.entities.find(u => u._id === userId);
};

export const getIsLoggedIn = () => state => state.users.isLoggedIn;
export const getDataStatus = () => state => state.users.dataLoaded;
export const getUsersLoadingStatus = () => state => state.users.isLoading;
export const getCurrentUserId = () => state => state.users.auth.userId;
export default usersReducer;