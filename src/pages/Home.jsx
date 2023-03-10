import React, { useContext, useEffect } from 'react';
import '../App.css';
import Context from '../context/Context';
import Login from '../components/Login&Register/Login';
import Register from '../components/Login&Register/Register';
import { useNavigate } from 'react-router';
import Logo from '../logo.png';
import '../styles/home.css';

function Home() {
    const { page, setPage } = useContext(Context);
    const history = useNavigate();
    /* Eu decidi criar uma função para alterar os componentes de
  requisição e validação do usuário, ao invés de
  usar o routers, porque acreditei que essa abordagem pouparia tempo e
  código, além de deixar a aplicação mais performática */
    const rightComponent = () => {
        if (page === 'login') return <Login />;
        if (page === 'register') return <Register />;
        return setPage('login');
    };

    useEffect(() => {
        const isUserLogin = JSON.parse(localStorage.getItem('user'));
        if (isUserLogin) {
            history('/store');
        }
    }, []);


    return (
        <div className="App login">
            <div className='card-login'>
                <img className='logo' src={Logo} alt='logo' />
                {rightComponent()}
            </div>
        </div>
    );
}

export default Home;