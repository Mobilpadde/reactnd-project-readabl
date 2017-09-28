import React from 'react';
import Comment from 'react-icons/lib/go/comment';
import PropTypes from 'prop-types';

import '../styles/Author.css';

const Comments = props => (
    <div className="author">
        <div>
            <Comment />
            <span>{props.num}</span>
        </div>
    </div>
);

Comments.propTypes = {
    num: PropTypes.number.isRequired,
};

export default Comments;
