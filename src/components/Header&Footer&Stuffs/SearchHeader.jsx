import React, { useEffect, useState } from 'react';
import { Form, FormControl, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';

function SearchHeader({discs, setDiscs}) {
    const [originalDiscs, setOriginalDisks] = useState([]);
    const [searchParam, setSearchParam] = useState('title');
    const [searchBarr, setSearchBarr] = useState('');

    const findDiscBy = (() => {
        if (searchBarr.length === 0) {
            setDiscs(originalDiscs);
            return;
        }
        if (searchParam === 'title' || searchParam === 'artist') {
            const similar = discs.filter(disc => disc[searchParam].toLowerCase().includes(searchBarr.toLowerCase()));
            setDiscs(similar);
        } else if (searchParam === 'Caracteristica' || searchParam === 'Formato' || searchParam === 'Lancamento' || searchParam === 'Produtor' || searchParam === 'Gravadora') {
            const similar = discs.filter(disc => disc['details'][searchParam].toLowerCase().includes(searchBarr.toLowerCase()));
            setDiscs(similar);
        }
        else if (searchParam === 'musics') {
            const similar = discs.filter(disc => disc['musics'][searchParam].toLowerCase().includes(searchBarr.toLowerCase()));
            setDiscs(similar);
        }
    });

    useEffect(() => {
        if (!originalDiscs.length) {
            setOriginalDisks(discs);
        } 
        if (discs) {
            findDiscBy();
        }
    }, [searchBarr]);

    return (
        <Form className='p-5 d-flex justify-content-center'>
            <Row>
                <Col xs={3}>
                    <Form.Label>Pesquisar por:</Form.Label>
                </Col>
                <Col xs={3}>
                    <Form.Control value={searchParam} onChange={({target}) => setSearchParam(target.value)} as="select">
                        <option value="title">Título</option>
                        <option value="Produtor">Produtor</option>
                        <option value="Lancamento">Lançado em</option>
                        <option value="Gravadora">Gravadora</option>
                        <option value="Caracteristica">Característica</option>
                        <option value="musics">Música</option>
                        <option value="artist">Artista</option>
                    </Form.Control>
                </Col>
                <Col xs={6}>
                    <FormControl
                        className='w-50'
                        type="text"
                        placeholder="Pesquisar..." 
                        value={searchBarr} onChange={({target}) => setSearchBarr(target.value)}
                    />
                </Col>
            </Row>
        </Form>
    );
}

SearchHeader.propTypes = {
    discs: PropTypes.arrayOf(PropTypes.object).isRequired,
    setDiscs: PropTypes.func.isRequired
};

export default SearchHeader;
