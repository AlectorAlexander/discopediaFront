import React, { useContext} from 'react';
import validate from '../services/validates';
import { useNavigate } from 'react-router-dom';
import { LoginFetch } from '../services/BDsRequests';
import { Form, Button, FormGroup } from 'react-bootstrap';
import Context from '../context/Context';

function Login() {
    const { 
        email,
        setEmail,
        password,
        errHomeMessage, 
        setErrHomeMessage,
        setPassword,
        setPage } = useContext(Context);
    const history = useNavigate();


    const handleEmail = ({ target }) => setEmail(target.value);
    const handlePassword = ({ target }) => setPassword(target.value);

    const isButtonDisabled = () => (
        !validate.validateEmail(email)
    || !validate.validatePassword(password)
    );

    const handleLogin = async () => {
        setErrHomeMessage(null);
        const magicNumberSim = 200;
        const response = await LoginFetch(email, password);
        if(response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));}

        const { status } = response;

        if (status === magicNumberSim) {
            return history('/products');
        }

        return setErrHomeMessage('Dados inválidos');
    };

    function handleToRegister() {
        setErrHomeMessage(null);
        setPage('register');
    }

    return (
        <div className='d-flex justify-content-center mt-5'>
            
            <FormGroup>
                
                <Form.Control
                    placeholder="Email"
                    onChange={handleEmail}
                    type="email"
                />
               
                <Form.Control
                    placeholder="Passoword"
                    onChange={handlePassword}
                    type="password"
                />
                <div className="buttons-login d-flex justify-content-around">
                    <Button
                        type="button"
                        className="w-25 m-2"
                        disabled={isButtonDisabled()}
                        onClick={handleLogin}
                    >
          LOGIN
                    </Button>
                    <Button
                        className="w-75 m-2"
                        type="button"
                        onClick={handleToRegister}
                    >
          Ainda não tenho conta
                    </Button>
                    {errHomeMessage && (
                        <span
                        >
                            {errHomeMessage}
                        </span>
                    )}
                    
                </div>
            </FormGroup>
        </div>
    );
}

export default Login;
