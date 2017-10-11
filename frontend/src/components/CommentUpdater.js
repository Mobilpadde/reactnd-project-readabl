import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { updateCommentOnPost } from "../actions/index";

import '../styles/CommentUpdater.css';

function CommentUpdater({ onSubmitComment, text }) {
    let body;

    return (
        <div className="update">
            <form onSubmit={e => onSubmitComment(e, body)}>
                <textarea ref={node => body = node} defaultValue={text}/>
                <input type="submit" />
            </form>
        </div>
    );
}

const mapDispatchToProps = (dispatch, { id, onFinishEdit }) => ({
    onSubmitComment: (e, body) => {
        e.preventDefault();
        let { value } = body;

        if (value.trim() === '')
            return;

        dispatch(updateCommentOnPost(id, value));
        body.value = '';
        onFinishEdit(value);
    },
});

CommentUpdater.PropTypes = {
    postId: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    onFinishEdit: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(CommentUpdater);
