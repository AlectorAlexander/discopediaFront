/* eslint-disable react/jsx-filename-extension */
import React, { useContext } from 'react';
import Footer from '../components/Header&Footer&Stuffs/Footer';
import Header from '../components/Header&Footer&Stuffs/Header';
import Discs from '../components/Store/Discs';
import Context from '../context/Context';
import SearchHeader from '../components/Header&Footer&Stuffs/SearchHeader';
import '../styles/Store.css';


function Store() {
    const { disc } = useContext(Context);

    return (
        <div className="psychodelic-background Store">
            <Header />
            {disc && <SearchHeader />}
            {disc && <Discs />}
            <Footer />
        </div>
        
    );
}

export default Store;