import React, { useState ,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import { signIn } from '../../actions/userActions';
import './SignInScreen.css';

export default function SignInScreen(props) {

    const redirect = props.location.search ? props.location.search.split('=')[1] : '/';
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const userSignIn = useSelector((state)=> state.userSignIn);
    const { userInfo } = userSignIn;

    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(signIn(email, password) );
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
                    <h1>Sign In</h1>
                </div>
                <div>
                    <label htmlFor="email">Email address</label>
                    <input type="email" 
                           placeholder="Enter e-mail" 
                        //    required={true} 
                           onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" 
                           placeholder="Enter password" 
                        //    required={true} 
                           onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <div>
                    <label ></label>
                    <button className="primary" type="submit">Sign In</button>
                </div>
                <div>
                    New user? <Link to="/register">Create new account.</Link>
                </div>

            </form>
        </div>
    );
}