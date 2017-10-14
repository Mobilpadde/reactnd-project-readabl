import types from '../actions';

const comments = (state = [], action) => {
    switch(action.type) {
        case types.getComments:
            return {
                ...state,
                ...action.comments
            };

        case types.addComment:
            return state != [] ? Object.keys(state || []).map(id => ({
                    [id]: [
                        ...state[id],
                        ...action.comment[id],
                    ],
                })
            )[0] : action.comment;

        case types.updateComment:
            return Object.keys(state).map(parentId => {
                if (parentId === action.parentId) {
                    return {
                        [parentId]: state[parentId].map(c => {
                            if (c.id === action.id){
                                c.body = action.body;
                                c.timestamp = action.timestamp;
                            }

                            return c;
                        })
                    };
                }

                return parentId;
            })[0];

        case types.removeComment:
            return Object.keys(state).map(parentId => {
                if (parentId === action.parentId) {
                    return {
                        [parentId]: state[parentId].filter(c => c.id !== action.id)
                    };
                }

                return parentId;
            })[0];

        default:
            return state;
    }
};

export default comments;