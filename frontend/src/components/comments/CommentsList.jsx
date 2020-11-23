import React from 'react';

import Comment from './Comment';

export default  function  CommentsList(props)  {

    

    return (
        <div className="commentList">
            { props.comments.length > 0 &&
                // eslint-disable-next-line array-callback-return
                props.comments.map((commentItem, i)=>{
                    console.log(typeof(commentItem.createdAt));
                    var name = commentItem.userID.name + ' ' + commentItem.userID.surname;
                    return ( 
                        <Comment 
                            key={i} 
                            author={name}
                            date={commentItem.createdAt}
                            text={commentItem.text}></Comment> 
                            )
                })
            }
      </div>
    );


}


