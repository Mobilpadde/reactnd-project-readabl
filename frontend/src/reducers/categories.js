import types from '../actions';

const categories = (state = [], action) => {
    switch(action.type) {
        case types.getCategories:
            return [
                ...state,
                ...action.categories
            ];

        default:
            return state;
    }
};

export default categories;