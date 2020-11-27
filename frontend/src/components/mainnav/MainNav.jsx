import 
    React
    // , 
    // {
    //     useState
    // } 
    from 'react';
import { 
    useDispatch, 
    useSelector 
} from 'react-redux';
import { signOut } from '../../actions/userActions';
import { Link } from 'react-router-dom';
import './mainnav.css';
import { 
    Navbar, 
    Nav, 
// NavItem, 
    NavDropdown,
// Container, 
// Button,
//    Container,
// MenuItem 
} from 'react-bootstrap';
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//     faUser
//   } from "@fortawesome/free-brands-svg-icons";
//import Icon from '@material-ui/core/Icon';
//import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useHistory } from "react-router-dom";

// import AccountCircle from '@material-ui/icons/AccountCircle';
// import SvgIcon from '@material-ui/core/SvgIcon';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faCoffee } from '@fortawesome/free-solid-svg-icons';

import { FaUserAlt } from 'react-icons/fa';

export default function MainNav(props) {

    const history = useHistory();

    const userSignIn = useSelector((state)=>state.userSignIn);
    
    const {userInfo} = userSignIn;

    const dispatch = useDispatch();
    const signOutHandler = () => {
        dispatch(signOut());
        history.push("/");
        //props.history.push('/');
    }
    const handleMenu = () => {
        var open = document.querySelector(".sidebar").classList.contains("open");
        if (open === false) {
            document.querySelector(".sidebar").classList.add("open");
        } else {
            document.querySelector(".sidebar").classList.remove("open");
        }
    }

    return (
        <React.Fragment>
                <Navbar bg="light" variant="light"  fixed="top" >
                    <button variant="secundary" onClick={handleMenu}>
                        &#9776;
                    </button>
                    <div className="sidebar">
                        { (userInfo && userInfo.teacher) && 
                            (<Link to="/teacherprofile"><button className="sidebar-button" >Teacher Profile</button></Link>)
                        }
                        <Link to="/"><button className="sidebar-button" >Yoga Categories</button></Link>
                        <Link to="/"><button className="sidebar-button" >Places</button></Link>
                        <Link to="/maps"><button className="sidebar-button" >Teacher maps</button></Link>
                    </div>
                    <Navbar.Brand href="/" >
                        <h1>
                            <img  
                                src={process.env.PUBLIC_URL + '/images/logo.jpg'} 
                                alt="Global Yoga Studio" 
                                width="30"
                                height="30"
                                className="d-inline-block align-top logo">
                            </img>
                            Global Yoga Studio
                        </h1>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse className="justify-content-end" >
                        <Nav>
                            { userInfo &&               
                                <NavDropdown alignRight 
                                    title={
                                        <React.Fragment>
                                            &nbsp;<FaUserAlt size="1.8rem"></FaUserAlt> &nbsp;                                  
                                        </React.Fragment>
                                    } 
                                    id="collasible-nav-dropdown">
                                    
                                    <NavDropdown.Item  href="/userprofile">{userInfo.name} {userInfo.surname}: User profile</NavDropdown.Item>
                                    <NavDropdown.Item onClick={signOutHandler}>Sign out</NavDropdown.Item>
                                </NavDropdown>
                            }
                            { !userInfo &&                  
                                <NavDropdown 
                                    title={
                                        <React.Fragment>
                                            &nbsp;<FaUserAlt size="1.8rem"></FaUserAlt> &nbsp;
                                            User
                                        </React.Fragment>
                                    } 
                                    id="collasible-nav-dropdown">
                                    <NavDropdown.Item href="/signin">Sign in</NavDropdown.Item>
                                    <NavDropdown.Item href="/register">Register</NavDropdown.Item>
                                </NavDropdown>
                            }                         
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
        </React.Fragment>
    );
}

