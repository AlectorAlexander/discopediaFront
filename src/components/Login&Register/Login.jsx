import React, { useContext} from 'react';
import validate from '../../services/validates';
import { useNavigate } from 'react-router-dom';
import { LoginFetch } from '../../services/BDsRequests';
import { Button } from 'react-bootstrap';
import Context from '../../context/Context';
import { useDispatch } from 'react-redux';
import { token_found } from '../../redux/actions';
import Loading from '../loading';


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
    const [loading, setLoading] = React.useState(false);
    const dispatch = useDispatch();


    const handleEmail = ({ target }) => setEmail(target.value);
    const handlePassword = ({ target }) => setPassword(target.value);

    const isButtonDisabled = () => (
        !validate.validateEmail(email)
    || !validate.validatePassword(password)
    );

    const handleLogin = async () => {
        setErrHomeMessage(null);
        const magicNumberSim = 200;
        setLoading(true);
        const response = await LoginFetch(email, password);
        setLoading(false);
        if(response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));}

        const { status } = response;

        if (status === magicNumberSim) {
            dispatch(token_found);
            return history('/store');
        }

        return setErrHomeMessage('Dados inválidos');
    };

    function handleToRegister() {
        setErrHomeMessage(null);
        setPage('register');
    }

    return (
        <div>
            {loading ? <Loading/> : 
                <form className='form-login'>
                
                    <input
                        placeholder="Email"
                        onChange={handleEmail}
                        type="email"
                    />
               
                    <input
                        placeholder="Passoword"
                        onChange={handlePassword}
                        type="password"
                    />
                    <div className="buttons-login d-flex flex-wrap justify-content-center">
                        <Button
                            type="button"
                            className="buttonstrap"
                            disabled={isButtonDisabled()}
                            onClick={handleLogin}
                        >
          LOGIN
                        </Button>
                        <Button
                            className="buttonstrap"
                            type="button"
                            onClick={handleToRegister}
                        >
          Registrar
                        </Button>
                        {errHomeMessage && (
                            <span
                            >
                                {errHomeMessage}
                            </span>
                        )}
                    
                    </div>
                </form>
            }
        </div>
    );
}

export default Login;
