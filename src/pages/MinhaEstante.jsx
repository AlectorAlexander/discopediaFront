/* eslint-disable react/jsx-filename-extension */
import React, { useEffect, useState } from 'react';
import Footer from '../components/Header&Footer&Stuffs/Footer';
import Header from '../components/Header&Footer&Stuffs/Header';
import MyDiscsCheckout from '../components/Details/pedidos';
import { getDiscsUser } from '../services/BDsRequests';

function MinhaEstante() {
    const [MyDiscs, setMyDiscs] = useState([]);


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