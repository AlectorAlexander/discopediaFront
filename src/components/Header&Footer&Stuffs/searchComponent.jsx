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
                
                const { data } = await getDiscsBySearch(params);
                setNewDiscs(data);
                setSearchBarr(`De ${searchBarrDate1} até ${secondDate}`);
                return setPromiseReturned(true);
            } else {
                searchBarrDate1('');
                searchBarrDate2('');
                setSearchBarr('');
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
                
                const { data } = await getDiscsBySearch(params);
                setNewDiscs(data);
                setSearchBarr(`De ${firstDate} até ${searchBarrDate2}`);
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
            <div className='lancamento-inputs'>
                <FormControl
                    type="number"
                    max='4'
                    placeholder="Do ano" 
                    value={searchBarrDate1} onChange={({target}) => setsearchBarrDate1(target.value)}
                />
                <FormControl
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
            className='d-flex flex-wrap label-choice'
            onChange={(({ target }) => setSearchBarr(target.value))} 
            aria-label="Escolha"
        >
            <option value="">Escolha</option>
            <option value="vocal">Vocal</option>
            <option value="instrumental">Instrumental</option>
        </Form.Select>);
    };

    const labelOfDiscParam = () => {
        return (<Form.Select
            className='label-choice'
            onChange={(({ target }) => setSearchBarr(target.value))} 
            aria-label="Escolha a gravadora"
        >
            <option value="">Escolha a gravadora</option>
            {Label.map((gravadora, i) => {
                return (
                    <option key={i} value={gravadora}>{gravadora}</option>
                );
            })}
        </Form.Select>);
    };

    const typeOfDiscParam = () => {
        return (<Form.Select
            className='input-search label-choice'
            onChange={(({ target }) => setSearchBarr(target.value))} 
            aria-label="Escolha o tipo de disco"
        >
            <option value="">Open this select menu</option>
            <option value="LP">LP</option>
            <option value="CD">CD</option>
        </Form.Select>);
    };
    

    const titleOfDiscParam = () => {
        return (<FormControl
            className='w-50 d-flex flex-wrap'
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
        <div className='search-component'>
            {searchParam === 'title' && titleOfDiscParam()}
            {searchParam === 'Produtor' && titleOfDiscParam()}
            {searchParam === 'artist' && titleOfDiscParam()}
            {searchParam === 'musics' && titleOfDiscParam() }
            {searchParam === 'Caracteristica' && styleOfDiscParam() }
            {searchParam === 'Formatos' && typeOfDiscParam() }
            {searchParam === 'Gravadora' && labelOfDiscParam() }
            {searchParam === 'Lancamento' && dateOfDiscParam() }
            <Button
                className='mx-4 brazilian_colors'
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
