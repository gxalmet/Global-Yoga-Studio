/* eslint-disable jsx-a11y/anchor-has-content */
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
import { 
    Container,
    Row,
    Col 
//    Button 
} from 'react-bootstrap';
import {
    faYoutube,
    faInstagram
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



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
                
                    <Container>
                        <Row>
                            <Col>
                                <h3 className="teacher-detail-title">{teacher.name}</h3>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="justify-content-md-center">
                            </Col>
                            <Col className="justify-content-md-center">
                                <ImageBox
                                        imageID={teacher.img}
                                        clas="teacher-detail-img"
                                        alt="teacher"></ImageBox>
                            </Col>
                            <Col className="justify-content-md-center">
                            </Col>
                        </Row>
                        <Row>
                            <Col className="justify-content-md-center">
                                <LanguagesBox 
                                    class="product-list"
                                    classitem="product-list-li"
                                    languages={teacher.languages}>
                                </LanguagesBox>
                            </Col>
                            { ( teacher.urlYoutube.length > 2 || teacher.urlInstagram.length > 2 ) &&
                            <Col className="justify-content-md-center">
                                <div className="teacher-social"> 
                                    <ul >
                                        { teacher.urlYoutube.length > 2 &&
                                            <li >
                                                <a href={teacher.urlYoutube} className="youtube social">
                                                    <FontAwesomeIcon icon={faYoutube} size="1x" />
                                                </a>
                                                <button className="youtube" onClick={navigate(teacher.urlYoutube)}>Youtube</button>
                                            </li>  
                                        }
                                        { teacher.urlInstagram.length > 2  &&
                                            <li >
                                                <a href={teacher.urlInstagram} className="youtube social">
                                                    <FontAwesomeIcon icon={faInstagram} size="1x" />
                                                </a>
                                                {/* <button className="instagram" onClick={navigate(teacher.urlInstagram)}>Instagram</button> */}
                                            </li>  
                                        }
                                    </ul>
                                </div>
                            </Col> 
                            }

                            <Col className="justify-content-md-center">
                                <YogaBox
                                    class="teacher-type"
                                    classitem="product-list-li"
                                    yoga={teacher.type}></YogaBox>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="justify-content-md-center">
                                <div className="teacher-large-details">
                                    <div className="teacher-description">
                                        <p className="teacher-description-textarea" >{teacher.des}</p> 
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <CommentsBox teachID={teacher._id}></CommentsBox>
                            </Col>
                        </Row>
                    </Container>
                //      <React.Fragment>
                //         <h3 className="teacher-detail-title">{teacher.name}</h3>
                //     <div className="teacher-detail">
                //         <div>
                //             <ImageBox
                //                     imageID={teacher.img}
                //                     clas="teacher-detail-img"
                //                     alt="teacher"></ImageBox>                        
                //             <div className="teacher-social"> 
                //                 <ul >
                //                     { teacher.urlYoutube.length > 2 &&
                //                         <li >
                //                             <a href={teacher.urlYoutube} className="youtube social">
                //                                 <FontAwesomeIcon icon={faYoutube} size="1x" />
                //                             </a>
                //                             <button className="youtube" onClick={navigate(teacher.urlYoutube)}>Youtube</button>
                //                         </li>  
                //                     }
                //                     { teacher.urlInstagram.length > 2  &&
                //                         <li >
                //                             <a href={teacher.urlInstagram} className="youtube social">
                //                                 <FontAwesomeIcon icon={faInstagram} size="1x" />
                //                             </a>
                                            
                //                         </li>  
                //                     }
                //                 </ul>
                //             </div>

                //         </div>

                //         <div className="teacher-info">        
                //             <div className="teacher-place-country">Country: {teacher.country} </div>
                //             <div className="teacher-place-city">City: {teacher.place}</div>
                //             <LanguagesBox 
                //                 class="product-list"
                //                 classitem="product-list-li"
                //                 languages={teacher.languages}></LanguagesBox>
                //             <YogaBox
                //                 class="teacher-type"
                //                 classitem="product-list-li"
                //                 yoga={teacher.type}></YogaBox>
                //         </div>

                //         <div className="teacher-large-details">
                            
                //             <div className="teacher-description">
                                
                //                 <p className="teacher-description-textarea" >{teacher.des}</p>
                                
                //             </div>

                //         </div>
                //     </div>
                //     <CommentsBox teachID={teacher._id}></CommentsBox>
                // </React.Fragment>


                
                );
        }
        
    }
    
}

