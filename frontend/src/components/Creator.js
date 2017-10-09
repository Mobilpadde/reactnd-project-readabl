import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from "../actions/index";

import '../styles/Creator.css';

class Creator extends Component {
    render() {
        let body;

        return (
            <div className="create">
                <form onSubmit={e => this.props.onSubmitComment(e, body)}>
                    <textarea ref={node => body = node}></textarea>
                    <input type="submit" />
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    onSubmitComment: (e, body) => {
        e.preventDefault();
        let { value } = body;

        if (value.trim() === '')
            return;

        dispatch(addComment('8xf0y6ziyjabvozdd253nd', 'Mobilpadde', value));
        body.value = '';
    },
});

Creator = connect(null, mapDispatchToProps)(Creator);

Creator.PropTypes = {

};

export default Creator;
