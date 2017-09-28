import React from 'react';
import Quote from 'react-icons/lib/go/quote';

import '../styles/Comment.css';

function Comment(props){
    return (
        <div className="comment">
            <Quote />
            <p>{props.text}</p>
        </div>
    );
}

export default Comment;
