import React from 'react';
import { 
    Col,
    Row,
    Card 

} from 'react-bootstrap';
import CommentForm from './CommentForm';
import {  useSelector } from 'react-redux';

export default  function  Comment(props)  {

    const userSignIn = useSelector((state)=>state.userSignIn);
    const {userInfo} = userSignIn;

    const commentsList = useSelector((state)=>state.commentsList);
    const { comments } = commentsList;

    const dateCreatedAt = new Date(props.comment.createdAt);

    const authortext = props.comment.userID.name + ' ' + props.comment.userID.surname;

    const  dateComment = 
    dateCreatedAt.toDateString() + 
    " at " +
    dateCreatedAt.getHours() +
    ":" + 
    dateCreatedAt.getMinutes() + 
    ":" +
    dateCreatedAt.getSeconds();

    
    
    return (
       // <div className="comment">
        <React.Fragment>
            <Row>
                <Col>
                    <Card bg="light" border="secondary">
                    <Card.Body>
                        <Card.Title>{authortext}</Card.Title>
                        <Card.Subtitle>{dateComment}</Card.Subtitle>
                        <br></br>
                        <Card.Text>{props.comment.text}</Card.Text>
                        </Card.Body>
                        
                    </Card>
                    { userInfo.teacher &&
                        <Row>
                            {/* <Col sm={1}>
                            </Col> */}
                            <Col>
                                <CommentForm teacherID={props.comment.teacherIDProfile} parentID={props.comment._id} ></CommentForm>
                            </Col>
                        </Row>
                    }

                    { comments &&
                    // eslint-disable-next-line array-callback-return
                        comments.map((item,z) => {
                            if(item.parentID === props.comment._id){
                            return (
                            <Row>
                                <Col sm={1}>
                                </Col>
                                <Col>
                                <Comment 
                                    key={z} 
                                    comment = {item}></Comment> 
                                </Col>
                            </Row>)
                            }
                        })
                    }


                </Col>
            </Row>
        </React.Fragment>
        
    );


}


