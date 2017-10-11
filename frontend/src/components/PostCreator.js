import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addPost } from "../actions/index";

import '../styles/PostCreator.css';

function PostCreator({ onSubmitPost, author, categories }) {
    let title, body, category;

    return (
        <div className="create">
            <form onSubmit={e => onSubmitPost(e, title, body, category)}>
                <textarea ref={node => title = node} />
                <textarea className='middle' ref={node => body = node}/>
                <input type="submit" />
                <span>Posting as {author}</span>
                <select ref={node => category = node}>
                    {categories.map(o => <option key={o.name} value={o.name}>{o.name}</option>)}
                </select>
            </form>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        categories: [...state.categories],
    };
};

const mapDispatchToProps = (dispatch, { author }) => ({
    onSubmitPost: (e, title, body, category) => {
        e.preventDefault();
        const tVal = title.value;
        const bVal = body.value;
        const cVal = category.value;
        console.log(tVal, bVal, cVal, author);

        if (tVal.trim() === '' || bVal.trim() === '')
            return;

        dispatch(addPost(tVal, bVal, cVal, author));
    },
});

PostCreator.PropTypes = {
    author: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostCreator);
