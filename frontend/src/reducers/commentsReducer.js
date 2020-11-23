import { COMMENTS_READ_ALL_FAIL, COMMENTS_READ_ALL_REQUEST, COMMENTS_READ_ALL_SUCCESS, COMMENT_PUT_FAIL, COMMENT_PUT_REQUEST, COMMENT_PUT_SUCCESS } from "../constants/commentsConstants";


export const commentsListReducer = (state = { loading: true, comments: [], success: false }, action) => {
    switch (action.type) {
        case COMMENTS_READ_ALL_REQUEST:
            return { loading: true };
        case COMMENTS_READ_ALL_SUCCESS:
            return { loading: false, comments: action.payload, success: true };
        case COMMENTS_READ_ALL_FAIL:
            return { loading: false, error: action.payload, success: false };
        default:
            return state;
    }
}

export const commentCreateReducer = (state = { loading: true, comment: {} }, action) => {
    switch (action.type) {
        case COMMENT_PUT_REQUEST:
            return { loading: true };
        case COMMENT_PUT_SUCCESS:
            return { loading: false, comment: action.payload, success: true };
        case COMMENT_PUT_FAIL:
            return { loading: false, error: action.payload, success: false };
        default:
            return state;
    }
}