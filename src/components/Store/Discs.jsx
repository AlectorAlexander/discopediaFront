/* eslint-disable react/jsx-filename-extension */
import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import Context from '../../context/Context';
import Cards from './Cards';

function Discs() {
    const {pageStore, setDetails, data, Loading } = useContext(Context);

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