/* eslint-disable react/jsx-filename-extension */
import React, { useEffect, useState } from 'react';
import Footer from '../components/Header&Footer&Stuffs/Footer';
import Header from '../components/Header&Footer&Stuffs/Header';
import PedidosCheckout from '../components/Details/pedidos';
import ModalFinish from '../hooks/Modals';
import { getSalesById } from '../services/BDsRequests';

function MeusPedidos() {
    const [Pedidos, setPedidos] = useState([]);
    const [Total, setTotal] = useState('0.00');

    const request = async () => {
        const { id } = JSON.parse(localStorage.getItem('user'));
        const { data } = await getSalesById(id);
        data.map(({cellId, cellphone}, i) => {
            if (i > 0) return setPedidos((prevState) => [...prevState, {id: cellId, ...cellphone}
            ]);
            return setPedidos([{id: cellId, ...cellphone}]);
        });
    };
    useEffect(() => {
        request();
    }, []);

    useEffect(() => {
        if(Pedidos.length){
            const total = Pedidos.reduce((a, b) => Number(a) + Number(b.valuePerYear), 0);
            setTotal((total).toFixed(2));
        }
    }, [Pedidos]);

    return (
        <div className="MeusPedidos">
            <Header />
            {Pedidos.length > 0 && <ModalFinish setPedidos={setPedidos} Pedidos={ Pedidos } />}
            {Pedidos.length > 0 && <PedidosCheckout Total={ Total } Pedidos={ Pedidos } />}
            <Footer />
        </div>
    );
}

export default MeusPedidos;