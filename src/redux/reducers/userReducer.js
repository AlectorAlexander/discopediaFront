const INITIAL_STATE = {
    warning: '',
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
    default:
        return state;
    }
};

export default userReducer;