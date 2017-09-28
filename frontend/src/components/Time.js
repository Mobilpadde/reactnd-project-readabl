import React from 'react';
import Clock from 'react-icons/lib/go/clock';
import PropTypes from 'prop-types';
import moment from 'moment';

import '../styles/Time.css';

const Time = props => (
    <div className="time">
        <div>
            <Clock />
            <span>{moment(props.time).fromNow()}</span>
        </div>
    </div>
);

Time.propTypes = {
    time: PropTypes.number.isRequired,
};

export default Time;
