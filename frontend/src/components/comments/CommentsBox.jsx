import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { commentsListAction } from '../../actions/commentsActions';
import CommentForm from './CommentForm';
import CommentsList from './CommentsList';
import LoadingBox from '../../components/loadingBox/LoadingBox';
import MessageBox from '../../components/messagebox/MessageBox';
import './comment.css';

export default  function  CommentsBox(props)  {

    const dispacth = useDispatch();

    const [list, setList] = useState([]);

    const userSignIn = useSelector((state)=>state.userSignIn);
    const { userInfo } = userSignIn;

    const commentsList = useSelector((state)=>state.commentsList);
    const { loading, comments, error, success } = commentsList;

    const commTeachID = props.teachID;

    useEffect(() => {

        if(success === false){
            if(userInfo){
                dispacth(commentsListAction(commTeachID));
            }
            setList(comments);
        }
        if (success === true){
            setList(comments);
        }
        

    }, [commTeachID, comments, commentsList, dispacth, success, userInfo]);


    if(!userInfo){
        return (
            <div>
                <h3>Register to comment.</h3>
            </div>
        ); 
    }else{
        
        return (
            
            <div className="commentBox">
                <h3>Opinions</h3>
                { loading && ( <LoadingBox>Loading comments...</LoadingBox> ) }
                { error && ( <MessageBox variant='danger'>{error}</MessageBox> )}
                { list && (
                    <React.Fragment>
                        <CommentForm teacherID={commTeachID}></CommentForm>
                        <CommentsList 
                            teacherID={commTeachID} 
                            comments={list}></CommentsList>
                        
                    </React.Fragment>
                )}

            </div>
            
        );
    }

}


