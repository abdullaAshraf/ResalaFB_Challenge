import axios from 'axios'

export const GET_POSTS = 'GET_POSTS'
export const GET_CATEGORIES = 'GET_CATEGORIES'
export const GET_ROLES = 'GET_ROLES'
export const EXIT_POST = 'EXIT_POST'
export const OPEN_POST = 'OPEN_POST'
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

export const login = (credentials) => {
    let user = {
        name: "Abdulla",
        email: "aabdulla.ashraf@gmail.com",
        roles: "4",
    }

    return {
        type: LOGIN,
        user: user
    }
}

export const logout = () => {
    return {
        type: LOGOUT,
    }
}

export const register = (userData) => {
    let user = {
        name: "Abdulla",
        email: "aabdulla.ashraf@gmail.com",
        roles: "4"
    }
    return {
        type: LOGIN,
        user: user
    }
}

export const setPosts = (res) => {
    const data = res.results.map(post => {
        post.notes = stringToJsonArray(post.notes);
        post.assignedRoles = stringToJsonArray(post.assignedRoles);
        return post;
    });
    return {
        type: GET_POSTS,
        posts: data
    }
}

export const setRoles = (res) => {
    return {
        type: GET_ROLES,
        roles: res.results
    }
}

export const setCategories = (res) => {
    let categories = res.results;
    categories.push({ url: 'https://resala-group.herokuapp.com/categories/1000/', name: 'All' });
    categories.push({ url: 'https://resala-group.herokuapp.com/categories/1001/', name: 'New' });
    categories.push({ url: 'https://resala-group.herokuapp.com/categories/1002/', name: 'Spam' });
    categories.push({ url: 'https://resala-group.herokuapp.com/categories/1003/', name: 'Trash' });
    return {
        type: GET_CATEGORIES,
        categories: categories
    }
}

export const addRole = (roleName) => {
    const role = {
        "name": roleName,
        "readCategories": '',
        "writeCategories": '',
        "acceptMembers": false,
        "modifyRoles": false,
        "rank": 0
    }
    return dispatch => {
        axios.post('/roles/', role)
            .then(res => {
                console.log(res);
                dispatch(getRoles())
            })
            .catch(err => console.log(err));
    }
}

export const deleteRole = (role) => {
    return dispatch => {
        axios.delete(role.url)
            .then(res => {
                console.log(res);
                dispatch(getRoles())
            })
            .catch(err => console.log(err));
    }
}

export const updateRole = (role) => {
    return dispatch => {
        axios.put(role.url, role)
            .then(res => {
                console.log(res);
                dispatch(getRoles())
            })
            .catch(err => console.log(err));
    }
}

export const updatePost = (post) => {
    post.notes = JSON.stringify(post.notes);
    post.assignedRoles = JSON.stringify(post.assignedRoles);
    return dispatch => {
        axios.put(post.url, post)
            .then(res => {
                console.log(res);
                dispatch(getPosts())
            })
            .catch(err => console.log(err));
    }
}

export const deletePost = (post) => {
    return dispatch => {
        dispatch({ type: EXIT_POST });
        if (!post.deleted) {
            let newPost = { ...post };
            newPost.deleted = true;
            dispatch(updatePost(newPost));
        }
    }
}

export const openPost = (post) => {
    return dispatch => {
        dispatch({ type: OPEN_POST, post: post });
        if (!post.seen) {
            let newPost = { ...post };
            newPost.seen = true;
            dispatch(updatePost(newPost));
        }
    }
}

export const getPosts = () => {
    return dispatch => {
        axios.get('/posts/')
            .then(res => dispatch(setPosts(res.data)))
            .catch(err => console.log(err));
    }
}


export const getRoles = () => {
    return dispatch => {
        axios.get('/roles/')
            .then(res => dispatch(setRoles(res.data)))
            .catch(err => console.log(err));
    }
}

export const getCategories = () => {
    return dispatch => {
        axios.get('/categories/')
            .then(res => dispatch(setCategories(res.data)))
            .catch(err => console.log(err));
    }
}

const stringToJsonArray = (str) => {
    try {
        return JSON.parse(str);
    } catch (e) {
        return [];
    }
}