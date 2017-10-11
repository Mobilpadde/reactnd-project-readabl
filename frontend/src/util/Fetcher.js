const request = (slug, method, body) => new Request(`http://localhost:3001/${slug}`, {
    method,
    body,
    headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": "Mobilpadde",
        "x-answer": 42,
        "x-be": "awesome",
    })
});

const getCategories = () => fetch(request(`categories`, 'get', null));

const getPosts = () => fetch(request(`posts`, 'get', null));
const getPost = id => fetch(request(`posts/${id}`, 'get', null));
const addPost = post => fetch(request(`posts`, 'post', JSON.stringify(post)));
const updatePost = (id, post) => fetch(request(`posts/${id}`, 'put', JSON.stringify(post)));
const deletePost = id => fetch(request(`posts/${id}`, 'delete', null));

const getComments = id => fetch(request(`posts/${id}/comments`, 'get', null));
const addComment = comment => fetch(request(`comments`, 'post', JSON.stringify(comment)));
const updateComment = (id, comment) => fetch(request(`comments/${id}`, 'put', JSON.stringify(comment)));
const deleteComment = id => fetch(request(`comments/${id}`, 'delete', null));

export {
    getCategories,

    getPosts,
    getPost,
    addPost,
    updatePost,
    deletePost,

    getComments,
    addComment,
    updateComment,
    deleteComment,
}