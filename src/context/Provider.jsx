/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/jsx-filename-extension */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Context from './Context';

function Provider({ children }) {
    const [Loading, setLoading] = useState(false);
    const [Data, setData] = useState();
    const [Show, setShow] = useState(false);
    const [Details, setDetails] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [page, setPage] = useState('login');
    const [errHomeMessage, setErrHomeMessage] = useState(null);
    const contextValue = {
        errHomeMessage,
        Details, 
        setDetails,
        Show,
        setShow,
        setErrHomeMessage,
        name,
        setName,
        email,
        setEmail,
        password,
        setPassword,
        page,
        setPage,
        Data,
        setData,
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
