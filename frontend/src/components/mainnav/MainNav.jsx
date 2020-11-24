import React from 'react';
import { 
    useDispatch, 
    useSelector 
} from 'react-redux';
import { signOut } from '../../actions/userActions';
//import { Link } from 'react-router-dom';
import './mainnav.css';
import { 
    Navbar, 
    Nav, 
    // NavItem, 
    NavDropdown, 
//    Container,
    // MenuItem 
} from 'react-bootstrap';

export default function MainNav() {

    const userSignIn = useSelector((state)=>state.userSignIn);
    const {userInfo} = userSignIn;
    // const handleMenu = () => {
    //   var sidebarMenu = document.querySelector(".sidebar");
    //   if(sidebarMenu){
    //     var open = document.querySelector(".sidebar").classList.contains("open");
    //     if (open === false) {
    //         document.querySelector(".sidebar").classList.add("open");
    //     } else {
    //         document.querySelector(".sidebar").classList.remove("open");
    //     }
    //   }
    // }
    const dispatch = useDispatch();
    const signOutHandler = () => {
      dispatch(signOut());
    }

    return (
        <React.Fragment>
            {/* <header className="header"> */}
                <Navbar bg="light" variant="light" expand="true" fixed="top">
                    <Navbar.Brand href="/">
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
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                            { userInfo && userInfo.teacher && 
                                (<Nav.Link href="/teacherprofile">Teacher Profile</Nav.Link>)
                            }
                            
                            <Nav.Link href="/maps">Map of teachers</Nav.Link>
                            <Nav.Link href="/">Yoga teachers</Nav.Link>
                            { !userInfo && 
                                (
                                <NavDropdown title="Yoga Teacher" id="collasible-nav-dropdown">
                                    <NavDropdown.Item href="/signin">Sign In</NavDropdown.Item>
                                    <NavDropdown.Item href="/register">Register</NavDropdown.Item>
                                </NavDropdown>
                                )
                            }
                            { !userInfo && 
                                                                (
                                <NavDropdown title="Practitioner" id="collasible-nav-dropdown">
                                    <NavDropdown.Item href="/signin">Sign In</NavDropdown.Item>
                                    <NavDropdown.Item href="/register">Register</NavDropdown.Item>
                                </NavDropdown>
                                )
                            }
                            
                            
                        </Nav>
                        { userInfo &&
                            <Navbar.Collapse className="justify-content-end">
                                <Navbar.Text>
                                    Signed in as: <a href="/userprofile">{userInfo.name} {userInfo.surname}</a>
                                </Navbar.Text>
                            </Navbar.Collapse>
                        }
                        { userInfo &&
                             <Navbar.Collapse className="justify-content-end">
                                <Navbar.Text>
                                    <a href="#signout" onClick={signOutHandler}>Sign Out</a>
                                </Navbar.Text>
                            </Navbar.Collapse>
                        }
                        
                    </Navbar.Collapse>

                </Navbar>
            {/* </header> */}
        </React.Fragment>
    );
}

