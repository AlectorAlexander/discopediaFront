/* eslint-disable react/jsx-filename-extension */
import React, { useEffect, useState } from 'react';
import Footer from '../components/Header&Footer&Stuffs/Footer';
import Header from '../components/Header&Footer&Stuffs/Header';
import ProductsAdmin from '../components/adminProducts';
import { getDiscs } from '../services/BDsRequests';

function AdminProducts() {
    const [Discs, setDiscs] = useState(null);

    function refreshPage() {
        window.location.reload(false);
    }

    const request = async () => {
        const response = await getDiscs();
        return setDiscs(response.data);
    };

    useEffect(() => {
        request();
    }, []);

    return (
        <div className="AdminProducts">
            <Header />
            {Discs && <ProductsAdmin refreshPage={refreshPage} setDiscs={ setDiscs } Discs={ Discs } />}
            <Footer />
        </div>
    );
}

export default AdminProducts;