/* eslint-disable react/jsx-filename-extension */
import React, { useContext, useEffect } from 'react';
import Footer from '../components/Header&Footer&Stuffs/Footer';
import Header from '../components/Header&Footer&Stuffs/Header';
import Details from '../components/Details/Details';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import Context from '../context/Context';

function DiscDetails() {
    const {setPage} = useContext(Context);

    const history = useNavigate();
    const Logout = () => {
        setPage('login');
        localStorage.clear();
        history('/');
    };

    const no_token = useSelector(state => {
        return state.userReducer.no_token;
    });

    useEffect(() => {
        if (no_token) {
            return Logout;
        }

    }, [no_token]);

    return (
        <div className="psychodelic-background">
            <Header />
            <Details />
            <Footer />
        </div>
    );
}

export default DiscDetails;