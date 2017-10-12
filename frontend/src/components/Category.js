import React from 'react';
import GitMerge from 'react-icons/lib/go/git-merge';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import '../styles/Category.css';

const Category = ({ link, category }) => (
    <div className="category">
        <div>
            <GitMerge/>
            <Link to={link ? link : `/category/${category}`}>{category}</Link>
        </div>
    </div>
);

Category.propTypes = {
    category: PropTypes.string.isRequired,
    link: PropTypes.string,
};

export default Category;
