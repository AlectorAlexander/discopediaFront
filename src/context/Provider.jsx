/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/jsx-filename-extension */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Context from './Context';

function Provider({ children }) {
    const [Loading, setLoading] = useState(true);
    const [ActualPage, setActualPage] = useState();
    const [disc, setDisc] = useState(null);
    const [pagesLenght, setPagesLenght] = useState(0);
    const [Show, setShow] = useState(false);
    const [Label, setLabel] = useState([]);
    const [ImagesHeader, setImagesHeader] = useState([]);
    const [Details, setDetails] = useState(null);
    const [name, setName] = useState('');
    const [page, setPage] = useState('login');
    const [pageStore, setPageStore,] = useState(1);
    const [data, setData] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errHomeMessage, setErrHomeMessage] = useState(null);
    const contextValue = {
        errHomeMessage,
        ActualPage, 
        setActualPage,
        Label,
        setLabel,
        Details, 
        setDetails,
        pageStore,
        setPageStore,
        pagesLenght, 
        setPagesLenght,
        ImagesHeader, 
        setImagesHeader,
        Show,
        setShow,
        data,
        setData,
        disc,
        setDisc,
        setErrHomeMessage,
        name,
        setName,
        email,
        setEmail,
        password,
        setPassword,
        page,
        setPage,
        Loading,
        setLoading,
    };

    return (
        <Context.Provider value={contextValue}>
            {children}
        </Context.Provider>
    );
}

Provider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Provider;
