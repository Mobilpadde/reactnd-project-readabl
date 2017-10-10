import types from '../actions';

const posts = (state = [], action) => {
    switch(action.type) {
        case types.getPosts:
            return [
                ...state,
                ...action.posts
            ];

        case types.getPost:
            return [
                ...state,
                ...action.post
            ];

        default:
            return state;
    }
};

export default posts;