/* eslint-disable react/jsx-filename-extension */
import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, ListGroup, Modal } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import PropTypes from 'prop-types';
import Context from '../context/Context';
import { getProductsById } from '../services/BDsRequests';
import { useNavigate, useParams } from 'react-router';

function Details() {
    const { Details, setDetails } = useContext(Context);
    const { id } = useParams();
    const [showReadyHave, setShowReadyHave] = useState(false);
    const [showDontHave, setShowDontHave] = useState(false);

    const history = useNavigate();

    const handleCloseHave = () => setShowReadyHave(false);
    const handleCloseDontHave = () => setShowDontHave(false);

    const seeTheCart = () => history('/cart');
    const seeTheProducts = () => history('/products');

    const addItem = () => {
        const actualCart = JSON.parse(localStorage.getItem('cart'));
        if(actualCart.length) {
            const readyHave = actualCart.some((item) => item.id === Number(id));
            if (readyHave) {
                return setShowReadyHave(true);
            }
            const newActualCart = JSON.stringify([...actualCart, Details]);
            setShowDontHave(true);
            return localStorage.setItem('cart', [newActualCart]);
        }
        const newElementCart = JSON.stringify([Details]);
        setShowDontHave(true);
        return localStorage.setItem('cart', newElementCart);
    };

    const request = async () => {
        console.log(id);
        const response = await getProductsById(id);
        return setDetails(response.data);
    };

    const ModalReadyHave = () => {
        return (<Modal show={showReadyHave} onHide={handleCloseHave}>
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>Você já adicionou esse produto!</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleCloseHave}>
                        OK
                </Button>
                <Button variant="primary" onClick={seeTheCart}>
                      Ver no carrinho
                </Button>
                <Button variant="primary" onClick={seeTheProducts}>
                        Ver mais produtos
                </Button>  
            </Modal.Footer>
        </Modal>);
    };

    const ModalDontHave = () => {
        return (<Modal show={showDontHave} onHide={handleCloseDontHave}>
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>Produto Adicionado!</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleCloseDontHave}>
                        OK
                </Button>
                <Button variant="primary" onClick={seeTheCart}>
                      Ver no carrinho
                </Button>
                <Button variant="primary" onClick={seeTheProducts}>
                        Ver mais produtos
                </Button>  
            </Modal.Footer>
        </Modal>);
    };

    useEffect(() => {
        if (!Details) {
            request();
        }
    }, []);


    
    function render() {
        const { produto, valor, url_image, descricao } = Details;
        return(
            <div  className="Details d-flex flex-wrap justify-content-around container-fluid">
                {ModalReadyHave()}
                {ModalDontHave()}
                <Image className='DetailImage' src={ url_image } />
                <Card className="m-3" style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>{ produto }</Card.Title>
                        <ListGroup variant="flush">
                            <ListGroup.Item>{`por R$${valor} anual`}</ListGroup.Item>
                            <ListGroup.Item>{descricao}</ListGroup.Item>
                        </ListGroup>
                        <Button
                            onClick={addItem}
                            variant="primary">Adicionar Produto no Carrinho</Button>
                    </Card.Body>
                </Card>
            </div>);
    }


    return (
        <div>      
            {Details && render()}
        </div>           
    );

    
}

Details.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.number.isRequired
        })
    }),
};

export default Details;