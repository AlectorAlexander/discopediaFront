/* eslint-disable react/jsx-filename-extension */
import React, { useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Details from '../components/Details';

function DiscDetails() {

    useEffect(() => {
        if (!localStorage.getItem('discs')) {
            localStorage.setItem('discs', JSON.stringify([]));
        }
    });


    return (
        <div className="DiscDetails">
            <Header />
            <Details />
            <Footer />
        </div>
    );
}

export default DiscDetails;