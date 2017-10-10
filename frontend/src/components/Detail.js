import React, { Component} from 'react';
import { connect } from 'react-redux';

import Title from "./Title";
import Description from "./Description";
import Comment from "./Comment";
import Id from "./Id";
import Author from "./Author";
import Time from "./Time";
import Rating from "./Rating";
import Creator from './Creator';
import { getAllCommentsForPost } from "../actions";

import '../styles/Detail.css';

class Detail extends Component {
    componentDidMount() {
        this.props.getComments(this.props.match.params.slug);
    }

    render() {
        const { post, comments, match } = this.props;
        const { slug } = match.params;
        const { voteScore, timestamp, title, id, author, body, deleted } = post;

        return (
            <div className="detail">
                {voteScore && <Rating rating={voteScore}/>}
                {timestamp && <Time time={timestamp}/>}
                <br/>
                {title && <Title title={title}/>}
                {id && <Id id={id} />}
                {author && <Author author={author} />}
                {body && <Description text={body}/>}
                {comments && comments.hasOwnProperty(slug) && comments[slug].map(comment => <Comment key={comment.id} text={comment.body}/>)}
                {!deleted && <Creator />}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const post = state.posts.filter(post => post.id === ownProps.match.params.slug);

    return {
        post: post.length ? post.shift() : {},
        comments: {...state.comments},
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getComments: id => dispatch(getAllCommentsForPost(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
