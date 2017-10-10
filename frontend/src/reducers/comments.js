import types from '../actions';

const comments = (state = [], action) => {
    switch(action.type) {
        case types.getComments:
            return {
                ...state,
                ...action.comments
            };

        case types.addComment:
            console.log(Object.keys(state).map(id => ({
                [id]: [
                    ...state[id],
                    ...action.comment[id],
                ],
            }))[0]);
            return Object.keys(state).map(id => ({
                    [id]: [
                        ...state[id],
                        ...action.comment[id],
                    ],
                })
            )[0];

        default:
            return state;
    }
};

export default comments;