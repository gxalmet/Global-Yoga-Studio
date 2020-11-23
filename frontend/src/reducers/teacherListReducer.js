import { TEACHERS_LIST_FAIL, TEACHERS_LIST_REQUEST, TEACHERS_LIST_SUCCESS, TEACHER_CREATE_FAIL, TEACHER_CREATE_REQUEST, TEACHER_CREATE_SUCCESS, TEACHER_DETAIL_BYUSER_FAIL, TEACHER_DETAIL_BYUSER_REQUEST, TEACHER_DETAIL_BYUSER_SUCCESS, TEACHER_DETAIL_FAIL, TEACHER_DETAIL_REQUEST, TEACHER_DETAIL_SUCCESS, TEACHER_UPDATE_FAIL, TEACHER_UPDATE_REQUEST, TEACHER_UPDATE_SUCCESS } from "../constants/teacherConstants";

export const teacherListReducer = (state = { loading: true, teachers: [] }, action) => {
    switch (action.type) {
        case TEACHERS_LIST_REQUEST:
            return { loading: true };
        case TEACHERS_LIST_SUCCESS:
            return { loading: false, teachers: action.payload };
        case TEACHERS_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const teacherDetailsReducer = (state = { loading: true, teacher: {} }, action) => {
    switch (action.type) {
        case TEACHER_DETAIL_REQUEST:
            return { loading: true };
        case TEACHER_DETAIL_SUCCESS:
            return { loading: false, teacher: action.payload };
        case TEACHER_DETAIL_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const teacherCreateReducer = (state = { teacher: {} }, action) => {
    switch (action.type) {
        case TEACHER_CREATE_REQUEST:
            return { loading: true };
        case TEACHER_CREATE_SUCCESS:
            return { loading: false, teacher: action.payload };
        case TEACHER_CREATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const teacherUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case TEACHER_UPDATE_REQUEST:
            return { loading: true };
        case TEACHER_UPDATE_SUCCESS:
            return { loading: false, teacher: action.payload, success: true };
        case TEACHER_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const teacherDetailsByUserReducer = (state = { teacher: {} }, action) => {
    switch (action.type) {
        case TEACHER_DETAIL_BYUSER_REQUEST:
            return { loading: true };
        case TEACHER_DETAIL_BYUSER_SUCCESS:
            return { loading: false, teacher: action.payload };
        case TEACHER_DETAIL_BYUSER_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}