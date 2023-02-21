/* eslint-disable react/jsx-filename-extension */
import React, { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import Context from '../../context/Context';
import { User_did_NOT_search } from '../../redux/actions';
import Cards from './Cards';

function Discs() {
    const {pageStore, setDetails, data, Loading } = useContext(Context);

    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(User_did_NOT_search);
        };
    }, [dispatch]);

    const history = useNavigate();

    const pageChangeToDetails = (item, _id) => {
        setDetails(item);
        history(`/store/details/${_id}`);
    };

    return (
        <div className='d-flex justify-content-center flex-column'>
            <div className="disc d-flex flex-wrap justify-content-center container-fluid">
                {Loading ? <p>carregando...</p> : data[pageStore - 1].map((item, i) => {
                    return (
                        <Cards key={i} item={item} pageChangeToDetails={pageChangeToDetails}  />
                    );
                })}
            
            </div>
        </div>
    );
}

  

export default Discs;