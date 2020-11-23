import Axios from 'axios';
const { TEACHERS_LIST_REQUEST, TEACHERS_LIST_SUCCESS, TEACHERS_LIST_FAIL, TEACHER_DETAIL_FAIL, TEACHER_DETAIL_SUCCESS, TEACHER_DETAIL_REQUEST, TEACHER_CREATE_REQUEST, TEACHER_CREATE_SUCCESS, TEACHER_CREATE_FAIL, TEACHER_DETAIL_BYUSER_REQUEST, TEACHER_DETAIL_BYUSER_SUCCESS, TEACHER_DETAIL_BYUSER_FAIL, TEACHER_UPDATE_REQUEST, TEACHER_UPDATE_SUCCESS, TEACHER_UPDATE_FAIL } = require("../constants/teacherConstants")


export const teachersListAction = () => async(dispatch) => {

    dispatch({ type: TEACHERS_LIST_REQUEST });

    try {

        const { data } = await Axios.get("/api/teachers/readAllteacher");

        dispatch({ type: TEACHERS_LIST_SUCCESS, payload: data.teachers });

    } catch (error) {
        dispatch({ type: TEACHERS_LIST_FAIL, payload: error.message });
    }

};



export const teacherDetailsAction = (teacherID) => async(dispatch) => {

    dispatch({ type: TEACHER_DETAIL_REQUEST });
    try {
        const url = `/api/teachers/readteacher${teacherID}`;

        const { data } = await Axios.get(url);

        dispatch({ type: TEACHER_DETAIL_SUCCESS, payload: data.teacher });

    } catch (error) {
        dispatch({ type: TEACHER_DETAIL_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message });
    }
};

export const teacherCreateAction = (userID) => async(dispatch, getState) => {

    const { userSignIn: { userInfo } } = getState();


    dispatch({ type: TEACHER_CREATE_REQUEST });

    try {
        const url = `/api/teachers/createteacher${userID}`;

        const { data } = await Axios.post(url, {}, {
            headers: {
                Authorization: 'Bearer ' + userInfo.token
            }
        });

        dispatch({ type: TEACHER_CREATE_SUCCESS, payload: data.teacher });

    } catch (error) {
        dispatch({ type: TEACHER_CREATE_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message });
    }
};

export const teacherUpdateAction = (teacherid, name, country, img, place, languages, remote, type, urlYoutube, urlInstagram, des) => async(dispatch, getState) => {

    const { userSignIn: { userInfo } } = getState();

    var body = {
        name: name,
        country: country,
        img: img,
        place: place,
        languages: languages,
        remote: remote,
        type: type,
        urlYoutube: urlYoutube,
        urlInstagram: urlInstagram,
        des: des
    }

    dispatch({ type: TEACHER_UPDATE_REQUEST });

    try {
        const url = `/api/teachers/updateteacher${teacherid}`;

        const { data } = await Axios.put(url, body, {
            headers: {
                Authorization: 'Bearer ' + userInfo.token
            }
        });

        dispatch({ type: TEACHER_UPDATE_SUCCESS, payload: data.teacher });
        dispatch({ type: TEACHER_DETAIL_BYUSER_SUCCESS, payload: data.teacher });

    } catch (error) {
        dispatch({ type: TEACHER_UPDATE_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message });
    }
};

export const teacherDetailsUserAction = (userID) => async(dispatch, getState) => {
    const { userSignIn: { userInfo } } = getState();

    dispatch({ type: TEACHER_DETAIL_BYUSER_REQUEST });
    try {
        const url = `/api/teachers/readbyuserteacher${userID}`;

        const { data } = await Axios.get(url, {
            headers: {
                Authorization: 'Bearer ' + userInfo.token
            }
        });



        dispatch({ type: TEACHER_DETAIL_BYUSER_SUCCESS, payload: data.teacher });

    } catch (error) {

        dispatch({ type: TEACHER_DETAIL_BYUSER_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message });
    }
};