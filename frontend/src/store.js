import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { teacherListReducer, teacherDetailsReducer, teacherCreateReducer, teacherUpdateReducer, teacherDetailsByUserReducer } from './reducers/teacherListReducer';
import { userUpdateReducer, userRegisterReducer, userSignInReducer } from './reducers/userReducer';
import { commentCreateReducer, commentsListReducer } from './reducers/commentsReducer';

const initialState = {
    userSignIn: {
        userInfo: localStorage.getItem('userInfo') ?
            JSON.parse(localStorage.getItem('userInfo')) : null
    }
};
const reducer = combineReducers({
    teachersList: teacherListReducer,
    teacherDetails: teacherDetailsReducer,
    userSignIn: userSignInReducer,
    userRegister: userRegisterReducer,
    userUpdate: userUpdateReducer,
    teacherProfileCreate: teacherCreateReducer,
    teacherProfileUpdate: teacherUpdateReducer,
    teacherProfileRead: teacherDetailsByUserReducer,
    commentsList: commentsListReducer,
    commentCreate: commentCreateReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;