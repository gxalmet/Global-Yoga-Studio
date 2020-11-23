import Axios from 'axios';
import { COMMENTS_READ_ALL_FAIL, COMMENTS_READ_ALL_REQUEST, COMMENTS_READ_ALL_SUCCESS, COMMENT_PUT_FAIL, COMMENT_PUT_REQUEST, COMMENT_PUT_SUCCESS } from '../constants/commentsConstants';


export const commentsListAction = (teacherID) => async(dispatch, getState) => {

    const { userSignIn: { userInfo } } = getState();

    dispatch({ type: COMMENTS_READ_ALL_REQUEST });

    try {

        const url = `/api/comments/readall${teacherID}`;

        const { data } = await Axios.get(url, {
            headers: {
                Authorization: 'Bearer ' + userInfo.token
            }
        });

        dispatch({ type: COMMENTS_READ_ALL_SUCCESS, payload: data.comments });

    } catch (error) {
        dispatch({ type: COMMENTS_READ_ALL_FAIL, payload: error.message });
    }

};

export const commentCreateAction = (teacherID, userID, text) => async(dispatch, getState) => {

    const { userSignIn: { userInfo } } = getState();

    const body = {
        text: text,
        parentID: '',
        userID: userID,
        teacherIDProfile: teacherID
    };

    dispatch({ type: COMMENT_PUT_REQUEST });

    try {

        const url = "/api/comments/create";

        const { data } = await Axios.post(url, body, {
            headers: {
                Authorization: 'Bearer ' + userInfo.token
            }
        });

        dispatch({ type: COMMENT_PUT_SUCCESS, payload: data.comment });

    } catch (error) {
        dispatch({ type: COMMENT_PUT_FAIL, payload: error.message });
    }

};