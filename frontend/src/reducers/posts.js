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
                action.post
            ];

        case types.removePost:
            return [...state].filter(p => p.id !== action.id);

        case types.updatePost:
            return [...state].filter(p => p.id !== action.id).concat([action.post]);

        case types.addPost:
            return [
                ...state,
                action.post,
            ];

        default:
            return state;
    }
};

export default posts;