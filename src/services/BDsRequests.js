import axios from 'axios';

const imageType = 'image/jpeg';

const baseURL = "https://radar-fit-backend.herokuapp.com/"

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
        .post('register', { nome, email, senha, role: 'Usuário' })
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


    if (response.data.role) {
        const { data } = response;
        const { role } = data;
        return role;
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

export async function UpdateProduct( id, product ) {
    console.log(product);
    const response = await instance
        .put(`produtos/${id}`, { ...product })
        .catch((error) => {
            console.log(error);
            return error.response;
        });
    return response;
}

export async function CreateProduct(product ) {
    console.log(product);
    const response = await instance
        .post('produtos/', { ...product })
        .catch((error) => {
            console.log(error);
            return error.response;
        });
    return response;
}
 

export async function getProducts() {
    const { token } = JSON.parse(localStorage.getItem('user'));
    const response = await instance
        .get('produtos', { headers: { 'Content-Type': imageType, Authorization: token } })
        .catch((error) => {
            console.log(error);
            return error.response.error;
        });
    return response;
}

export async function getProductsById(id) {
    const { token } = JSON.parse(localStorage.getItem('user'));
    const response = await instance
        .get(`produtos/${id}`, { headers: { 'Content-Type': imageType, Authorization: token } })
        .catch((error) => {
            console.log(error);
            return error.response.error;
        });
    return response;
}

export async function deleteProducts(id) {
    const { token } = JSON.parse(localStorage.getItem('user'));
    const response = await instance
        .delete(`produtos/${id}`, { headers: { 'Content-Type': imageType, Authorization: token } })
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
