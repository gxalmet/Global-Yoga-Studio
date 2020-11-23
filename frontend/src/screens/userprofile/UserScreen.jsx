import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import { detailsUser, signIn, update } from '../../actions/userActions';
import { update } from '../../actions/userActions';
import MessageBox from '../../components/messagebox/MessageBox';
import LoadingBox from '../../components/loadingBox/LoadingBox';

export default function UserScreen(props) {

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [teacher, setTeacher] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorPass, setErrorPass] = useState('');
    const dispatch = useDispatch();
    
    const userSignIn = useSelector((state)=>state.userSignIn);
    
    const { userInfo } = userSignIn;
    
    const userUpdate = useSelector(state => state.userUpdate);
    const { loading, success, error } = userUpdate;

    useEffect(() => {
        //dispatch(signIn(userInfo._id));
        if(userInfo){
            setName(userInfo.name);
            setSurname(userInfo.surname);
            setEmail(userInfo.email);
            setPassword(userInfo.password);
            setTeacher(userInfo.teacher);
        }


    }, [dispatch, userInfo, userInfo._id, userInfo.email, userInfo.name, userInfo.password, userInfo.surname, userInfo.teacher]);
    
    const submitHandler = (e) =>{
        e.preventDefault();
        setErrorPass('');
        if(password && password !== confirmPassword){
            setErrorPass('Password and confirm password are not match');
        }else{
            dispatch(update({ userId: userInfo._id, email, name, surname, password }));
        }  
    }
    
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>User profile</h1>
                </div>
                { loading && ( <LoadingBox></LoadingBox> )}
                { error && ( <MessageBox variant='danger'>{error}</MessageBox> ) }
                { errorPass && ( <MessageBox variant='danger'>{errorPass}</MessageBox> ) }
                { success && ( <MessageBox variant='info'>Profile Saved</MessageBox> ) }
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" 
                        id="name"
                        required={true} 
                        defaultValue = {name}
                        onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="surname">Surname</label>
                    <input 
                        type="text" 
                        id="surname"
                        required={true} 
                        defaultValue = {surname}
                        onChange={(e)=>setSurname(e.target.value)}/>
                </div>
                 <div>
                    <label htmlFor="email">Email address</label>
                    <input 
                        type="email" 
                        id="email"
                        required={true} 
                        defaultValue = {email}
                        onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        id="password"
                        placeholder="Enter password" 
                        defaultValue = {password}
                        onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input 
                        type="password" 
                        id="confirmPassword"
                        placeholder="Enter password"
                        defaultValue = {confirmPassword}
                        onChange={(e)=>setConfirmPassword(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="teacher">Are you a Yoga Instructor?</label>
                    <input 
                        type="checkbox" 
                        id="teacher"
                        defaultValue = {teacher}
                        onChange={(e)=>setTeacher(e.target.value)}/>
                </div>
                <div>
                    <label ></label>
                    <button className="primary" type="submit" >Update User</button>
                </div>
            </form>
        </div>
    );
    
}