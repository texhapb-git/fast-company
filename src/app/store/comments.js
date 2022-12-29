import { createSlice, createAction } from "@reduxjs/toolkit";
import commentService from "../services/comment.service";

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true;
        },
        commentsReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        commentsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        commentCreated: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.push(action.payload);
        },
        commentCreatedFailed: (state, action) => {
            state.error = action.payload;
        },
        commentDeleted: (state, action) => {
            state.entities = state.entities.filter(comment => comment._id !== action.payload);
        },
        commentDeletedFailed: (state, action) => {
            state.error = action.payload;
        }
    }
});

const { reducer: commentsReducer, actions } = commentsSlice;
const { commentsRequested, commentsReceived, commentsRequestFailed, commentCreated, commentCreatedFailed, commentDeleted, commentDeletedFailed } = actions;

const commentCreateRequested = createAction("comments/commentCreateRequested");
const commentDeleteRequested = createAction("comments/commentDeleteRequested");

export const loadCommentsList = (userId) => async (dispatch) => {
    dispatch(commentsRequested());
    try {
        const { content } = await commentService.getComments(userId);
        dispatch(commentsReceived(content));
    } catch (error) {
        dispatch(commentsRequestFailed(error.message));
    }
};

export const createComment = (data) => async (dispatch) => {
    dispatch(commentCreateRequested());
    try {
        const { content } = await commentService.createComment(data);
        dispatch(commentCreated(content));
    } catch (error) {
        dispatch(commentCreatedFailed(error.message));
    }
};

export const removeComment = (commentId) => async (dispatch) => {
    dispatch(commentDeleteRequested());
    try {
        await commentService.removeComment(commentId);
        dispatch(commentDeleted(commentId));
    } catch (error) {
        dispatch(commentDeletedFailed(error.message));
    }
};

export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) =>
    state.comments.isLoading;

export default commentsReducer;
