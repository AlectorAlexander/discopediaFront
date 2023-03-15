import React, { useContext, useEffect } from 'react';
import Footer from '../components/Header&Footer&Stuffs/Footer';
import Header from '../components/Header&Footer&Stuffs/Header';
import Discs from '../components/Store/Discs';
import Context from '../context/Context';
import SearchHeader from '../components/Header&Footer&Stuffs/SearchHeader';
import '../styles/Store.css';
import PaginationLove from '../components/Store/pagination';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { token_found } from '../redux/actions';
import { validateUser } from '../services/BDsRequests';

function Store() {
    const {setPage, disc } = useContext(Context);

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
