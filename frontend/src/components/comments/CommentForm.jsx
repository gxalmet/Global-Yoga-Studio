import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { commentCreateAction, commentsListAction } from '../../actions/commentsActions';

export default  function  CommentForm(props)  {

    const teacherID = props.teacherID;

    const dispacth = useDispatch();
    const userSignIn = useSelector((state)=>state.userSignIn);
    const { userInfo } = userSignIn;

    const [text, setText] = useState('');

    const createComment = (e)=>{
        e.preventDefault();
        dispacth(commentCreateAction(teacherID, userInfo._id, text));
        dispacth(commentsListAction(teacherID));
        setText('');
    }
    

    return (
        <div className="comment-form">
            <h3>Share your comment as {userInfo.name} {userInfo.surname}</h3>
            <label htmlFor="text"></label>
            <input 
                type="text"
                className="comment-input"
                value={text}
                onChange={(e)=>setText(e.target.value)}/>
            <button className="comment-button" onClick={createComment}>Publish</button>
        </div>
    );

}


