import uuidv5 from 'uuid/v5';

import * as api from "../util/Fetcher";

const types = {
    getCategories: 'GET_CATEGORIES',
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

const getCategoriesAction = categories => ({
    type: types.getCategories,
    ...categories,
});
const getCategories = () => dispatch => {
    api.getCategories()
        .then(res => res.json())
        .then(res => dispatch(getCategoriesAction(res)))
        .catch(console.error);
};

const getAllPostsAction = posts => ({
    type: types.getPosts,
    posts,
});
const getAllPosts = () => dispatch => {
    api.getPosts()
        .then(res => res.json())
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

const updatePostAction = post => ({
    type: types.updatePost,
    post,
});
const updatePost = (id, title, body) => {
    return dispatch => {
        api.updatePost(id, {
            title,
            body,
        }).then(() => dispatch(updatePostAction({
            title,
            body,
        }))).catch(console.error);
    }
};

const addPostAction = post => ({
    type: types.addPost,
    post,
});
const addPost = (title, body, category, author) => {
    const timestamp = Date.now();
    const id = uuidv5(timestamp.toString(), uuidv5.URL);
    return dispatch => {
        api.addPost({
            id,
            timestamp,
            title,
            body,
            category,
            author,
        })
            .then(res => dispatch(updatePostAction(res)))
            .catch(console.error);
    }
};

const removePostAction = (id, parentId) => ({
    type: types.removeComment,
    id,
    parentId
});
const removePost = id => {
    return dispatch => {
        api.deletePost(id)
            .then(res => res.json())
            .then(res => dispatch(removePostAction(res.id, res.parentId)))
            .catch(console.error);
    };
};

const getCommentsForPostAction = comments => {
    return {
        type: types.getComments,
        comments,
    }
};
const getAllCommentsForPost = (postId, stater) => {
    return dispatch => {
        api.getComments(postId)
            .then(c => c.json())
            .then(res => ({
                [postId]: [...res],
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

const updateCommentOnPost = (id, body) => {
    const timestamp = Date.now();

    return dispatch => {
        return api.updateComment(id, {
            body,
            timestamp,
        })
            .then(console.log)
            .catch(console.error);
    }
};

const removeCommentFromPostAction = (id, parentId) => ({
    type: types.removeComment,
    id,
    parentId
});
const removeCommentFromPost = id => {
    return dispatch => {
        api.deleteComment(id)
            .then(res => res.json())
            .then(res => dispatch(removeCommentFromPostAction(res.id, res.parentId)))
            .catch(console.error);
    };
};

export default types;
export {
    getCategories,

    getAllPosts,
    getAllPostsAction,

    addPost,
    updatePost,
    removePost,

    getAllCommentsForPost,

    getCommentsForPostAction,

    addCommentForPost,
    updateCommentOnPost,
    removeCommentFromPost,
}