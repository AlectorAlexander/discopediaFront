/* eslint-disable react/jsx-filename-extension */
import React, { useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Details from '../components/Details';

function ProductDetails() {

    useEffect(() => {
        if (!localStorage.getItem('cart')) {
            localStorage.setItem('cart', JSON.stringify([]));
        }
    });


    return (
        <div className="ProductDetails">
            <Header />
            <Details />
            <Footer />
        </div>
    );
}

export default ProductDetails;