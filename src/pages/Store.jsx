import React, { useContext, useEffect } from 'react';
import Footer from '../components/Header&Footer&Stuffs/Footer';
import Header from '../components/Header&Footer&Stuffs/Header';
import Discs from '../components/Store/Discs';
import Context from '../context/Context';
import SearchHeader from '../components/Header&Footer&Stuffs/SearchHeader';
import '../styles/Store.css';
import PaginationLove from '../components/Store/pagination';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

function Store() {
    const {setPage, disc } = useContext(Context);

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


    const warning = useSelector(state => {
        return state.userReducer.warning;
    });

    return (
        <div className="psychodelic-background Store">
            <Header />
            {disc && <SearchHeader />}
            <p>{warning !== '' && <h5>{warning}</h5>}</p>
            {disc && <Discs />}
            <PaginationLove />
            <Footer />
        </div>
    );
}


export default Store;
