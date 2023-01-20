/* eslint-disable react/jsx-filename-extension */
import React, { useEffect } from 'react';
import Footer from '../components/Header&Footer&Stuffs/Footer';
import Header from '../components/Header&Footer&Stuffs/Header';
import Details from '../components/Details/Details';

function DiscDetails() {

    useEffect(() => {
        if (!localStorage.getItem('discs')) {
            localStorage.setItem('discs', JSON.stringify([]));
        }
    });


    return (
        <div className="psychodelic-background">
            <Header />
            <Details />
            <Footer />
        </div>
    );
}

export default DiscDetails;