import React from 'react';


export default  function  Comment(props)  {

    const dateCreatedAt = new Date(props.date);

    console.log(dateCreatedAt);

    const authortext = props.author +
    " say on " + 
    dateCreatedAt.toDateString() + 
    " at " +
    dateCreatedAt.getHours() +
    ":" + 
    dateCreatedAt.getMinutes() + 
    ":" +
    dateCreatedAt.getSeconds();

    
    
    return (
        <div className="comment">
            <h2 className="comment-author">
                {authortext}
            </h2>
            <h3 className="comment-text">{props.text}</h3>
            
        </div>
    );


}


