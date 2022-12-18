const MINIMUN_LENGTH_PASSWORD = 6;
const MINIMUN_LENGTH_NAME = 3;

const register = {
    validateEmail: (email) => (/(.+)@(.+){2,}\.(.+){2,}/.test(email)),
    validatePassword: (password) => (password.length >= MINIMUN_LENGTH_PASSWORD),
    validateName: (name) => (name.length >= MINIMUN_LENGTH_NAME),
};

export default register;