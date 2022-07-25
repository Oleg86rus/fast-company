import { createSlice } from '@reduxjs/toolkit';
import { isOutdated } from '../utils/isOutdate';
import professionService from '../service/profession.service';

const professionSlice = createSlice({
  name: 'profession',
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null
  },
  reducers: {
    professionsRequested: state => {
      state.isLoading = true;
    },
    professionsReceved: (state, action) => {
      state.entities = action.payload;
      state.lastFetch = Date.now();
      state.isLoading = false;
    },
    professionsRequestFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }
  }
});

const {reducer: professionsReducer, actions} = professionSlice;
const {professionsRequested, professionsReceved, professionsRequestFiled} = actions;

export const loadProfessionsList = () => async (dispatch, getState) => {
  const {lastFetch} = getState().professions;
  if (isOutdated(lastFetch)) {
    dispatch(professionsRequested());
    try {
      const { content } = await professionService.get();
      dispatch(professionsReceved(content));
    } catch (error) {
      dispatch(professionsRequestFiled(error.message));
    }
  }
};

export const getProfessions = () => (state) => state.professions.entities;

export const getProfessionsLoadingStatus = () => (state) => state.professions.isLoading;

export const getProfessionsByIds = (professionsIds) => state => {
  console.log(state.professions.entities);
  console.log(professionsIds);
  
  if (state.professions.entities && professionsIds) {
    return state.professions.entities.find(el=>el._id === professionsIds);
  }
  return [];
};

export default professionsReducer;