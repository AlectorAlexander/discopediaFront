import React, { useContext} from 'react';
import { Form, Button, FormGroup } from 'react-bootstrap';
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
        setPassword } = useContext(Context);


    const handleChangeName = ({target}) => setName(target.value);
    const handleChangeEmail = ({target}) => setEmail(target.value);
    const handleChangePassword = ({target}) => setPassword(target.value);

    const isButtonDisabled = () => (
        !validate.validateEmail(email)
    || !validate.validatePassword(password)
    || !validate.validateName(name)
    );

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
            <FormGroup>
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
                <Form.Text className="text-muted">
          Nós nunca iremos compartilhar seu email com ninguém.
                </Form.Text>
                <Form.Control
                    placeholder="Password"
                    onChange={ handleChangePassword }
                    type="password"
                    value={ password }
                />
                <div id="buttons-login">
                    <Button
                        type="button"
                        className="m-3"
                        onClick={ handleSubmitRegister }
                        disabled={ isButtonDisabled() }
                    >
          CADASTRAR
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