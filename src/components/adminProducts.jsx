/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Table } from 'react-bootstrap';
import ModalAdminUpdate from './Details/ModalAdminUpdate';
import { IoMdAddCircle } from 'react-icons/io';
import ModalAdminCreate from './Details/ModalAdminCreate';
import { deleteDiscs } from '../services/BDsRequests';


function DiscsAdmin({ Discs, setDiscs, refreshPage }) {

    const [search, setSearch] = useState('');
    const [data, _setData] = useState(Discs);
    const [show, setShow] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [Item, setItem] = useState();

    const setToModal = (item) => {
        setItem(item);
        setShow(true);
    };

    useEffect(() => {
        if (search.length > 0) {
            const value = search.toLowerCase();
            const searchFilter = data
                .filter((prod) => (prod.produto.toLowerCase()).includes(value));
    
            setDiscs(searchFilter);
        } else { setDiscs(data); }
    }, [search]);

    const deleDisc = async (id) => {
        const response = await deleteDiscs(id);
        if(response.status === 204) {
            refreshPage();
        }
    };


    return (
        <div className="Discs d-flex flex-wrap justify-content-center container-fluid">
            <ModalAdminUpdate refreshPage={refreshPage} Item={ Item } show={ show } setShow={ setShow } />
            <ModalAdminCreate refreshPage={refreshPage} showAdd={ showAdd } setShowAdd={ setShowAdd } />
            <Form.Control
                placeholder="Pesquise por nome do Produto"
                value={ search }
                className='w-25 m-3'
                onChange={({target}) => setSearch(target.value)}
                type="email"
            />
            <Table className="mt-5">
               
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Produto</th>
                        <th>Valor</th>
                        <th>Imagem</th>
                        <th>Editar Detalhes</th>
                        <th className='link' onClick={() => setShowAdd(true)}>Add <IoMdAddCircle /> </th>
                    </tr>
                </thead>
                <tbody>
                    {Discs && Discs.map((item, i) => {
                        const { _id, produto, valor, url_image } = item;
                        const image = (<img 
                            src={ url_image }
                            className='min-thumb' 
                            alt={ produto } /> );
                        return (
                            <tr key={i}>
                                <td>{_id}</td>
                                <td>{ produto }</td>
                                <td>{ valor.toFixed(2,2).replace('.', ',') }</td>
                                <td>{ image }</td>
                                <td>
                                    <Button
                                        type="button"
                                        onClick={() => setToModal(item)}
                                    > 
                                         Editar
                                    </Button>
                                </td>
                                <td>
                                    <Button
                                        type="button"
                                        variant='danger'
                                        onClick={ () => deleDisc(_id) }
                                    > 
                                         Deletar
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>

            </Table>
        </div>
    );
}

DiscsAdmin.propTypes = {
    Discs: PropTypes.shape().isRequired,
    setDiscs: PropTypes.shape().isRequired,
    refreshPage: PropTypes.shape().isRequired,
};
  

export default DiscsAdmin;