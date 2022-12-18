/* eslint-disable react/jsx-filename-extension */
import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Products from '../components/Products';
import { getProducts } from '../services/BDsRequests';

function Ofertas() {
    const [Prods, setProds] = useState(null);

    const request = async () => {
        const response = await getProducts();
        return setProds(response.data);
    };

    useEffect(() => {
        request();
    }, []);

    return (
        <div className="Ofertas">
            <Header />
            {Prods && <Products Prods={ Prods } />}
            <Footer />
        </div>
    );
}

export default Ofertas;