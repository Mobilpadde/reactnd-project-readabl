import React from 'react';
import Quote from 'react-icons/lib/go/quote';

import '../styles/Comment.css';

function Comment({ text }){
    return (
        <div className="comment">
            <Quote />
            <p>{text}</p>
        </div>
    );
}

export default Comment;
