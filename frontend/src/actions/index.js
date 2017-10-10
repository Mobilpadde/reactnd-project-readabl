import uuidv5 from 'uuid/v5';

import * as api from "../util/Fetcher";

const types = {
    getPosts: 'GET_POSTS',
    getComments: 'GET_COMMENTS',
    getPost: 'GET_POST',
    getComment: 'GET_COMMENT',
    addComment: 'ADD_COMMENT',
    addPost: 'ADD_POST',
    removeComment: 'REMOVE_COMMENT',
    removePost: 'REMOVE_POST',
    updateComment: 'UPDATE_COMMENT',
    updatePost: 'UPDATE_POST'
};

const getAllPostsAction = posts => ({
    type: types.getPosts,
    posts,
});
const getAllPosts = () => dispatch => {
    api.getPosts()
        .then(res => res.json())
        // TODO: Remove this
        .then(res => {
            res.forEach(post => {
                api.getComments(post.id)
                    .then(c => c.json())
                    .then(c => {post.commentsNum = c.length})
                    .catch(console.error);
            });

            return res;
        })
        .then(res => dispatch(getAllPostsAction(res)))
        .catch(console.error);
};

const getCommentsForPostAction = comments => {
    return {
        type: types.getComments,
        comments,
    }
};
const getAllCommentsForPost = postId => {
    return dispatch => {
        api.getComments(postId)
            .then(c => c.json())
            .then(res => ({
                [postId]: [...res]
            }))
            .then(res => dispatch(getCommentsForPostAction(res)))
            .catch(console.error);
    };
};

const addCommentForPostAction = comment => {
    return {
        type: types.addComment,
        comment,
    };
};

const addCommentForPost = (parentId, body, author) => {
    const timestamp = Date.now();
    const id = uuidv5(timestamp.toString(), uuidv5.URL);

    return dispatch => {
        return api.addComment({
            id,
            author,
            body,
            parentId,
            timestamp,

        }).then(_ => dispatch(addCommentForPostAction({
            [parentId]: [{
                author,
                body,
                parentId,
                id,
                deleted: false,
                parentDeleted: false,
                timestamp,
                voteScore: 0,
            }],
        })));
    }
};

export default types;
export {
    getAllPosts,
    getAllPostsAction,

    getAllCommentsForPost,

    getCommentsForPostAction,

    addCommentForPost,
}