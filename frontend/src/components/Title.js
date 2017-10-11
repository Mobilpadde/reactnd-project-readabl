import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import PostUpdater from './PostUpdater';

import '../styles/Title.css';

class Title extends Component {
    state = {
        edit: false,
    };

    componentDidMount() {
        this.setState({
            title: this.props.title,
            text: this.props.text,
        });

        const elm = ReactDOM.findDOMNode(this);
        elm.ondblclick = () => this.setState({
            edit: true,
        });
    }

    render() {
        const { small, id } = this.props;
        let { edit, title, text } = this.state;

        if (small || false) {
            return <Link className="title" to={`/details/${id}`}>{title}</Link>;
        }

        return (
            <span className="title">
                <Modal isOpen={edit}>
                    <PostUpdater titleText={title} text={text} id={id} onFinishEdit={title => this.setState({ edit: false, title })}/>
                </Modal>
                {title}
            </span>
        );
    }
}

Title.propTypes = {
    small: PropTypes.bool,
    id: PropTypes.string,
    title: PropTypes.string.isRequired,
};

export default Title;
