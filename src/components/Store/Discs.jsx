/* eslint-disable react/jsx-filename-extension */
import React, { useContext } from 'react';
import { Button, Card, ListGroup} from 'react-bootstrap';
import { useNavigate } from 'react-router';
import Context from '../../context/Context';
import PaginationLove from './pagination';

function Discs() {
    const {pageStore, setDetails, data } = useContext(Context);

    const history = useNavigate();



    const pageChangeToDetails = (item, _id) => {
        setDetails(item);
        history(`/store/details/${_id}`);
    };

    return (
        <div className='d-flex justify-content-center flex-column'>
            <div className="disc d-flex flex-wrap justify-content-center container-fluid">
                {data.length > 0 && data[pageStore - 1] && data[pageStore - 1].map((item, i) => {
                    const { _id, title, artist, url_img } = item;
                    return (
                        <Card key={ i } className="m-3" style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>{ title }</Card.Title>
                                <Card.Img alt={ title } className='cellImage' variant="top" src={url_img} />
                                <ListGroup variant="flush">
                                    <ListGroup.Item className="cardsTitle">{artist}</ListGroup.Item>
                                </ListGroup>
                                <Button className='buttons' onClick={ () => pageChangeToDetails(item, _id)} variant="danger">Ver detalhes</Button>
                            </Card.Body>
                       
                        </Card>
                    
                    );
                })}
            
            </div>
            <PaginationLove />
        </div>
    );
}

  

export default Discs;