const FormData = require('form-data');

const request = (slug, method, body) => new Request(`http://localhost:3001/${slug}`, {
    method,
    body,
    headers: new Headers({
        "Authorization": "Mobilpadde",
        "x-answer": 42,
        "x-be": "awesome",
    })
});

const getPosts = () => fetch(request(`posts`, 'get', null));
const getCategoryPosts = cat => fetch(request(`${cat}/posts`, 'get', null));
const getPost = id => fetch(request(`posts/${id}`, 'get', null));

const getComments = id => fetch(request(`posts/${id}/comments`, 'get', null));
const addComment = comment => fetch(request(`comments`, 'post', {...comment}));

export {
    getPost,
    getPosts,
    getCategoryPosts,

    getComments,
    addComment,
}