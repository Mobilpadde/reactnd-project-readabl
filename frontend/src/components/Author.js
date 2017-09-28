import React from 'react';
import Person from 'react-icons/lib/go/person';
import PropTypes from 'prop-types';

import '../styles/Author.css';

const Author = props => (
    <div className="author">
        <div>
            <Person/>
            <span>{props.author}</span>
        </div>
    </div>
);

Author.propTypes = {
    author: PropTypes.string.isRequired,
};

export default Author;
