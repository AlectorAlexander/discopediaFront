/* eslint-disable react/jsx-filename-extension */
import React, { useEffect, useState } from 'react';
import Footer from '../components/Header&Footer&Stuffs/Footer';
import Header from '../components/Header&Footer&Stuffs/Header';
import PedidosCheckout from '../components/Details/pedidos';
import ModalFinish from '../hooks/Modals';
import { getSalesById } from '../services/BDsRequests';

function MeusPedidos() {
    const [MyDiscs, setMyDiscs] = useState([]);
    const [Total, setTotal] = useState('0.00');

    const request = async () => {
        const { id } = JSON.parse(localStorage.getItem('user'));
        const { data } = await getSalesById(id);
        data.map(({cellId, cellphone}, i) => {
            if (i > 0) return setMyDiscs((prevState) => [...prevState, {id: cellId, ...cellphone}
            ]);
            return setMyDiscs([{id: cellId, ...cellphone}]);
        });
    };
    useEffect(() => {
        request();
    }, []);

    useEffect(() => {
        if(MyDiscs.length){
            const total = MyDiscs.reduce((a, b) => Number(a) + Number(b.valuePerYear), 0);
            setTotal((total).toFixed(2));
        }
    }, [MyDiscs]);

    return (
        <div className="MeusPedidos">
            <Header />
            {MyDiscs.length > 0 && <ModalFinish setMyDiscs={setMyDiscs} MyDiscs={ MyDiscs } />}
            {MyDiscs.length > 0 && <PedidosCheckout Total={ Total } MyDiscs={ MyDiscs } />}
            <Footer />
        </div>
    );
}

export default MeusPedidos;