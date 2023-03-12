import React, { useContext, useEffect, useState } from 'react';
import { Form, Col, Row } from 'react-bootstrap';
import Context from '../../context/Context';
import SearchComponent from './searchComponent';
import { getDiscsBySearch } from '../../services/BDsRequests';
import { not_found_data, User_did_search } from '../../redux/actions';
import { useDispatch } from 'react-redux';

function SearchHeader() {
    const { setPageStore, setLoading, setData, setPagesLenght } = useContext(Context);
    const [NewDiscs, setNewDiscs] = useState(null);
    const [PromiseReturned, setPromiseReturned] = useState(false);
    const [searchParam, setSearchParam] = useState('title');
    const [searchBarr, setSearchBarr] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchBarrControll, setSearchBarrControll] = useState(0);
    let searchTimeControll = 0;

    const dispatch = useDispatch();


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
        setLoading(true);     
        setPromiseReturned(false);
        if (NewDiscs.length === 0) {
            setPagesLenght(1);
            return dispatch(not_found_data);
        }
        if (NewDiscs.length < 400) {
            const newCardsDiscs = [];
            for (let i = 0; i < NewDiscs.length; i += 9) {
                const discsGroup = NewDiscs.slice(i, i + 9);
                newCardsDiscs.push(discsGroup);
                if (i >= NewDiscs.length - 9 && newCardsDiscs < 9) {
                    const restoInPeace = newCardsDiscs.slice(i + 9);
                    newCardsDiscs.push(restoInPeace);
                }
            }
            setData(newCardsDiscs);
            dispatch(User_did_search(NewDiscs.length, searchParam, searchBarr));

        }
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
            params[searchParam] = searchTerm;
            const { data } = await getDiscsBySearch(params);
            setNewDiscs(data);
            return setPromiseReturned(true);

        } else if (searchParam === 'Caracteristica' || searchParam === 'Formatos' || searchParam === 'Produtor' || searchParam === 'Gravadora') {
            setPromiseReturned(false);
            setNewDiscs(null);
            params[`details.${searchParam}`] = searchTerm;
            const { data } = await getDiscsBySearch(params);
            setNewDiscs(data);
            return setPromiseReturned(true);
        }
        else if (searchParam === 'musics') {
            setPromiseReturned(false);
            setNewDiscs(null);
            params[searchParam] = searchTerm;
            const { data } = await getDiscsBySearch(params);
            setNewDiscs(data);
            return setPromiseReturned(true);
        }
    });

    let timer;

    const handleChange = () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            if (searchParam !== 'Lancamento') {
                setPromiseReturned(false);
                setSearchTerm(searchBarr);
            } else {
                console.log('chamou por alguma razão');
                setSearchBarr('');
                setPageStore(1);
            }
        }, 500);
    };

    useEffect(() => {
        handleChange();
    }, [searchBarr]);

    useEffect(() => {
        if (searchTerm === searchBarr) {
            findDiscBy();
            setSearchTerm('');
        }
    }, [searchTerm]);
    


    useEffect(() => {
        console.log('problem');
        setPromiseReturned(false);
        setPageStore(1);
        if (searchBarr.length !== searchBarrControll && searchParam === 'title') {
            setSearchBarrControll(searchBarr.length);
        }
    }, [searchBarrControll]);



    return (
        <Form className='search-header'>
            
            <Row className='select-choice'>
                <Col xs={3}>
                    <Form.Label>Pesquisar por:</Form.Label>
                </Col>
                <Col xs={3}>
                    <Form.Control className="input-search" value={searchParam} onChange={onChangeParams} as="select">
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
