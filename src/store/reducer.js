import * as actionType from './action'

const initialState = {
    currentUser: null,
    activePost: null,
    roles: [],
    categories: [],
    posts: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.GET_POSTS:
            return { ...state, posts: action.posts }
        case actionType.GET_ROLES:
            return { ...state, roles: action.roles }
        case actionType.GET_CATEGORIES:
            return { ...state, categories: action.categories }
        case actionType.OPEN_POST:
            return { ...state, activePost: action.post }
        case actionType.EXIT_POST:
            return { ...state, activePost: null }
        case actionType.LOGIN:
            return { ...state, currentUser: action.user }
        case actionType.LOGOUT:
            return { ...state, currentUser: null }
        default:
            return state;
    }
};

export default reducer;