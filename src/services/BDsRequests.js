import axios from 'axios';
import store from '../redux';
import { token_not_found } from '../redux/actions';

const baseURL = 'https://discopedia-back.onrender.com/';

const instance = axios.create({
    baseURL,
});



export async function getDiscsUser(id) {
    const { token } = JSON.parse(localStorage.getItem('user'));
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: token
        }
    };
    
    const data = { id: id };
    const response = await instance.post('user/disc', data, config)
        .catch((error) => {
            console.log(error.response.data);
            const {message} = error.response.data;
            if (message === 'token not found' || message === 'Expired or invalid token' || message === 'Token must be a valid token') {
                store.dispatch(token_not_found);
            }
            return error.response;
        });
    return response;
}

export async function LoginFetch(email, senha) {
    const response = await instance
        .post('login', { email, senha })
        .catch((error) => {
            console.log(error);
            return error.response;
        });

    if (response.data.token) {
        const { data } = response;
        const { token } = data;
        instance.defaults.headers.Authorization = token;
        return response;
    }
    return response;
}

export async function createUser( nome, email, senha ) {
    const response = await instance
        .post('register', { nome, email, senha, discos: [] })
        .catch((error) => {
            console.log(error);
            return error.response;
        });

    if (response.data.token) {
        const { data } = response;
        const { token } = data;
        instance.defaults.headers.Authorization = token;
        return response;
    }
    return response;
}

export async function validateUser() {
    const { token } = JSON.parse(localStorage.getItem('user'));
    const response = await instance
        .get('/login/validate', { headers: { 'Content-Type': 'application/json', Authorization: token } })
        .catch((error) => {
            console.log(error);
            return error.response;
        });


    if (response.data.discos) {
        const { data } = response;
        const { discos } = data;
        return discos;
    }
    return response;
}


export async function UpdateDiscsUser( id, discId ) {
    const { token } = JSON.parse(localStorage.getItem('user'));
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: token
        }
    };
    
    const data = {
        id: id,
        diskId: discId
    };
    const response = await instance
        .put('user/disc', data, config)
        .catch((error) => {
            console.log(error);
            const {message} = error.response.data;
            if (message === 'token not found' || message === 'Expired or invalid token' || message === 'Token must be a valid token') {
                store.dispatch(token_not_found);
            }
            return error.response;
        });

    if (response.data.token) {
        const { data } = response;
        console.log(data);
        instance.defaults.headers.Authorization = token;
        return response;
    }
    return response;
}


export async function DeleteDiscsUser(discId) {

    const token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).token:  null;
    if (!token) return store.dispatch(token_not_found);
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: token
        }
    };
    
    const { id } = JSON.parse(localStorage.getItem('user'));
    const body = {id, diskId: discId};

    const response = await instance
        .put('user/discDelete', body, config)
        .catch((error) => {
            console.log(error); 
            const {message} = error.response.data;
            if (message === 'Token not found' || message === 'Expired or invalid token' || message === 'Token must be a valid token') {
                console.log(message);
                store.dispatch(token_not_found);
            }
            return error.response;
        });

    if (response.data.token) {
        const { data } = response;
        const { token } = data;
        instance.defaults.headers.Authorization = token;
        return response;
    }
    return response;
}

export async function UpdateDisc( id, disco ) {
    
    const { token } = JSON.parse(localStorage.getItem('user'));
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: token
        }
    };
    const data = { ...disco };
    const response = await instance
        .put(`disks/${id}`, data, config)
        .catch((error) => {
            console.log(error);
            const {message} = error.response.data;
            if (message === 'token not found' || message === 'Expired or invalid token' || message === 'Token must be a valid token') {
                store.dispatch(token_not_found);
            }
            return error.response;
        });
    return response;
}

export async function CreateDisc(disco ) {
    const { token } = JSON.parse(localStorage.getItem('user'));
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: token
        }
    };
    
    const data = { ...disco };
    const response = await instance
        .post('disks/', data, config)
        .catch((error) => {
            console.log(error);
            const {message} = error.response.data;
            if (message === 'token not found' || message === 'Expired or invalid token' || message === 'Token must be a valid token') {
                store.dispatch(token_not_found);
            }
            return error.response;
        });
    return response;
}
 

export async function getDiscs() {
    const { token } = JSON.parse(localStorage.getItem('user'));
    const response = await instance
        .get('disks', { headers: { 'Content-Type': 'application/json', Authorization: token } })
        .catch((error) => {
            console.log(error);
            const {message} = error.response.data;
            if (message === 'token not found' || message === 'Expired or invalid token' || message === 'Token must be a valid token') {
                store.dispatch(token_not_found);
            }
            return error.response.error;
        });
    return response;
}

export async function getDiscsForPaginations(page, limit) {
    
    const data = { page, limit };
    const { token } = JSON.parse(localStorage.getItem('user'));
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: token
        }
    };
    const response = await instance
        .post('/disks/pagination', data, config)
        .catch((error) => {
            console.log(error);
            const {message} = error.response.data;
            if (message === 'token not found' || message === 'Expired or invalid token' || message === 'Token must be a valid token') {
                store.dispatch(token_not_found);
            }
            return error.response;
        });
    return response;
}

export async function getDiscsBySearch(params) {
    const { token } = JSON.parse(localStorage.getItem('user'));
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: token
        }
    };
    
    const data = { params };
    const response = await instance
        .post('/disks/params', data, config)
        .catch((error) => {
            console.log(error);
            const {message} = error.response.data;
            if (message === 'token not found' || message === 'Expired or invalid token' || message === 'Token must be a valid token') {
                store.dispatch(token_not_found);
            }
            return error.response;
        });
    return response;
}





export async function getDiscsById(id) {
    const { token } = JSON.parse(localStorage.getItem('user'));
    const response = await instance
        .get(`disks/${id}`, { headers: { 'Content-Type': 'application/json', Authorization: token } })
        .catch((error) => {
            console.log(error.response.data);
            const {message} = error.response.data;
            if (message === 'token not found' || message === 'Expired or invalid token' || message === 'Token must be a valid token') {
                store.dispatch(token_not_found);
            }
            return error.response.error;
        });
    return response;
}

export async function deleteDiscs(id) {
    const { token } = JSON.parse(localStorage.getItem('user'));    
    const response = await instance
        .delete(`disks/${id}`, { headers: { 'Content-Type': 'application/json', Authorization: token } })
        .catch((error) => {
            console.log(error);
            const {message} = error.response.data;
            if (message === 'token not found' || message === 'Expired or invalid token' || message === 'Token must be a valid token') {
                store.dispatch(token_not_found);
            }
            return error.response.error;
        });
    return response;
}


export async function getUserId(email) {
    const { token } = JSON.parse(localStorage.getItem('user'));
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: token
        }
    };
    
    const data = { email };

    const response = await instance
        .post(
            'email',
            data,
            config
        )
        .catch((error) => {
            console.log(error);
            return error.response;
        });
    if (response.data.token) {
        instance.defaults.headers.Authorization = token;
        return response;
    }
    return response.data.id || response;
}
