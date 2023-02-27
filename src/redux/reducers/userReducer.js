
const INITIAL_STATE = {
    warning: '',
    token: false
};

const userReducer = (state= INITIAL_STATE, action) => {
    switch (action.type){
    case 'User_did_search':
        return {
            ...state,
            warning: action.message 
        };
    case 'User_did_NOT_search':
        return {
            ...state,
            warning: '' 
        };
    case 'token_found':
        return {
            ...state,
            token: true
        };
    case 'token_not_found':
        return {
            ...state,
            token: false 
        };
    default:
        return state;
    }
};

export default userReducer;