import React, { useContext, useEffect, useState } from 'react';
import { Form, Col, Row } from 'react-bootstrap';
import Context from '../../context/Context';
import SearchComponent from './searchComponent';
import { getDiscsBySearch } from '../../services/BDsRequests';

function SearchHeader() {
    const { setPageStore, setLoading } = useContext(Context);
    const [NewDiscs, setNewDiscs] = useState(null);
    const [PromiseReturned, setPromiseReturned] = useState(false);
    const [searchParam, setSearchParam] = useState('title');
    const [searchBarr, setSearchBarr] = useState('');
    const [searchBarrControll, setSearchBarrControll] = useState(0);
    let searchTimeControll = 0;

    useEffect(() => {
        if (searchParam === 'musics' || searchParam === 'title' || searchParam === 'artist' || searchParam === 'produtor' ) {
            if (searchBarr === '') {
                return setPromiseReturned(false);
            }
        }
    }, [searchBarr]);


    const onSearch = () => {
        if (!PromiseReturned && searchTimeControll <= 4000) {
            setLoading(true);
            console.log(searchTimeControll);
            searchTimeControll += 1;
            return onSearch();
        }
        searchTimeControll = 0;
        console.log(NewDiscs);
        setPromiseReturned(false);
        return setLoading(false);
    };

    const onChangeParams = ({ target }) => {
        setSearchBarr('');
        setSearchParam(target.value);
    };

    const findDiscBy = ( async () => {
        const params = {};
        setSearchBarrControll((prev) => prev + 1);
        if (searchBarr === '') {
            return setPromiseReturned(false);
        }
        if (searchParam === 'title' || searchParam === 'artist') {
            setPromiseReturned(false);
            setNewDiscs(null);
            params[searchParam] = searchBarr;
            const newDiscs = await getDiscsBySearch(params);
            setNewDiscs(newDiscs);
            return setPromiseReturned(true);

        } else if (searchParam === 'Caracteristica' || searchParam === 'Formatos' || searchParam === 'Produtor' || searchParam === 'Gravadora') {
            setPromiseReturned(false);
            setNewDiscs(null);
            params[`details.${searchParam}`] = searchBarr;
            const newDiscs = await getDiscsBySearch(params);
            setNewDiscs(newDiscs);
            return setPromiseReturned(true);
        }
        else if (searchParam === 'musics') {
            setPromiseReturned(false);
            setNewDiscs(null);
            params[searchParam] = searchBarr;
            const newDiscs = await getDiscsBySearch(params);
            setNewDiscs(newDiscs);
            return setPromiseReturned(true);
        }
    });

    useEffect(() => {
        setPromiseReturned(false);
        findDiscBy();
    }, [searchBarr]);

    useEffect(() => {
        setPromiseReturned(false);
        setPageStore(1);
        if (searchBarr.length !== searchBarrControll && searchParam === 'title') {
            setSearchBarrControll(searchBarr.length);
        }
    }, [searchBarrControll]);

    return (
        <Form className='p-5 d-flex justify-content-center'>
            
            <Row className='d-flex justify-content-center w-75'>
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
                <Col className='d-flex justify-content-center' xs={5}>
                    <SearchComponent PromiseReturned={PromiseReturned} setPromiseReturned={setPromiseReturned} setNewDiscs={setNewDiscs} searchParam={searchParam} searchBarr={ searchBarr } setSearchBarr={setSearchBarr} onSearch={onSearch} />
                    
                </Col>
                   
            </Row>
            
        </Form>
    );
}


export default SearchHeader;
