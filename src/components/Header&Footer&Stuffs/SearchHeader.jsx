import React, { useContext, useEffect, useState } from 'react';
import { Form, FormControl, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Context from '../../context/Context';
import unidecode from 'unidecode';

function SearchHeader() {
    const { disc, setDisc } = useContext(Context);
    const [originalDiscs, setOriginalDisks] = useState([]);
    const [searchParam, setSearchParam] = useState('title');
    const [searchBarr, setSearchBarr] = useState('');
    const [searchBarrControll, setSearchBarrControll] = useState(0);

    let alreadyRender = false;

    const onChangeParams = ({ target }) => {
        setDisc(originalDiscs);
        setSearchBarr('');
        setSearchParam(target.value);
    };

    const findDiscBy = (() => {
        if (searchBarr.length === 0 && alreadyRender) {
            setDisc(originalDiscs);
            return;
        }
        alreadyRender = true;
        setSearchBarrControll((prev) => prev + 1);
        if (searchParam === 'title' || searchParam === 'artist') {
            const similar = disc.filter(disc => unidecode(disc[searchParam].toLowerCase()).includes(unidecode(searchBarr.toLowerCase())));
            setDisc(similar);
        } else if (searchParam === 'Caracteristica' || searchParam === 'Formato' || searchParam === 'Lancamento' || searchParam === 'Produtor' || searchParam === 'Gravadora') {
            const similar = disc.filter(disc => unidecode(disc['details'][searchParam].toLowerCase()).includes(unidecode(searchBarr.toLowerCase())));
            setDisc(similar);
        }
        else if (searchParam === 'musics') {
            const similar = disc.filter(d => d.musics.map(m => unidecode(m)).filter(m => m.toLowerCase().includes(unidecode(searchBarr.toLowerCase()))).length > 0);
            setDisc(similar);

        }
    });

    useEffect(() => {
        if (!originalDiscs.length) {
            setOriginalDisks(disc);
        } 
        if (disc) {
            findDiscBy();
        }
    }, [searchBarr]);

    useEffect(() => {
        if (searchBarr.length < searchBarrControll) {
            setSearchBarrControll(searchBarr.length);
            setDisc(originalDiscs);
        }
    }, [searchBarrControll]);

    return (
        <Form className='p-5 d-flex justify-content-center'>
            <Row>
                <Col xs={3}>
                    <Form.Label>Pesquisar por:</Form.Label>
                </Col>
                <Col xs={3}>
                    <Form.Control value={searchParam} onChange={onChangeParams} as="select">
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
    disc: PropTypes.arrayOf(PropTypes.object).isRequired,
    setDisc: PropTypes.func.isRequired
};

export default SearchHeader;
