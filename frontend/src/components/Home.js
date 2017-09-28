import React, { Component } from 'react';

import { getPosts, getCategoryPosts, getComments } from "../util/Fetcher";
import Title from "./Title";
import Rating from "./Rating";
import Comments from './Comments';
import Time from "./Time";
import Author from "./Author";
import Category from "./Category";

import '../styles/Home.css';

// TODO: If category is specified, show that, and that only
class Home extends Component {
    state = {
        posts: [],
    };

    componentWillMount() {
        const toCall = this.props.category === null ? getCategoryPosts : getPosts;

        toCall.apply(this)
            .then(res => res.json())
            .then(res => {
                res.forEach(post => {
                    getComments(post.id)
                        .then(c => c.json())
                        .then(c => {post.comments = c.length});
                });

                this.setState(state => ({
                    posts: state.posts.concat(res),
                }));
            });
    }

    render() {
        let { posts } = this.state;

        return (
            <div className="home">
                {posts && posts.map(post => {
                    let { voteScore, timestamp, title, id, author, comments, category } = post;
                    console.log(post, comments, post.comments);

                    return (
                        <div key={id}>
                            {voteScore && <Rating rating={voteScore}/>}
                            {title && <Title id={id} title={title}/>}
                            {author && <Author author={author}/>}
                            {comments && <Comments num={1}/>}
                            {timestamp && <Time time={timestamp} />}
                            {category && <Category category={category} />}
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default Home;
