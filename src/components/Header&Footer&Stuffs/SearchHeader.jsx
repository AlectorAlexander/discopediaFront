import React, { useContext, useEffect, useState } from 'react';
import { Form, Col, Row } from 'react-bootstrap';
import Context from '../../context/Context';
import unidecode from 'unidecode';
import SearchComponent from './searchComponent';

function SearchHeader() {
    const { disc, setDisc, setPageStore } = useContext(Context);
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
        console.log(searchBarr.length);
        if (searchBarr.length === 0 && alreadyRender) {
            setDisc(originalDiscs);
            return;
        }
        alreadyRender = true;
        setSearchBarrControll((prev) => prev + 1);
        if (searchParam === 'title' || searchParam === 'artist') {
            const similar = disc.filter(disc => unidecode(disc[searchParam].toLowerCase()).includes(unidecode(searchBarr.toLowerCase())));
            setDisc(similar);
        } else if (searchParam === 'Caracteristica' || searchParam === 'Formatos' || searchParam === 'Produtor' || searchParam === 'Gravadora') {
            const similar = disc.filter(disc => unidecode(disc['details'][searchParam].toLowerCase()).includes(unidecode(searchBarr.toLowerCase())));
            console.log(`"${searchBarr}"`);
            console.log(similar);
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
        return () => {
            setDisc(originalDiscs);
        };
    }, [searchBarr]);

    useEffect(() => {
        setPageStore(1);
        if (searchBarr.length !== searchBarrControll && searchParam === 'title') {
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
                        <option value="Formatos">Formato</option>
                        <option value="musics">Música</option>
                        <option value="artist">Artista</option>
                    </Form.Control>
                </Col>
                <Col xs={6}>
                    <SearchComponent setDisc={setDisc} originalDiscs={originalDiscs} searchParam={searchParam} searchBarr={ searchBarr } setSearchBarr={setSearchBarr} />
                </Col>
            </Row>
        </Form>
    );
}


export default SearchHeader;
