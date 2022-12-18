/* eslint-disable react/jsx-filename-extension */
import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ProductsCart from '../components/discsCart';
import ModalFinish from '../hooks/Modals';

function Cart() {
    const [carrinho, setCarrinho] = useState([]);
    const [Total, setTotal] = useState('0.00');
    useEffect(() => {
        const getCarrinho = JSON.parse(localStorage.getItem('cart'));
        setCarrinho(getCarrinho);
    }, []);

    useEffect(() => {
        if(carrinho.length){
            const total = carrinho.reduce((a, b) => Number(a) + Number(b.valor), 0);
            setTotal((total).toFixed(2));
        }
    }, [carrinho]);

    const removeItem = ({ target }) => {
        const { value } = target;
        const newProducts = carrinho
            .filter((el) => el._id !== value);
        setCarrinho(newProducts);
        localStorage.setItem('cart', JSON.stringify(newProducts));
    };

    return (
        <div className="Cart">
            <Header />
            {carrinho.length > 0 && <ModalFinish setCarrinho={setCarrinho} carrinho={ carrinho } />}
            {!carrinho.length && <h1>Você</h1>}
            {!carrinho.length && <h1>não</h1>}
            {!carrinho.length && <h1>tem</h1>}
            {!carrinho.length && <h1>nada</h1>}
            {!carrinho.length && <h1>no</h1>}
            {!carrinho.length && <h1>carrinho</h1>}
            {carrinho.length > 0 && <ProductsCart Total={ Total } removeItem={removeItem} carrinho={ carrinho } />}
            <Footer />
        </div>
    );
}

export default Cart;