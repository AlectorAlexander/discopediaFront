/* eslint-disable react/jsx-filename-extension */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, FormGroup, Modal } from 'react-bootstrap';
import { UpdateProduct } from '../services/BDsRequests';

function ModalAdminUpdate({ refreshPage, show, setShow, Item }) {
    const [Produto, setProduto] = useState('');
    const [id, setID] = useState('');
    const [UrlImage, setUrlImage] = useState('');
    const [Descricao, setDescricao] = useState('');
    const [Valor, setValor] = useState('');
    const [SaveButton, setSaveButton] = useState(true);

    useEffect(() => {
        if (Item) {
            setID(Item._id);
            setProduto(Item.produto);
            setUrlImage(Item.url_image);
            setDescricao(Item.descricao);
            setValor(Item.valor);
        }
    }, [Item]);
    useEffect(() => {
        if (id) {
            const item = {
                id,
                Produto,
                Valor,
                Descricao,
                UrlImage,
                SaveButton,
            };
            const compare1 = item.Produto.length > 0 && item.Produto !== Item.produto;
            const compare2 = item.Valor.length > 0 && item.Valor !== Item.valor;
            const compare3 = item.Descricao.length > 0 && item.Descricao !== Item.descricao;
            const compare4 = item.UrlImage.length > 0 && item.UrlImage !== Item.url_image;

            const theFinalTrue = [compare1, compare2, compare3, compare4].some((el) => el === true);

            setSaveButton(!theFinalTrue);
        }
    }, [Produto,
        UrlImage,
        Descricao,
        Valor,
        SaveButton]);

    const updateProduct = async () => {

        const updated = new Date();
        const created = Item.created;
        const upProduct = {
            produto: Produto,
            valor: Number(Valor),
            descricao: Descricao,
            url_image: UrlImage,
            created,
            updated
        };
        const response = await UpdateProduct(id, upProduct);
        if (response.status === 200) {
            setShow(!show);
            refreshPage();
        }
    };
    

    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <img className="thumb-admin" src={UrlImage} alt={ Produto } />
            </Modal.Header>
            <Modal.Body>
                <FormGroup>
                    <Form.Label className='d-flex p-2 border-bottom'>
                        Nome do Produto:
                        <Form.Control
                            type="text"
                            value={ Produto }
                            onChange={ ({target}) => setProduto(target.value) }
                        />
                    </Form.Label>
                    <Form.Label className='d-flex p-2 border-bottom'>
                        Valor do Produto:
                        <Form.Control
                            type="number"
                            value={ Valor }
                            onChange={ ({target}) => setValor(target.value) }
                        />
                    </Form.Label>
                    <Form.Label className='d-flex p-2 border-bottom'>
                        Descrição do Produto:
                        <Form.Control
                            type="text"
                            value={ Descricao }
                            onChange={ ({target}) => setDescricao(target.value) }
                        />
                    </Form.Label>
                    <Form.Label className='d-flex p-2 border-bottom'>
                        Thumb do Produto:
                        <Form.Control
                            type="text"
                            value={ UrlImage }
                            onChange={ ({target}) => setUrlImage(target.value) }
                        />
                    </Form.Label>
          
    
                </FormGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => setShow(false)}>
                        Cancelar
                </Button>
                <Button
                    disabled={SaveButton}
                    variant="primary"
                    onClick={updateProduct}>
                        Salvar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

ModalAdminUpdate.propTypes = {
    setShow: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    Item: PropTypes.shape().isRequired,
    refreshPage: PropTypes.shape().isRequired,
};

export default ModalAdminUpdate;
