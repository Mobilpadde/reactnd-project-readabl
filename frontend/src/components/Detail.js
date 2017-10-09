import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getPost, getComments } from "../util/Fetcher";

import Title from "./Title";
import Description from "./Description";
import Comment from "./Comment";
import Id from "./Id";
import Author from "./Author";
import Time from "./Time";
import Rating from "./Rating";
import Creator from './Creator';

import '../styles/Detail.css';

class Detail extends Component {
    state = {
        voteScore: null,
        timestamp: null,
        title: null,
        id: this.props.match.params.slug,
        author: null,
        body: null,
        comments: [],
    };

    componentWillMount() {
        const { slug } = this.props.match.params;

        getPost(slug)
            .then(res => res.json())
            .then(res => {
                this.setState(state => ({
                    ...state,
                    ...res,
                }));

                return true;
            })
            .then(_ => getComments(slug).then(res => res))
            .then(res => res.json())
            .then(res => {
                console.log(res);
                this.setState(state => ({
                    ...state,
                    comments: res,
                }))
            });
    }

    render() {
        let { voteScore, timestamp, title, id, author, body, comments, deleted } = this.state;

        return (
            <div className="detail">
                {voteScore && <Rating rating={voteScore}/>}
                {timestamp && <Time time={timestamp}/>}
                <br/>
                {title && <Title title={title}/>}
                {id && <Id id={id} />}
                {author && <Author author={author} />}
                {body && <Description text={body}/>}
                {comments && comments.length > 0 && comments.map(comment => <Comment key={comment.id} text={comment.body}/>)}
                {!deleted && <Creator />}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ...state,
    };
};

export default connect(mapStateToProps)(Detail);
