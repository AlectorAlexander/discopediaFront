/* eslint-disable react/jsx-filename-extension */
import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, ListGroup, Modal, Tab, Tabs } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import PropTypes from 'prop-types';
import Context from '../../context/Context';
import { getDiscsById } from '../../services/BDsRequests';
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
    const seeTheDiscs = () => history('/store');

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
        const response = await getDiscsById(id);
        return setDetails(response.data);
    };

    const ModalReadyHave = () => {
        return (<Modal show={showReadyHave} onHide={handleCloseHave}>
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>Você já adicionou esse disco!</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleCloseHave}>
                        OK
                </Button>
                <Button variant="primary" onClick={seeTheCart}>
                      Ver no carrinho
                </Button>
                <Button variant="primary" onClick={seeTheDiscs}>
                        Ver mais Discos
                </Button>  
            </Modal.Footer>
        </Modal>);
    };

    const ModalDontHave = () => {
        return (<Modal show={showDontHave} onHide={handleCloseDontHave}>
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>title Adicionado!</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleCloseDontHave}>
                        OK
                </Button>
                <Button variant="primary" onClick={seeTheCart}>
                      Ver no carrinho
                </Button>
                <Button variant="primary" onClick={seeTheDiscs}>
                        Ver mais Discos
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
        const { title, artist, url_img, musics, details } = Details;
        const { Carcteristica, Formatos, Gravadora, Lancamento, Observacao, Produtor } = details;
        return(

            <div  className="Details d-flex flex-wrap justify-content-around container-fluid">
                {ModalReadyHave()}
                {ModalDontHave()}

                <div className='d-flex flex-column'>

                    <Tabs
                        defaultActiveKey="Capa"
                        id="uncontrolled-tab-example"
                        className='p-1 mt-4'
                    >

                        <Tab title="Capa" eventKey="Capa" className="p-2" >
                            <Image className='DetailImage rounded' src={ url_img } />
                        </Tab>

                        <Tab title="Musicas" eventKey="Musicas" className="p-2" >
                            {musics.map((ele) => {
                                return (<ListGroup key={ele} variant="flush">
                                    <ListGroup.Item >{ele}</ListGroup.Item>
                                </ListGroup>);
                            })}
                        </Tab>


                    </Tabs>


                </div>
                <Card className="m-3" style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>{ title }</Card.Title>
                        <ListGroup variant="flush">
                            <ListGroup.Item> <h3>{artist}</h3></ListGroup.Item>
                            <ListGroup.Item>{`Carcteristica: ${Carcteristica || ' " . . . " '}`}</ListGroup.Item>
                            <ListGroup.Item>{`Formatos: ${Formatos || ' " . . . " '}`}</ListGroup.Item>
                            <ListGroup.Item>{`Gravadora: ${Gravadora || ' " . . . " '}`}</ListGroup.Item>
                            <ListGroup.Item>{`Lancamento: ${Lancamento || ' " . . . " '}`}</ListGroup.Item>
                            <ListGroup.Item>{`Observacao: ${Observacao || ' " . . . " '}`}</ListGroup.Item>
                            <ListGroup.Item>{`Produtor: ${Produtor || ' " . . . " '}`}</ListGroup.Item>
                        </ListGroup>
                        <Button
                            onClick={addItem}
                            variant="primary">Adicionar na estante</Button>
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