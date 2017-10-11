import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Quote from 'react-icons/lib/go/quote';
import Trashcan from 'react-icons/lib/go/trashcan';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import CommentUpdater from './CommentUpdater';
import { removeCommentFromPost } from "../actions/index";

import '../styles/Comment.css';

class Comment extends Component {
    state = {
        edit: false,
    };

    componentDidMount() {
        this.setState({
            text: this.props.text,
        });

        const elm = ReactDOM.findDOMNode(this);
        elm.ondblclick = () => this.setState({
            edit: true,
        });
    }

    render() {
        const { id, onDelete, deleted } = this.props;
        let { edit, text } = this.state;

        return (
            <div className={classNames('comment', { deleted })}>
                <Modal isOpen={edit}>
                    <CommentUpdater text={text} id={id} onFinishEdit={text => this.setState({ edit: false, text, })}/>
                </Modal>
                <Quote/>
                <p>{text} <Trashcan onClick={() => onDelete(id)}/></p>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    onDelete: id => dispatch(removeCommentFromPost(id)),
});

Comment.propTypes = {
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
};

export default connect(null, mapDispatchToProps)(Comment);
