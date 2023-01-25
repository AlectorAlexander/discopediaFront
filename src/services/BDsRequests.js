import axios from 'axios';

const imageType = 'image/jpeg';

const baseURL = 'http://localhost:3001/';

const instance = axios.create({
    baseURL,
});

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
        .get('/login/validate', { headers: { 'Content-Type': imageType, Authorization: token } })
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

export async function UpdateDocumentUser( id, document ) {
    const response = await instance
        .put(`users/${id}`, { id, document })
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

export async function UpdateDiscsUser( id, discId ) {
    const response = await instance
        .put('users', { id, diskId: discId })
        .catch((error) => {
            console.log(error);
            return error.response;
        });

    if (response.data.token) {
        const { data } = response;
        const { token } = data;
        console.log(data);
        instance.defaults.headers.Authorization = token;
        return response;
    }
    return response;
}

export async function UpdateDisc( id, disco ) {
    console.log(disco);
    const response = await instance
        .put(`disks/${id}`, { ...disco })
        .catch((error) => {
            console.log(error);
            return error.response;
        });
    return response;
}

export async function CreateDisc(disco ) {
    const response = await instance
        .post('disks/', { ...disco })
        .catch((error) => {
            console.log(error);
            return error.response;
        });
    return response;
}
 

export async function getDiscs() {
    const { token } = JSON.parse(localStorage.getItem('user'));
    const response = await instance
        .get('disks', { headers: { 'Content-Type': imageType, Authorization: token } })
        .catch((error) => {
            console.log(error);
            return error.response.error;
        });
    return response;
}

export async function getDiscsUser() {
    const {  id } = JSON.parse(localStorage.getItem('user'));
    const response = await instance
        .post('user/disc', {id})
        .catch((error) => {
            console.log(error);
            return error.response.error;
        });
    console.log(response);
    return response;
}

export async function getDiscsById(id) {
    const { token } = JSON.parse(localStorage.getItem('user'));
    const response = await instance
        .get(`disks/${id}`, { headers: { 'Content-Type': imageType, Authorization: token } })
        .catch((error) => {
            console.log(error);
            return error.response.error;
        });
    return response;
}

export async function deleteDiscs(id) {
    const { token } = JSON.parse(localStorage.getItem('user'));
    const response = await instance
        .delete(`disks/${id}`, { headers: { 'Content-Type': imageType, Authorization: token } })
        .catch((error) => {
            console.log(error);
            return error.response.error;
        });
    return response;
}


export async function getSalesById(id) {
    const { token } = JSON.parse(localStorage.getItem('user'));
    const response = await instance
        .get(`sales/${id}`, { headers: { 'Content-Type': imageType, Authorization: token } })
        .catch((error) => {
            console.log(error);
            return error.response.error;
        });
    return response;
}

export async function getUserId(email) {
    const { token } = JSON.parse(localStorage.getItem('user'));
    const response = await instance
        .post(
            'email',
            { email },
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



export async function createSales(userId, cellId) {
    const { token } = JSON.parse(localStorage.getItem('user'));
    instance.defaults.headers.Authorization = token;
    const body = {userId, cellId};
    const response = await instance
        .post(
            'sales',
            body,
        )
        .catch((error) => {
            console.log(error);
            console.log(body);
            return error.response;
        });

    return response;
}
