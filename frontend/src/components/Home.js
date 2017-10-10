import React from 'react';
import { connect } from 'react-redux';

import Title from "./Title";
import Rating from "./Rating";
import Comments from './Comments';
import Time from "./Time";
import Author from "./Author";
import Category from "./Category";

import '../styles/Home.css';

// TODO: If category is specified, show that, and that only
function Home({ posts }) {
    return (
        <div className="home">
            {posts && posts.map(post => {
                const { voteScore, timestamp, title, id, author, commentsNum, category } = post;

                return (
                    <div key={id}>
                        {voteScore && <Rating rating={voteScore}/>}
                        {title && <Title id={id} title={title}/>}
                        {author && <Author author={author}/>}
                        {<Comments num={commentsNum || 0}/>}
                        {timestamp && <Time time={timestamp} />}
                        {category && <Category category={category} />}
                    </div>
                );
            })}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        posts: [...state.posts],
    };
};

export default connect(mapStateToProps)(Home);
