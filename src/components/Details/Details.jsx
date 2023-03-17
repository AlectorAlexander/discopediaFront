/* eslint-disable react/jsx-filename-extension */
import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, ListGroup, Modal, Tab, Tabs } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import PropTypes from 'prop-types';
import Context from '../../context/Context';
import { getDiscsById, UpdateDiscsUser } from '../../services/BDsRequests';
import { useNavigate, useParams } from 'react-router';
import '../../styles/styles.css';

function Details() {
    const { Details, setDetails } = useContext(Context);
    const { id } = useParams();
    const [showReadyHave, setShowReadyHave] = useState(false);
    const [showDontHave, setShowDontHave] = useState(false);

    const history = useNavigate();

    const handleCloseHave = () => setShowReadyHave(false);
    const handleCloseDontHave = () => setShowDontHave(false);

    const seeTheCart = () => history('/discase');
    const seeTheDiscs = () => history('/store');

    const addItemToBD = async () => {
        const { id: userId } = JSON.parse(localStorage.getItem('user'));
        const response = await UpdateDiscsUser(userId, id);
        if (response && response.status === 409) {
            const newElementCart = JSON.stringify([Details]);
            localStorage.setItem('discase', newElementCart);
            return setShowReadyHave(true);
        } else if (response && response.status === 202) {
            return setShowDontHave(true);
        }
    };

    const addItem = async () => {
        const discase = JSON.parse(localStorage.getItem('discase'));
        if (!discase) {
            return addItemToBD();
        }
        if(discase.length) {
            const readyHave = discase.some((item) => item._id === id);
            if (readyHave) {
                return setShowReadyHave(true);
            }
            await addItemToBD();
            const newActualCart = JSON.stringify([...discase, Details]);
            return localStorage.setItem('discase', [newActualCart]);
        }
        const newElementCart = JSON.stringify([Details]);
        setShowDontHave(true);
        return localStorage.setItem('discase', newElementCart);
    };

    const request = async () => {
        const response = await getDiscsById(id);
        window.scroll(0,100);
        return setDetails(response.data);
    };

    const ModalReadyHave = () => {
        const { album_link } = Details;
        return (<Modal show={showReadyHave} onHide={handleCloseHave}>
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>Você já adicionou esse disco!</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleCloseHave}>
                        OK
                </Button>
                <Button variant="primary" onClick={seeTheCart}>
                      Ver na Estante
                </Button>
                <Button variant="primary" onClick={seeTheDiscs}>
                        Ver mais Discos
                </Button>  
                <Button
                    onClick={(() => {window.open(album_link);})}
                    variant="danger">Ouvir o álbum
                </Button>
            </Modal.Footer>
        </Modal>);
    };

    const ModalDontHave = () => {
        const { album_link } = Details;
        return (<Modal show={showDontHave} onHide={handleCloseDontHave}>
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>Novo disco add!</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleCloseDontHave}>
                        OK
                </Button>
                <Button variant="primary" onClick={seeTheCart}>
                      Ver na Estante
                </Button>
                <Button variant="primary" onClick={seeTheDiscs}>
                        Ver mais Discos
                </Button>
                <Button
                    onClick={(() => {window.open(album_link);})}
                    variant="danger">Ouvir o álbum
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
        const { title, artist, url_img, musics, album_link, details } = Details;
        const { Caracteristica, Formatos, Gravadora, Lancamento, Observacao, Produtor } = details;
        return(

            <div  className="Details d-flex flex-wrap justify-content-around container-fluid">
                {ModalReadyHave()}
                {ModalDontHave()}

                <div className='d-flex flex-column table-i'>

                    <Tabs
                        defaultActiveKey="Capa"
                        id="uncontrolled-tab-example"
                        className='p-1 mt-4'
                    >

                        <Tab title="Capa" eventKey="Capa" className="p-2 " >
                            <Image className='DetailImage rounded' src={ url_img } />
                        </Tab>

                        <Tab title="Musicas" eventKey="Musicas" className="p-2" >
                            {musics.map((ele) => {
                                return (<ListGroup key={ele} className="" variant="flush">
                                    <ListGroup.Item>{ele}</ListGroup.Item>
                                </ListGroup>);
                            })}
                        </Tab>


                    </Tabs>


                </div>
                <Card className="m-3 card-details-background" style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title> <p className="titleDetails">{ title }</p></Card.Title>
                        <ListGroup variant="flush">
                            <ListGroup.Item className="list1">{artist}</ListGroup.Item>
                            <ListGroup.Item className="list2">{`Caracteristica: ${Caracteristica || '...'}`}</ListGroup.Item >
                            <ListGroup.Item className="list3">{`Formatos: ${Formatos || ' " . . . " '}`}</ListGroup.Item>
                            <ListGroup.Item className="list4">{`Gravadora: ${Gravadora || ' " . . . " '}`}</ListGroup.Item>
                            <ListGroup.Item className="list5">{`Lancamento: ${Lancamento || ' " . . . " '}`}</ListGroup.Item>
                            <ListGroup.Item className="list6">{`Observacao: ${Observacao || ' " . . . " '}`}</ListGroup.Item>
                            <ListGroup.Item className="list7">{`Produtor: ${Produtor || ' " . . . " '}`}</ListGroup.Item>
                        </ListGroup>
                        <Button
                            className='buttons'
                            onClick={addItem}
                            variant="danger">Adicionar na estante
                        </Button>
                        <Button
                            className='buttons'
                            onClick={(() => {window.open(album_link);})}
                            variant="danger">Link do Álbum
                        </Button>
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