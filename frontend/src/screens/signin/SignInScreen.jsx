import React, { useState ,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import {Link} from 'react-router-dom';
import { signIn } from '../../actions/userActions';
import './SignInScreen.css';
import { Form, Button } from 'react-bootstrap';
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
        <Form className="form" onSubmit={submitHandler}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)}/>
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
            </Form.Group>
            <br></br>
            <Button  variant="primary" size= "lg" type="submit">
                Submit
            </Button>
        </Form>
        // <div>
        //     <form className="form" onSubmit={submitHandler}> 
        //         <div>
        //             <h1>Sign In</h1>
        //         </div>
        //         <div>
        //             <label htmlFor="email">Email address</label>
        //             <input type="email" 
        //                    placeholder="Enter e-mail" 
        //                 //    required={true} 
        //                    onChange={(e)=>setEmail(e.target.value)}/>
        //         </div>
        //         <div>
        //             <label htmlFor="password">Password</label>
        //             <input type="password" 
        //                    placeholder="Enter password" 
        //                 //    required={true} 
        //                    onChange={(e)=>setPassword(e.target.value)}/>
        //         </div>
        //         <div>
        //             <label ></label>
        //             <button className="primary" type="submit">Sign In</button>
        //         </div>
        //         <div>
        //             New user? <Link to="/register">Create new account.</Link>
        //         </div>

        //     </form>
        // </div>
    );
}