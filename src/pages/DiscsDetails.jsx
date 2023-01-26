/* eslint-disable react/jsx-filename-extension */
import React, { useContext } from 'react';
import Footer from '../components/Header&Footer&Stuffs/Footer';
import Header from '../components/Header&Footer&Stuffs/Header';
import Details from '../components/Details/Details';
import { useEffect } from 'react';
import Context from '../context/Context';

function DiscDetails() {
    const { disc } = useContext(Context);

    useEffect(() => {
        console.log(disc);
    }, []);


    return (
        <div className="psychodelic-background">
            <Header />
            <Details />
            <Footer />
        </div>
    );
}

export default DiscDetails;