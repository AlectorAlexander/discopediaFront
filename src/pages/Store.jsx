import React, { Suspense, useContext, useEffect } from 'react';
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
import Loading from '../components/loading';

function Store() {
    const {setPage, disc, ImagesHeader } = useContext(Context);
    const [loading, setLoading] = React.useState(true);

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
            setLoading(true);
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

    useEffect(() => {
        if (disc && ImagesHeader && disc.length > 0 && ImagesHeader.length > 0) {
            setLoading(false);
        }
    }, [disc, ImagesHeader]);


    const warning = useSelector(state => {
        return state.userReducer.warning;
    });

    return (
        <div className="psychodelic-background Store">

            <Header />
            {!loading ? <><Suspense fallback={<Loading />}>
                {disc && <SearchHeader />}
                <p>{warning !== '' && <h5>{warning}</h5>}</p>
                {disc && <Discs />}
            </Suspense>
            </> : <Loading />}
            <div className=" pagination">
                <PaginationLove />
            </div>
            <Footer />
        </div>
    );
}


export default Store;
