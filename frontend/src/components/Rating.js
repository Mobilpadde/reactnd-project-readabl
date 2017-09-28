import React from 'react';
import PropTypes from 'prop-types';

import '../styles/Rating.css';

function Rating(props){
    return <h1 className="rating">{props.rating}</h1>;
}

Rating.propTypes = {
    rating: PropTypes.number.isRequired,
};

export default Rating;
