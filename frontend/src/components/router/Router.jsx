import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomeScreen from '../../screens/home/HomeScreen';
import TeacherScreen from '../../screens/teacher/TeacherScreen';
import SignInScreen from '../../screens/signin/SignInScreen';
import UserProfile from '../../screens/userprofile/UserScreen'
import { useSelector } from 'react-redux';

//import MyMap from './components/googleMaps/MyMap';
import RegisterScreen from '../../screens/register/RegisterScreen';
import TeacherProfileScreen from '../../screens/teacherprofile/TeacherProfileScreen';
import  MyMap  from '../googleMaps/MyMap';
export default function Router(){
    const userSignIn = useSelector((state)=>state.userSignIn);
    const {userInfo} = userSignIn;
    
    

    return (
        
        <Switch>
            <Route path="/" exact={true} component={HomeScreen}></Route>
            {
                userInfo && (<Route path="/" exact={true} component={HomeScreen}>Profile</Route>)
            }
        
            <Route path="/teacher/:id" component={TeacherScreen}></Route>
            <Route path="/signin" component={SignInScreen}></Route>
            <Route path="/maps" component={MyMap}></Route>
            <Route path="/register" component={RegisterScreen}></Route>
            <Route path="/userprofile" component={UserProfile}></Route>
            <Route path="/teacherprofile" component={TeacherProfileScreen}></Route>
        </Switch>
          
    );
}

