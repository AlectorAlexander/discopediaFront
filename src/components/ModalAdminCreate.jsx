/* eslint-disable react/jsx-filename-extension */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, FormGroup, Modal } from 'react-bootstrap';
import { CreateDisc } from '../services/BDsRequests';

function ModalAdminCreate({ refreshPage, showAdd, setShowAdd }) {
    const [Disco, setDisco] = useState('');
    const [UrlImage, setUrlImage] = useState('');
    const [Descricao, setDescricao] = useState('');
    const [Valor, setValor] = useState('');
    const [SaveButton, setSaveButton] = useState(true);

    useEffect(() => {
        const compare1 = Disco.length > 0;
        const compare2 = Valor.length > 0;
        const compare3 = Descricao.length > 0;
        const compare4 = UrlImage.length > 0;

        const theFinalTrue = [compare1, compare2, compare3, compare4].some((el) => el === true);

        setSaveButton(!theFinalTrue);
    }, [Disco,
        UrlImage,
        Descricao,
        Valor,
        SaveButton]);

    const createProduct = async () => {

        const updated = new Date();
        const created = new Date();
        const upProduct = {
            produto: Disco,
            valor: Number(Valor),
            descricao: Descricao,
            url_image: UrlImage,
            created,
            updated
        };
        const response = await CreateDisc(upProduct);
        console.log(response);
        if (response.status === 201) {
            setShowAdd(!showAdd);
            refreshPage();
        }
    };
    

    return (
        <Modal show={showAdd} onHide={() => setShowAdd(false)}>
            <Modal.Header closeButton>
                <img className="thumb-admin" src={UrlImage} alt={ Disco } />
            </Modal.Header>
            <Modal.Body>
                <FormGroup>
                    <Form.Label className='d-flex p-2 border-bottom'>
                        Nome do Disco:
                        <Form.Control
                            type="text"
                            value={ Disco }
                            onChange={ ({target}) => setDisco(target.value) }
                        />
                    </Form.Label>
                    <Form.Label className='d-flex p-2 border-bottom'>
                        Valor do Disco:
                        <Form.Control
                            type="number"
                            value={ Valor }
                            onChange={ ({target}) => setValor(target.value) }
                        />
                    </Form.Label>
                    <Form.Label className='d-flex p-2 border-bottom'>
                        Descrição do Disco:
                        <Form.Control
                            type="text"
                            value={ Descricao }
                            onChange={ ({target}) => setDescricao(target.value) }
                        />
                    </Form.Label>
                    <Form.Label className='d-flex p-2 border-bottom'>
                        Thumb do Disco:
                        <Form.Control
                            type="text"
                            value={ UrlImage }
                            onChange={ ({target}) => setUrlImage(target.value) }
                        />
                    </Form.Label>
          
    
                </FormGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => setShowAdd(false)}>
                        Cancelar
                </Button>
                <Button
                    disabled={SaveButton}
                    variant="primary"
                    onClick={createProduct}>
                        Criar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

ModalAdminCreate.propTypes = {
    setShowAdd: PropTypes.func.isRequired,
    showAdd: PropTypes.bool.isRequired,
    refreshPage: PropTypes.shape().isRequired,
};

export default ModalAdminCreate;
