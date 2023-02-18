import React, { useContext, useEffect, useState } from 'react';
import { Button, Form, FormControl} from 'react-bootstrap';
import PropTypes from 'prop-types';
import Context from '../../context/Context';
import { getDiscsBySearch } from '../../services/BDsRequests';

const SearchComponent = ({searchParam, PromiseReturned, searchBarr, setSearchBarr, setNewDiscs, onSearch, setPromiseReturned}) => {

    const [searchBarrDate1, setsearchBarrDate1] = useState('');
    const [searchBarrDate2, setsearchBarrDate2] = useState('');

    const { Label } = useContext(Context);

    const findDiscByDate1 = async () => {
        const condition1 = searchBarrDate1 >= 1900;
        const condition4 = searchBarrDate1 <= 2022;
        const secondDate = searchBarrDate2.length === 4 ? searchBarrDate2 : 2023;
        if (searchBarrDate1.length === 4) {
            if (condition1 && condition4) {
                setPromiseReturned(false);
                setNewDiscs(null);
                const params = {
                    'details.Lancamento': [searchBarrDate1, secondDate]
                };
                
                setNewDiscs(await getDiscsBySearch(params));
                return setPromiseReturned(true);
            } else {
                searchBarrDate1('');
                searchBarrDate2('');
                return;
            }
        } else if (searchBarrDate1.length !== 4) {
            setPromiseReturned(false);
            return;
        }
    };

    const findDiscByDate2 = async () => {
        const condition2 = searchBarrDate2 >= 1901;
        const condition3 = searchBarrDate2 >= searchBarrDate1;
        const condition5 = searchBarrDate2 <= 2023;
        const firstDate = searchBarrDate1.length === 4 ? searchBarrDate1 : 1900;
        
        setPromiseReturned(false);
        if (searchBarrDate2.length === 4) {
            if (condition2 && condition3 && condition5) {
                setNewDiscs(null);
                const params = {
                    'details.Lancamento': [firstDate, searchBarrDate2]
                };
                
                setNewDiscs(await getDiscsBySearch(params));
                return setPromiseReturned(true);
            } else {
                setPromiseReturned(false);
                return;
            }
        } else if (searchBarrDate1.length !== 4) {
            setPromiseReturned(false);
            return;
        }
    };

    useEffect(() =>{
        setPromiseReturned(false);
        findDiscByDate1();
    }, [searchBarrDate1]);

    useEffect(() =>{
        setPromiseReturned(false);
        findDiscByDate2();
    }, [searchBarrDate2]);

    const dateOfDiscParam = () => {
        return (
            <div className='d-flex'>
                <FormControl
                    className='w-50 me-1' 
                    type="number"
                    max='4'
                    placeholder="Do ano" 
                    value={searchBarrDate1} onChange={({target}) => setsearchBarrDate1(target.value)}
                />
                <FormControl
                    className='w-50 ms-1' 
                    type="number"
                    maxLength={4}
                    placeholder="Até" 
                    value={searchBarrDate2} onChange={({target}) => setsearchBarrDate2(target.value)}
                />
            </div>
        );
    };


    const styleOfDiscParam = () => {
        return (<Form.Select
            onChange={(({ target }) => setSearchBarr(target.value))} 
            aria-label="Escolha"
        >
            <option value="">Open this select menu</option>
            <option value="vocal">Vocal</option>
            <option value="instrumental">Instrumental</option>
        </Form.Select>);
    };

    const labelOfDiscParam = () => {
        return (<Form.Select
            onChange={(({ target }) => setSearchBarr(target.value))} 
            aria-label="Escolha a gravadora"
        >
            <option value="">Open this select menu</option>
            {Label.map((gravadora, i) => {
                return (
                    <option key={i} value={gravadora}>{gravadora}</option>
                );
            })}
        </Form.Select>);
    };

    const typeOfDiscParam = () => {
        return (<Form.Select
            onChange={(({ target }) => setSearchBarr(target.value))} 
            aria-label="Escolha o tipo de disco"
        >
            <option value="">Open this select menu</option>
            <option value="LP">LP</option>
            <option value="CD">CD</option>
        </Form.Select>);
    };

    useEffect(() => {
        console.log(PromiseReturned);
    }, [PromiseReturned]);
    

    const titleOfDiscParam = () => {
        return (<FormControl
            className='w-50'
            type="text"
            placeholder="Digite..." 
            value={searchBarr} onChange={(({ target }) => setSearchBarr(target.value))}
        />);
    };

    
    SearchComponent.propTypes = {
        searchParam: PropTypes.string.isRequired,
        PromiseReturned: PropTypes.bool.isRequired,
        searchBarr: PropTypes.string.isRequired,
        setSearchBarr: PropTypes.func.isRequired,
        setNewDiscs: PropTypes.func.isRequired,
        onSearch: PropTypes.func.isRequired,
        setPromiseReturned: PropTypes.func.isRequired
    };

    return (
        <div className='d-flex justify-content-center'>
            {searchParam === 'title' && titleOfDiscParam()}
            {searchParam === 'Produtor' && titleOfDiscParam()}
            {searchParam === 'artist' && titleOfDiscParam()}
            {searchParam === 'musics' && titleOfDiscParam() }
            {searchParam === 'Caracteristica' && styleOfDiscParam() }
            {searchParam === 'Formatos' && typeOfDiscParam() }
            {searchParam === 'Gravadora' && labelOfDiscParam() }
            {searchParam === 'Lancamento' && dateOfDiscParam() }
            <Button
                className='mx-4'
                variant="danger"
                onClick={onSearch}
                disabled={!PromiseReturned}
            >
                        Pesquisar
            </Button>
        </div>
    );
};

export default SearchComponent;
