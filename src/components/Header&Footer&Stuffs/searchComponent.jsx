import React, { useContext, useEffect, useState } from 'react';
import { Button, Form, FormControl} from 'react-bootstrap';
import PropTypes from 'prop-types';
import Context from '../../context/Context';

const SearchComponent = ({searchParam, searchBarr, setSearchBarr, setDisc, originalDiscs}) => {

    const [searchBarrDate1, setsearchBarrDate1] = useState('');
    const [searchBarrDate2, setsearchBarrDate2] = useState('');

    const { Label } = useContext(Context);

    const findDiscByDate1 = () => {
        const condition1 = searchBarrDate1 >= 1900;
        const condition4 = searchBarrDate1 <= 2022;
        const secondDate = searchBarrDate2.length === 4 ? searchBarrDate2 : 2023;
        if (searchBarrDate1.length === 4) {
            if (condition1 && condition4) {
                let discs = originalDiscs.filter(({details}) => {
                    const { Lancamento } = details;
                    return Number(Lancamento) >= searchBarrDate1 && Number(Lancamento) <= secondDate;
                });
                return setDisc(discs);
            } else {
                searchBarrDate1('');
                searchBarrDate2('');
                return setDisc(originalDiscs);
            }
        } else if (searchBarrDate1.length !== 4 && originalDiscs.length > 0) {
            console.log(originalDiscs);
            return setDisc(originalDiscs);
        }
    };

    const findDiscByDate2 = () => {
        const condition2 = searchBarrDate2 >= 1901;
        const condition3 = searchBarrDate2 >= searchBarrDate1;
        const condition5 = searchBarrDate2 <= 2023;
        const secondDate = searchBarrDate1.length === 4 ? searchBarrDate1 : 1900;
        
        if (searchBarrDate2.length === 4) {
            if (condition2 && condition3 && condition5) {
                let discs = originalDiscs.filter(({details}) => {
                    const { Lancamento } = details;
                    return Number(Lancamento) <= searchBarrDate2 && Number(Lancamento) >= secondDate;
                });
                return setDisc(discs);
            } else {
                return setDisc(originalDiscs);
            }
        } else if (searchBarrDate1.length !== 4 && originalDiscs.length > 0) {
            console.log(originalDiscs);
            return setDisc(originalDiscs);
        }
    };

    useEffect(() =>{
        findDiscByDate1();
    }, [searchBarrDate1]);

    useEffect(() =>{
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


    const onBarrChange = ({target}) => {
        setDisc(originalDiscs);
        setSearchBarr(target.value);
    };

    const styleOfDiscParam = () => {
        return (<Form.Select
            onChange={onBarrChange} 
            aria-label="Default select example"
        >
            <option value="">Open this select menu</option>
            <option value="vocal">Vocal</option>
            <option value="instrumental">Instrumental</option>
        </Form.Select>);
    };

    const labelOfDiscParam = () => {
        return (<Form.Select
            onChange={onBarrChange} 
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
            onChange={onBarrChange} 
            aria-label="Escolha o tipo de disco"
        >
            <option value="">Open this select menu</option>
            <option value="LP">LP</option>
            <option value="CD">CD</option>
        </Form.Select>);
    };

    

    const titleOfDiscParam = () => {
        return (<FormControl
            className='w-50'
            type="text"
            placeholder="Digite..." 
            value={searchBarr} onChange={onBarrChange}
        />);
    };

    
    SearchComponent.propTypes = {
        searchParam: PropTypes.string.isRequired,
        searchBarr: PropTypes.string.isRequired,
        originalDiscs: PropTypes.array.isRequired,
        setSearchBarr: PropTypes.func.isRequired,
        setDisc: PropTypes.func.isRequired
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
                className='brazilian_colors mx-4'
                variant="danger"
            >
                        Pesquisar
            </Button>
        </div>
    );
};

export default SearchComponent;
