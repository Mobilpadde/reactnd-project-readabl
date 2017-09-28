const request = slug => new Request(`http://localhost:3001/${slug}`, {
    headers: new Headers({
        "Authorization": "Mobilpadde",
        "x-answer": 42,
        "x-be": "awesome",
    })
});

const getPosts = () => fetch(request(`posts`));
const getCategoryPosts = cat => fetch(request(`${cat}/posts`));
const getPost = id => fetch(request(`posts/${id}`));

const getComments = id => fetch(request(`posts/${id}/comments`));

export {
    getPost,
    getPosts,
    getCategoryPosts,

    getComments,
}