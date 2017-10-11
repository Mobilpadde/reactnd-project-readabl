import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import Title from "./Title";
import Rating from "./Rating";
import Comments from './Comments';
import Time from "./Time";
import Author from "./Author";
import Category from "./Category";
import PostCreator from "./PostCreator";

import '../styles/Home.css';

class Home extends Component {
    state = {
        orderBy: 'voteScore',
        asc: false,
    };

    render() {
        const { posts, categories, match } = this.props;
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
                {categories && categories.map(c => <Category key={c.name} category={c.name}/>)}
                {
                    posts && posts
                        .filter(p => catId != null ? p.category === catId : true)
                        .sort((a, b) => parseInt(a[orderBy]) > parseInt(b[orderBy]) ? (asc ? -1 : 1) : (!asc ? 1 : -1))
                        .map(post => {
                            const { voteScore, timestamp, title, id, author, commentsNum, category } = post;

                            return (
                                <div key={id}>
                                    {voteScore && <Rating rating={voteScore}/>}
                                    {title && <Title small={true} id={id} title={title}/>}
                                    {author && <Author author={author}/>}
                                    {<Comments num={commentsNum || 0}/>}
                                    {timestamp && <Time time={timestamp} />}
                                    {category && <Category category={category} />}
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

export default connect(mapStateToProps)(Home);
