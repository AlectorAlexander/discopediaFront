/* eslint-disable react/jsx-filename-extension */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, ListGroup } from 'react-bootstrap';
import Context from '../context/Context';
import { useNavigate } from 'react-router';

function Discs({ disc }) {
    const { setDetails } = useContext(Context);


    const history = useNavigate();

    const pageChangeToDetails = (item, _id) => {
        setDetails(item);
        history(`/store/details/${_id}`);
    };

    return (
        <div className="disc d-flex flex-wrap justify-content-center container-fluid">
            {disc && disc.map((item, i) => {
                const { _id, title, artist, url_img } = item;
                return (
                    <Card key={ i } className="m-3" style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>{ title }</Card.Title>
                            <Card.Img alt={ title } className='cellImage' variant="top" src={url_img} />
                            <ListGroup variant="flush">
                                <ListGroup.Item>{artist}</ListGroup.Item>
                            </ListGroup>
                            <Button onClick={ () => pageChangeToDetails(item, _id)} variant="primary">Ver detalhes</Button>
                        </Card.Body>
                    </Card>
                );
            })}
        </div>
    );
}

Discs.propTypes = {
    disc: PropTypes.shape().isRequired,
};
  

export default Discs;