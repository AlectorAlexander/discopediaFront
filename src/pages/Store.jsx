/* eslint-disable react/jsx-filename-extension */
import React, { useContext, useEffect, useState } from 'react';
import Footer from '../components/Header&Footer&Stuffs/Footer';
import Header from '../components/Header&Footer&Stuffs/Header';
import Discs from '../components/Store/Discs';
import { getDiscs } from '../services/BDsRequests';
import Context from '../context/Context';
import SearchHeader from '../components/Header&Footer&Stuffs/SearchHeader';

function Store() {
    const { setImagesHeader } = useContext(Context);
    const [disc, setDisc] = useState(null);

    const request = async () => {
        const response = await getDiscs();
        const { data } = response;
        data.map( async ({ url_img }) => {
            setImagesHeader((prevImages) => prevImages.concat(url_img));
        });
          
        setImagesHeader((prevImages) => prevImages.sort(() => Math.random() - 0.5));
        return setDisc(data);
    };

    useEffect(() => {
        request();
    }, []);

    return (
        <div className="Store">
            <Header />
            {disc && <SearchHeader setDiscs={setDisc} discs={ disc } />}
            {disc && <Discs disc={ disc } />}
            <Footer />
        </div>
    );
}

export default Store;