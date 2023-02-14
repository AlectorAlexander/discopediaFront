import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

function Cards({ item, pageChangeToDetails }) {
    const { _id, title, artist, url_img } = item;

    return (
        <Card className="m-3" style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Img
                    alt={title}
                    className='cellImage'
                    variant="top"
                    src={url_img}
                />
                <ListGroup variant="flush">
                    <ListGroup.Item className="cardsTitle">{artist}</ListGroup.Item>
                </ListGroup>
                <Button
                    className='buttons'
                    onClick={() => pageChangeToDetails(item, _id)}
                    variant="danger"
                >
          Ver detalhes
                </Button>
            </Card.Body>
        </Card>
    );
}

Cards.propTypes = {
    item: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        artist: PropTypes.string.isRequired,
        url_img: PropTypes.string.isRequired,
    }).isRequired,
    pageChangeToDetails: PropTypes.func.isRequired,
};

export default Cards;
