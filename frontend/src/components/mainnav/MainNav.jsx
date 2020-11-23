import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../../actions/userActions';
import { Link } from 'react-router-dom';

export default function MainNav() {

    const userSignIn = useSelector((state)=>state.userSignIn);
    const {userInfo} = userSignIn;
    const handleMenu = () => {
      var sidebarMenu = document.querySelector(".sidebar");
      if(sidebarMenu){
        var open = document.querySelector(".sidebar").classList.contains("open");
        if (open === false) {
            document.querySelector(".sidebar").classList.add("open");
        } else {
            document.querySelector(".sidebar").classList.remove("open");
        }
      }
    }
    const dispatch = useDispatch();
    const signOutHandler = () => {
      dispatch(signOut());
    }
    return (
        <React.Fragment>
            <header className="header">
                <div className="brand">
                    <button onClick={handleMenu}>
                        &#9776;
                    </button>
                    <Link to="/">Global Yoga Studio</Link>
                </div>
                {/* <div className="header-links">
                    {
                        userInfo ? 
                        ( <span><Link to="/userprofile">{userInfo.name} {userInfo.surname}</Link> </span>) 
                        : (<span> <Link to="/signin">Sign In</Link> </span> )
                    }
                    {
                        userInfo ? 
                        ( <div className="dropdown-content" ><Link to="#signout" onClick={signOutHandler}>Sign Out</Link></div> )
                        :( <span></span>)
                    }
                </div> */}
                <div className="dropdown">
                    {
                        userInfo ? 
                        ( <button className="dropbtn">{userInfo.name} {userInfo.surname}</button>) 
                        : ( <button className="dropbtn">User</button> )
                    }
                    
                    <div className="dropdown-content">
                        {
                            userInfo ? 
                            ( 
                            <React.Fragment>
                                <Link to="/userprofile">User profile</Link>
                                <Link to="#signout" onClick={signOutHandler}>Sign Out</Link>
                            </React.Fragment> 
                            ) 
                            : ( 
                            <React.Fragment>
                                <Link to="/signin">Sign In</Link> 
                                <Link to="register">Register</Link>
                            </React.Fragment> 
                            )
                        }
                    </div>
                </div>
            </header>

            <aside className="sidebar">
                <Link to="/"><button className="sidebar-button" >Yoga teachers</button></Link>
                {
                userInfo && userInfo.teacher && (<Link to="/teacherprofile"><button className="sidebar-button" >Teacher Profile</button></Link>)
                }
                {/* <button className="sidebar-button" >Places</button>
                <button className="sidebar-button" >Languages</button> */}
                <Link to="/maps"><button className="sidebar-button" >Maps</button></Link>
            </aside>
        </React.Fragment>
    );
}

