/* eslint-disable react/jsx-filename-extension */
import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Discs from '../components/Discs';
import { getDiscs } from '../services/BDsRequests';

function Store() {
    const [disc, setDisc] = useState(null);

    const request = async () => {
        const response = await getDiscs();
        return setDisc(response.data);
    };

    useEffect(() => {
        request();
    }, []);

    return (
        <div className="Store">
            <Header />
            {disc && <Discs disc={ disc } />}
            <Footer />
        </div>
    );
}

export default Store;