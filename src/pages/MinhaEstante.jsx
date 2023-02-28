/* eslint-disable react/jsx-filename-extension */
import React, { useContext, useEffect, useState } from 'react';
import Footer from '../components/Header&Footer&Stuffs/Footer';
import Header from '../components/Header&Footer&Stuffs/Header';
import MyDiscsCheckout from '../components/Details/pedidos';
import { getDiscsUser } from '../services/BDsRequests';
import Context from '../context/Context';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

function MinhaEstante() {
    const [MyDiscs, setMyDiscs] = useState([]);
    const {setPage} = useContext(Context);

    const history = useNavigate();
    const Logout = () => {
        setPage('login');
        localStorage.clear();
        history('/');
    };

    const no_token = useSelector(state => {
        return state.userReducer.no_token;
    });

    useEffect(() => {
        if (no_token) {
            return Logout;
        }

    }, [no_token]);



    const request = async () => {
        const discase = JSON.parse(localStorage.getItem('discase'));
        if (!discase) {
            const {  id } = JSON.parse(localStorage.getItem('user'));
            const response = await getDiscsUser(id);
            if (response.status === 200) {
                setMyDiscs(response.data);
                return localStorage.setItem('discase', JSON.stringify([...response.data]));
            }
        }
        return setMyDiscs(discase);
        
    };
    useEffect(() => {
        console.log('aqui');
        request();
    }, []);

    return (
        <div className="MinhaEstante">
            <Header />
            {MyDiscs && MyDiscs.length > 0 ? <MyDiscsCheckout setMyDiscs={setMyDiscs} MyDiscs={ MyDiscs } /> : <div className='empty-space'>{''}</div>}
            <Footer />
        </div>
    );
}

export default MinhaEstante;