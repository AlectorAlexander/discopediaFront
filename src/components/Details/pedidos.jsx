/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Table } from 'react-bootstrap';
import MyRequestsModal from '../../hooks/Modals';
import '../../styles/MinhaEstantes.css';

function MyDiscsCheckout({ MyDiscs, setMyDiscs }) {
    const [id, setId] = useState('');
    const [show, setShow] = useState(false);
    const manager = (_id) => {
        setId(_id);
        setShow(true);
    };


    
    MyDiscsCheckout.propTypes = {
        setMyDiscs: PropTypes.func.isRequired,
        MyDiscs: PropTypes.shape().isRequired,
    };

    return(
        <div  className="MyDiscs d-flex flex-wrap justify-content-around container-fluid">
            <MyRequestsModal show={ show } setMyDiscs={setMyDiscs} setShow={ setShow } id={id} />
            <Table className="tr-shit">
                <thead>
                    <tr className=''>
                        <th className='th-shit'>Disco</th>
                        <th className='th-shit'>Artista</th>
                        <th className='th-shit th1'>Data de Lançamento</th>
                        <th className='th-shit  th2'>Formatos</th>
                        <th className='th-shit th3'>Quantidade de Músicas</th>
                        <th className='th-shit'>Gerenciar</th>
                        <th className='th-shit'>Ouvir</th>
                    </tr>
                </thead>
                {MyDiscs && MyDiscs.length > 0 && MyDiscs.map((product, i) => {
                    const { title, artist, details, musics, album_link, _id } = product;
                    const {Formatos, Lancamento} = details;
                    return (
                        <tbody
                            key={ i }
                        >
                            <tr>
                                <td className='td-shit'
                                >
                                    { title }

                                </td>
                                <td className='td-shit'
                                >
                                    { artist }

                                </td>
                                
                                <td className='td-shit'
                                >
                                    { Lancamento }

                                </td>
                                <td className='td-shit'
                                >
                                    {Formatos }

                                </td>

                                <td className='td-shit'
                                >
                                    {musics.length }

                                </td>
                                <td className='td-shit'>
                                    <Button className='buttons' onClick={ () => manager(_id)} variant="danger">Edite</Button>
                                </td>
                                <td className='td-shit'>
                                    <Button
                                        onClick={(() => {window.open(album_link);})}
                                        variant="danger">Link do Álbum
                                    </Button>
                                </td>
                            </tr>
                        </tbody>
                    );
                })}
            </Table>
        </div>);
}


    

export default MyDiscsCheckout;