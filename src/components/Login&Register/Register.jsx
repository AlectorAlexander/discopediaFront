import React, { useContext} from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Context from '../../context/Context';
import { createUser } from '../../services/BDsRequests';
import validate from '../../services/validates';

export default function Register() {
    const history = useNavigate();

    const { 
        name,
        setName,
        email,
        setEmail,
        password,
        errHomeMessage, 
        setErrHomeMessage,
        setPage,
        setPassword } = useContext(Context);


    const handleChangeName = ({target}) => setName(target.value);
    const handleChangeEmail = ({target}) => setEmail(target.value);
    const handleChangePassword = ({target}) => setPassword(target.value);

    const isButtonDisabled = () => (
        !validate.validateEmail(email)
    || !validate.validatePassword(password)
    || !validate.validateName(name)
    );

    function handleToRegister() {
        setErrHomeMessage(null);
        setPage('login');
    }

    async function handleSubmitRegister() {
        setErrHomeMessage(null);
        const magicNumberSim = 201;
        const conflict = 409;
        const response = await createUser(name, email, password );
        if(response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));}

        const { status } = response;
        if (status === magicNumberSim) {
            return history('/store');
        }

        if (status === conflict) {
            return setErrHomeMessage('Usuário já cadastrado');
        }

        return setErrHomeMessage('Dados inválidos');
    }

    return (
        <div className='d-flex justify-content-center mt-5'>
            <form className='form-login'>
                <Form.Control
                    placeholder="Seu nome"
                    onChange={ handleChangeName }
                    type="text"
                    value={ name }
                />
                <Form.Control
                    placeholder="Email"
                    data-testid="common_register__input-email"
                    onChange={ handleChangeEmail }
                    type="email"
                    value={ email }
                />
                <Form.Text className="text-dark">
          Nós nunca iremos compartilhar seu email com ninguém.
                </Form.Text>
                <input
                    placeholder="Password"
                    onChange={ handleChangePassword }
                    type="password"
                    value={ password }
                />
                <div id="buttons-login">
                    <Button
                        type="button"
                        className="buttonstrap"
                        onClick={ handleSubmitRegister }
                        disabled={ isButtonDisabled() }
                    >
          CADASTRAR
                    </Button>
                    <Button
                        type="button"
                        className="buttonstrap"
                        onClick={handleToRegister}
                    >
          LOGIN
                    </Button>
                    {errHomeMessage && (
                        <span
                        >
                            {errHomeMessage}
                        </span>
                    )}
                </div>
            </form>
        </div>
    );
}