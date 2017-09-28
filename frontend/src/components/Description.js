import React from 'react';

import '../styles/Home.css';

function Description(props){
    return (
        <h2 className="desc">{props.text}</h2>
    );
}

export default Description;
