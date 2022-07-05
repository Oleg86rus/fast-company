import { createAction, createSlice } from '@reduxjs/toolkit';
import commentService from '../service/comment.service';
import { nanoid } from 'nanoid';

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
  reducers: {
    commentsRequested: state => {
      state.isLoading = true;
    },
    commentsReceved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    commentsRequestFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    commentCreate: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    },
    commentRemove: (state, action) => {
      state.entities = state.entities.filter(c => c._id !== action.payload);
    }
  }
});

const commentCreateRequested = createAction('comments/createCommentRequested');
const commentCreateFailed = createAction('comments/commentCreateFailed');
const commentRemoveRequested = createAction('comments/commentRemoveRequested');
const commentRemoveFailed = createAction('comment/commentRemoveFailed');

const {reducer: commentsReducer, actions} = commentsSlice;
const {
  commentsRequested,
  commentsReceved,
  commentsRequestFiled,
  commentCreate,
  commentRemove
} = actions;

export const loadCommentsList = (userId) => async (dispatch) => {
  dispatch(commentsRequested());
  try {
    const { content } = await commentService.getComments(userId);
    dispatch(commentsReceved(content));
  } catch (error) {
    dispatch(commentsRequestFiled(error.message));
  }
};
export const createComment = (data, userId, currentUserId) => async (dispatch) => {
  dispatch(commentCreateRequested());
  const comment = {
    ...data,
    _id: nanoid(),
    pageId: userId,
    created_at: Date.now(),
    userId: currentUserId
  };
  try {
    const {content} = await commentService.createComment(comment);
    dispatch(commentCreate(content));
  } catch (error) {
    dispatch(commentCreateFailed(error.message));
  }
};

export const removeComment = (id) => async (dispatch) => {
  dispatch(commentRemoveRequested());
  try {
    const {content} = await commentService.removeComment(id);
    if (content === null) dispatch(commentRemove(id));
  } catch (error) {
    dispatch(commentRemoveFailed(error.message));
  }
};
export const getComments = () => (state) => state.comments.entities;

export const getCommentsLoadingStatus = () => (state) => state.comments.isLoading;

export default commentsReducer;