import types from '../actions';

const comments = (state = [], action) => {
    console.log(action);
    switch(action.type) {
        case types.addComment:
            return [
                ...state,
                {
                    parent: action.parent,
                    author: action.author,
                    body: action.body,
                }
            ];
        default:
            return state;
    }
};

export default comments;