import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import '../styles/Title.css';

function Title(props){
    return <Link className="title" to={`/details/${props.id}`}>{props.title}</Link>;
}

Title.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};

export default Title;
