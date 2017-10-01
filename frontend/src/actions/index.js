import uuidv5 from 'uuid/v5';

const types = {
    addComment: 'ADD_COMMENT',
    addPost: 'ADD_POST',
    removeComment: 'REMOVE_COMMENT',
    removePost: 'REMOVE_POST',
    updateComment: 'UPDATE_COMMENT',
    updatePost: 'UPDATE_POST'
};

const addComment = (parent, author, body) => {
    return {
        [parent]: {
            type: types.addComment,
            patentId: parent,
            id: uuidv5.URL,
            body,
            author,
            timestamp: Date.now(),
            voteScore: 1,
            deleted: false,
            parentDeleted: false,
        }
    }
};

export default types;
export {
    addComment,
}