import React, { useContext, useEffect, useState } from 'react';
import { Form, FormControl} from 'react-bootstrap';
import PropTypes from 'prop-types';
import Context from '../../context/Context';

const SearchComponent = ({searchParam, searchBarr, setSearchBarr, setDisc, originalDiscs}) => {

    const [searchBarrDate1, setsearchBarrDate1] = useState('');
    const [searchBarrDate2, setsearchBarrDate2] = useState('');

    const { Label } = useContext(Context);

    const findDiscByDate = () => {
        console.log(searchBarrDate1, searchBarrDate2);
    };

    useEffect(() =>{
        findDiscByDate();
    }, [searchBarrDate1, searchBarrDate2]);

    const dateOfDiscParam = () => {
        return (
            <div className='d-flex'>
                <FormControl
                    className='w-25 me-1' 
                    type="number"
                    max='4'
                    placeholder="Do ano" 
                    value={searchBarrDate1} onChange={({target}) => setsearchBarrDate1(target.value)}
                />
                <FormControl
                    className='w-25 ms-1' 
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
            aria-label="Default select example"
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
            aria-label="Default select example"
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
            placeholder="Pesquisar..." 
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
        <div>
            {searchParam === 'title' && titleOfDiscParam()}
            {searchParam === 'Produtor' && titleOfDiscParam()}
            {searchParam === 'artist' && titleOfDiscParam()}
            {searchParam === 'musics' && titleOfDiscParam() }
            {searchParam === 'Caracteristica' && styleOfDiscParam() }
            {searchParam === 'Formatos' && typeOfDiscParam() }
            {searchParam === 'Gravadora' && labelOfDiscParam() }
            {searchParam === 'Lancamento' && dateOfDiscParam() }
        </div>
    );
};

export default SearchComponent;
