/* eslint-disable react/jsx-filename-extension */
import React, { useContext, useEffect } from 'react';
import Footer from '../components/Header&Footer&Stuffs/Footer';
import Header from '../components/Header&Footer&Stuffs/Header';
import Details from '../components/Details/Details';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import Context from '../context/Context';
import { token_found } from '../redux/actions';
import { validateUser } from '../services/BDsRequests';

function DiscDetails() {
    const {setPage} = useContext(Context);
    const dispatch = useDispatch();

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
        const request = async () => {
            if (no_token) {
                const user = JSON.parse(localStorage.getItem('user'));
                if (user.token) {
                    const discos = await validateUser(user.token);
                    if (discos && discos.length > 0){
                        return dispatch(token_found);
                    } else {
                        return Logout;
                    }
                }
            } else {
                return Logout;
            }
        };
        request();
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