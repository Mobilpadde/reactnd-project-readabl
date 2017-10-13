import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Upvote from 'react-icons/lib/go/chevron-up';
import Downvote from 'react-icons/lib/go/chevron-down';
import Trashcan from 'react-icons/lib/go/trashcan';

import Title from "./Title";
import Rating from "./Rating";
import Comments from './Comments';
import Time from "./Time";
import Author from "./Author";
import Category from "./Category";
import PostCreator from "./PostCreator";
import { removePost, upvotePost, downvotePost } from "../actions";

import '../styles/Home.css';

class Home extends Component {
    state = {
        orderBy: 'voteScore',
        asc: false,
    };

    render() {
        const { posts, categories, match, onUpvote, onDownvote, onDelete } = this.props;
        const { catId } = match.params;
        let { orderBy, asc } = this.state;

        return (
            <div className={classNames('home', { 'asCategory': catId != null })}>
                <select onChange={e => this.setState({ orderBy: e.target.value })}>
                    {['voteScore', 'timestamp', 'title', 'id', 'author', 'commentsNum', 'category'].map(o => <option key={o} value={o}>{o}</option>)}
                </select>
                <select onChange={e => this.setState({ asc: e.target.value === 'true' })}>
                    {[{ caption: 'ASC', bool: true }, { caption: 'DSC', bool: false }].map(o => <option key={o.caption} value={o.bool}>{o.caption}</option>)}
                </select>
                {<Category key='Home' category='Home' link='/' />}
                {categories && categories.map(c => <Category key={c.name} category={c.name}/>)}
                {
                    posts && posts
                        .filter(p => catId != null ? p.category === catId : true)
                        .sort((a, b) => parseInt(a[orderBy]) > parseInt(b[orderBy]) ? (asc ? -1 : 1) : (!asc ? 1 : -1))
                        .map(post => {
                            const { voteScore, timestamp, title, id, author, commentsNum, category, body } = post;

                            return (
                                <div key={id}>
                                    {voteScore && <Rating rating={voteScore}/>}
                                    {title && <div><Title small={true} id={id} title={title} text={body}/> <Trashcan onClick={() => onDelete(id)}/></div>}
                                    {author && <Author author={author}/>}
                                    {<Comments num={commentsNum || 0}/>}
                                    {timestamp && <Time time={timestamp} />}
                                    {category && <Category category={category} />}
                                    <Upvote onClick={() => onUpvote(id)}/>
                                    <Downvote onClick={() => onDownvote(id)}/>
                                </div>
                            );
                        })
                }
                <PostCreator author='Mobilpadde'/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        posts: [...state.posts],
        categories: [...state.categories],
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onDelete: id => dispatch(removePost(id)),
        onUpvote: id => dispatch(upvotePost(id)),
        onDownvote: id => dispatch(downvotePost(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
