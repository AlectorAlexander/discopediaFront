/* eslint-disable react/jsx-filename-extension */
import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Modal } from 'react-bootstrap';
import { IMaskInput } from 'react-imask';
import Context from '../context/Context';
import { createSales, UpdateDocumentUser } from '../services/BDsRequests';
import { useNavigate } from 'react-router';

function ModalFinish({carrinho, setCarrinho}) {
    const {Show, setShow} = useContext(Context);
    const [documentType, setDocumentType] = useState('');
    const [document, setDocument] = useState('');
    const [button, setButton] = useState(false);

    const history = useNavigate();

    const handleCloseHave = () => setShow(false);

    const handleDocumentType = ({target}) => {
        setDocumentType(target.value);
    };

    const finishHim = () => {
        const { id } = JSON.parse(localStorage.getItem('user'));
        Promise.all(carrinho.map( async (item) => {
            const response = await createSales(id, item.id);
            return response.data;
        }));
        localStorage.setItem('cart', JSON.stringify([]));
        setCarrinho([]);
        setShow(false);
        history('/pedidos');
    };

    function documentChoice() {
        const updateDocument = async () => {
            const { id } = JSON.parse(localStorage.getItem('user'));
            const response = await UpdateDocumentUser(id, document);
            console.log(response);
            finishHim();
        };
        if(documentType === 'CPF') {
            return (<div className='d-flex justify-content-around w-75'>
                <IMaskInput
                    type='text'
                    className="w-75 m-2"
                    mask="000.000.000-00"
                    placeholder="Digite o seu CPF"
                    value={document}
                    onChange={(({ target }) => setDocument(target.value))}
                    onComplete={() => setButton(true)}                    
                />
                <Button disabled={!button} onClick={ updateDocument } className='w-25'>Enviar</Button>
            </div>);
        }
        if(documentType === 'RG') {
            return (<div className='d-flex justify-content-around w-75'>
                <IMaskInput
                    type='text'
                    className="w-75 m-2"
                    mask="00.000.000"
                    placeholder="Digite o seu RG"
                    value={document}
                    onChange={(({ target }) => setDocument(target.value))}
                    onComplete={() => setButton(true)}                   
                />
                <Button disabled={!button} onClick={ updateDocument } className='w-25'>Enviar</Button>
            </div>);
        }
    }
    return (
        <Modal show={Show} onHide={handleCloseHave}>
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>Nós precisamos que você nos envie algum documento para finalizar o pedido</Modal.Body>
            <Form.Select onClick={handleDocumentType} size="lg">
                <option>Escolha RG ou CPF</option>
                <option>CPF</option>
                <option>RG</option>
            </Form.Select>
            {documentChoice()}
            <Modal.Footer>
                <Button variant="primary" onClick={handleCloseHave}>
                        Cancelar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

ModalFinish.propTypes = {
    setCarrinho: PropTypes.func.isRequired,
    carrinho: PropTypes.shape().isRequired,
};

export default ModalFinish;
