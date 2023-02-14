/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Table } from 'react-bootstrap';
import MyRequestsModal from '../../hooks/Modals';

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
            <Table className="mt-5">
                <thead>
                    <tr>
                        <th>Disco</th>
                        <th>Artista</th>
                        <th>Data de Lançamento</th>
                        <th>Formatos</th>
                        <th>Quantidade de Músicas</th>
                        <th>Gerenciar</th>
                        <th>Ouvir</th>
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
                                <td
                                >
                                    { title }

                                </td>
                                <td
                                >
                                    { artist }

                                </td>
                                
                                <td
                                >
                                    { Lancamento }

                                </td>
                                <td
                                >
                                    {Formatos }

                                </td>

                                <td
                                >
                                    {musics.length }

                                </td>
                                <td>
                                    <Button className='buttons' onClick={ () => manager(_id)} variant="danger">Edite</Button>
                                </td>
                                <td>
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