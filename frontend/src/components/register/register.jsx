import React, { useState ,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import {Link} from 'react-router-dom';
import { register } from '../../actions/userActions';
import LoadingBox from '../../components/loadingBox/LoadingBox';
import MessageBox from '../../components/messagebox/MessageBox';
//import './RegisterScreen.css';
import { Form, Button } from 'react-bootstrap';

export default function RegisterScreen(props) {

    const teacherFlag = props.teacher;

    //const redirect = props.location.search ? props.location.search.split('=')[1] : '/';
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    //const [teacher, setTeacher] = useState(false);
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
            dispatch(register(name, surname, email, password, teacherFlag) );
        }
        
    }

    useEffect(() => {
        if(userInfo){
            props.history.push('/');
        }
    }, [props.history, userInfo]);

    return (
        <Form className="form" onSubmit={submitHandler}>
            { teacherFlag ? ( <h4>Register as a teacher</h4> ) : ( <h4>Register as a practitioner</h4> )}
            
            { loading && ( <LoadingBox>User created!!</LoadingBox> ) }
            { error && ( <MessageBox variant='danger'>{error}</MessageBox> ) }
            <Form.Group >
                <Form.Label>Name</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setName(e.target.value)}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Surname</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setSurname(e.target.value)}/>
            </Form.Group>
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
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={(e)=>setConfirmPassword(e.target.value)}/>
            </Form.Group>
            <br></br>
            <Button  variant="primary" block type="submit">
                Submit
            </Button>
        </Form>

    );
}