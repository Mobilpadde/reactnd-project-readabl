import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addCommentForPost } from "../actions/index";

import '../styles/CommentCreator.css';

function CommentCreator({ onSubmitComment }) {
    let body;

    return (
        <div className="create">
            <form onSubmit={e => onSubmitComment(e, body)}>
                <textarea ref={node => body = node}></textarea>
                <input type="submit" />
            </form>
        </div>
    );
}

const mapDispatchToProps = (dispatch, { postId }) => ({
    onSubmitComment: (e, body) => {
        e.preventDefault();
        let { value } = body;

        if (value.trim() === '')
            return;

        dispatch(addCommentForPost(postId, value, 'Mobilpadde'));
        body.value = '';
    },
});

CommentCreator.PropTypes = {
    postId: PropTypes.string.isRequired,
};

export default connect(null, mapDispatchToProps)(CommentCreator);
