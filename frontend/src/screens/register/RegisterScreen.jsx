import React, { useState ,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import { register } from '../../actions/userActions';
import LoadingBox from '../../components/loadingBox/LoadingBox';
import MessageBox from '../../components/messagebox/MessageBox';
import './RegisterScreen.css';

export default function RegisterScreen(props) {

    const redirect = props.location.search ? props.location.search.split('=')[1] : '/';
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [teacher, setTeacher] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const userRegister = useSelector((state)=> state.userRegister);
    const { userInfo, loading, error } = userRegister;

    const submitHandler = (e) =>{
        e.preventDefault();
        if(confirmPassword!==password){
            alert('Password and confirm password are not match');
        }else{
            dispatch(register(name, surname, email, password, teacher) );
        }
        
    }

    useEffect(() => {
        if(userInfo){
            props.history.push(redirect);
        }
    }, [props.history, redirect, userInfo]);

    return (
        <div>
            <form className="form" onSubmit={submitHandler}> 
                <div>
                    <h1>Register</h1>
                </div>
                { loading && ( <LoadingBox>User created!!</LoadingBox> ) }
                { error && ( <MessageBox variant='danger'>{error}</MessageBox> ) }
                <div>
                    <label htmlFor="email">Name</label>
                    <input type="text" 
                        id="name"
                        placeholder="Enter name" 
                        required={true} 
                        onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="email">Surname</label>
                    <input 
                        type="text" 
                        id="surname"
                        placeholder="Enter surname" 
                        required={true} 
                        onChange={(e)=>setSurname(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="email">Email address</label>
                    <input 
                        type="email" 
                        id="email"
                        placeholder="Enter e-mail" 
                        required={true} 
                        onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        id="password"
                        placeholder="Enter password" 
                        required={true} 
                        onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input 
                        type="password" 
                        id="confirmPassword"
                        placeholder="Enter password" 
                        required={true} 
                        onChange={(e)=>setConfirmPassword(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="checkbox">Are you a Yoga Instructor?</label>
                    <input 
                        type="checkbox" 
                        id="teacher"
                        checked={teacher}
                        onChange={()=>setTeacher(!teacher)}/>
                </div>
                <div>
                    <label ></label>
                    <button className="primary" type="submit">Register</button>
                </div>
                <div>
                    <Link to="/signin">Sign In</Link>
                </div>

            </form>
        </div>
    );
}