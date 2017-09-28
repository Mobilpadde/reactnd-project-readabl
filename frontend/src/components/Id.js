import React from 'react';
import Mention from 'react-icons/lib/go/mention';
import PropTypes from 'prop-types';

import '../styles/Id.css';

const Id = props => (
    <div className="id">
        <div>
            <Mention/>
            <span>{props.id}</span>
        </div>
    </div>
);

Id.propTypes = {
    id: PropTypes.string.isRequired,
};

export default Id;
