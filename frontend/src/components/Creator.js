import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addCommentForPost } from "../actions/index";

import '../styles/Creator.css';

function Creator({ onSubmitComment }) {
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

const mapDispatchToProps = dispatch => ({
    onSubmitComment: (e, body) => {
        e.preventDefault();
        let { value } = body;

        if (value.trim() === '')
            return;

        dispatch(addCommentForPost('8xf0y6ziyjabvozdd253nd', value, 'Mobilpadde'));
        body.value = '';
    },
});

Creator.PropTypes = {

};

export default connect(null, mapDispatchToProps)(Creator);
