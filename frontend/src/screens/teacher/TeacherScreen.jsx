import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { teacherDetailsAction } from '../../actions/teachersActions';
//import  MyMap  from '../../components/googleMaps/MyMap';
import MessageBox from '../../components/messagebox/MessageBox';
import LoadingBox from '../../components/loadingBox/LoadingBox';
import './teacher.css';
import LanguagesBox from '../../components/languages/LanguagesBox';
import YogaBox from '../../components/yoga/YogaBox';
import ImageBox from '../../components/image/ImageBox';
import CommentsBox from '../../components/comments/CommentsBox';

export default function TeacherScreen(props){
    
    const dispatch = useDispatch();
    const teacherID = props.match.params.id;
    const teacherDetails = useSelector(state => state.teacherDetails);
    
    const {loading , error, teacher} = teacherDetails;
    
    useEffect(() => {
        dispatch(teacherDetailsAction(teacherID));
      },[dispatch, teacherID]);
        
    const  navigate = (param)  => e => {
        window.open(param);
    }

    
    
    if(loading){
        return ( <LoadingBox>Loading...</LoadingBox>)
    }else if (error){
        return ( <MessageBox variant="danger">{error}</MessageBox>)
    }else{
        if(teacher){
            return (
                <React.Fragment>
                    <h3 className="teacher-detail-title">{teacher.name}</h3>
                    <div className="teacher-detail">
                        <ImageBox
                            imageID={teacher.img}
                            clas="teacher-detail-img"
                            alt="teacher"></ImageBox>
                        <div className="teacher-info">        
                            <div className="teacher-place-country">Country: {teacher.country} </div>
                            <div className="teacher-place-city">City: {teacher.place}</div>
                            <LanguagesBox 
                                class="product-list"
                                classitem="product-list-li"
                                languages={teacher.languages}></LanguagesBox>
                        </div>
                        <YogaBox
                            class="teacher-type"
                            classitem="product-list-li"
                            yoga={teacher.type}></YogaBox>
                        <div className="teacher-social"> <h4>Social Media:</h4>
                            <ul >
                                { teacher.urlYoutube.length > 2 &&
                                    <li >
                                        <button className="youtube" onClick={navigate(teacher.urlYoutube)}>Youtube</button>
                                    </li>  
                                }
                                { teacher.urlInstagram.length > 2  &&
                                    <li >
                                        <button className="instagram" onClick={navigate(teacher.urlInstagram)}>Instagram</button>
                                    </li>  
                                }
                            </ul>
                        </div>
                        <div className="teacher-large-details">
                            
                            <div className="teacher-description">
                                <h4>Description</h4><br/>
                                <p className="teacher-description-textarea" >{teacher.des}</p>
                                
                            </div>
                            {/* <div className="teacher-maps">
                                <h4>Location</h4><br/>
                                <MyMap teacher={teacherDetails}></MyMap>
                            </div> */}
                        </div>
                    </div>
                    <CommentsBox teachID={teacher._id}></CommentsBox>
                </React.Fragment>
                
                );
        }
        
    }
    
}

