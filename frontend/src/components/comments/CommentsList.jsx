import React from 'react';
import Comment from './Comment';


export default  function  CommentsList(props)  {

    return (
        <React.Fragment>
            { props.comments.length > 0 &&
                // eslint-disable-next-line array-callback-return
                props.comments.map((commentItem, i)=>{
                    console.log(commentItem.parentID);
                    if(commentItem.parentID === undefined){
                        return ( 
                            <Comment 
                                key={i} 
                                comment = {commentItem}>

                            </Comment> 
                        )
                    }
                })
            }
        </React.Fragment>
    );


}


