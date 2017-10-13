import React, { Component} from 'react';
import { connect } from 'react-redux';
import Trashcan from 'react-icons/lib/go/trashcan';
import Upvote from 'react-icons/lib/go/chevron-up';
import Downvote from 'react-icons/lib/go/chevron-down';

import Category from "./Category";
import Title from "./Title";
import Description from "./Description";
import Comment from "./Comment";
import Id from "./Id";
import Author from "./Author";
import Time from "./Time";
import Rating from "./Rating";
import CommentCreator from './CommentCreator';
import { getAllCommentsForPost, removePost } from "../actions";
import { upvotePost, downvotePost } from "../actions";

import '../styles/Detail.css';

class Detail extends Component {
    componentDidMount() {
        this.props.getComments(this.props.match.params.slug);
    }

    render() {
        const { onDelete, onUpvote, onDownvote } = this.props;
        const { post, comments, match, categories } = this.props;
        const { slug } = match.params;
        const { voteScore, timestamp, title, id, author, body, deleted } = post;

        return (
            <div className="detail">
                {<Category key='Home' category='Home' link='/' />}
                {categories && categories.map(c => <Category key={c.name} category={c.name}/>)}
                {
                    deleted === undefined ?
                        <span>404</span> :
                        <div>
                            <Upvote onClick={() => onUpvote(id)}/>
                            <Downvote onClick={() => onDownvote(id)}/>
                            {voteScore && <Rating rating={voteScore}/>}
                            {timestamp && <Time time={timestamp}/>}
                            <br/>
                            {title && <div><Title title={title} text={body} id={id}/> <Trashcan onClick={() => onDelete(id)}/></div>}
                            {id && <Id id={id} />}
                            {author && <Author author={author} />}
                            {body && <Description text={body}/>}
                            {
                                comments &&
                                comments.hasOwnProperty(slug) &&
                                comments[slug]
                                    .sort((a, b) => a.voteScore > b.voteScore ? 1 : -1)
                                    .map(comment => <Comment key={comment.id} id={comment.id} deleted={comment.deleted} text={comment.body}/>)
                            }
                            {!deleted && <CommentCreator postId={id} />}
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const post = state.posts.filter(post => post.id === ownProps.match.params.slug);

    return {
        post: post.length ? post.pop() : {},
        comments: {...state.comments},
        categories: [...state.categories],
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getComments: id => dispatch(getAllCommentsForPost(id)),
        onDelete: id => dispatch(removePost(id)),
        onUpvote: id => dispatch(upvotePost(id)),
        onDownvote: id => dispatch(downvotePost(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
