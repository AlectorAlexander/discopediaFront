import React, { useContext, useEffect} from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Context from '../../context/Context';
import { token_found } from '../../redux/actions';
import { createUser } from '../../services/BDsRequests';
import validate from '../../services/validates';
import Loading from '../loading';

export default function Register() {
    const history = useNavigate();
    const [loading, setLoading] = React.useState(false);

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

    const dispatch = useDispatch();

    const handleChangeName = ({target}) => setName(target.value);
    const handleChangeEmail = ({target}) => setEmail(target.value);
    const handleChangePassword = ({target}) => setPassword(target.value);

    const isButtonDisabled = () => (
        !validate.validateEmail(email)
    || !validate.validatePassword(password)
    || !validate.validateName(name)
    );

    useEffect(() => {
        if (validate.validateEmail(email)
        && validate.validatePassword(password)
        && validate.validateName(name)) {
            setErrHomeMessage(null);
        } else if (!validate.validateEmail(email)) {
            setErrHomeMessage('Email inválido');
        } else if (!validate.validatePassword(password)) {
            setErrHomeMessage('Senha inválida');
        } else if (!validate.validateName(name)) {
            setErrHomeMessage('Nome inválido');
        }
    }, [name, email, password]);

    function handleToRegister() {
        setErrHomeMessage(null);
        setPage('login');
    }

    async function handleSubmitRegister() {
        setErrHomeMessage(null);
        const magicNumberSim = 201;
        const conflict = 409;
        setLoading(true);
        const response = await createUser(name, email, password );
        setLoading(false);
        if(response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));}

        const { status } = response;
        if (status === magicNumberSim) {
            dispatch(token_found);
            return history('/store');
        }

        if (status === conflict) {
            return setErrHomeMessage('Usuário já cadastrado');
        }

        return setErrHomeMessage('Dados inválidos');
    }

    return (
        <div className='d-flex align-items-center  justify-content-center mt-1'>
            {loading ? (<Loading/>) : ( 
                <form className='form-login'>
                    <Form.Control
                        placeholder="Seu nome"
                        onChange={ handleChangeName }
                        type="text"
                        value={ name }
                    />
                    <Form.Control
                        placeholder="Email"
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
                   
                    </div>
                    {errHomeMessage && (
                        <span className='text-warning text-center mt-3 text-bold'
                        >
                            {errHomeMessage}
                        </span>
                    )}
                </form>)}
        </div>
    );
}