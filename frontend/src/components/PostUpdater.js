import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { updatePost } from "../actions/index";

import '../styles/PostUpdater.css';

function TitleUpdater({ onSubmitComment, titleText, text }) {
    let title, body;

    return (
        <div className="update">
            <form onSubmit={e => onSubmitComment(e, title, body)}>
                <textarea ref={node => title = node} defaultValue={titleText}/>
                <textarea ref={node => body = node} defaultValue={text}/>
                <input type="submit" />
            </form>
        </div>
    );
}

const mapDispatchToProps = (dispatch, { id, onFinishEdit }) => ({
    onSubmitComment: (e, title, body) => {
        e.preventDefault();
        const tVal = title.value;
        const bVal = body.value;

        if (tVal.trim() === '' || bVal.trim() === '')
            return;

        dispatch(updatePost(id, tVal, bVal));
        onFinishEdit(tVal, bVal);
    },
});

TitleUpdater.PropTypes = {
    postId: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    onFinishEdit: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(TitleUpdater);
