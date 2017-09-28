import React from 'react';
import GitMerge from 'react-icons/lib/go/git-merge';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import '../styles/Category.css';

const Category = props => (
    <div className="category">
        <div>
            <GitMerge/>
            <Link to={`/category/${props.category}`}>{props.category}</Link>
        </div>
    </div>
);

Category.propTypes = {
    category: PropTypes.string.isRequired,
};

export default Category;
