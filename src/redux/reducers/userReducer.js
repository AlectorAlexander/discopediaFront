
const INITIAL_STATE = {
    warning: '',
    no_token: true
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
            no_token: false
        };
    case 'token_not_found':
        return {
            ...state,
            no_token: true 
        };
    default:
        return state;
    }
};

export default userReducer;