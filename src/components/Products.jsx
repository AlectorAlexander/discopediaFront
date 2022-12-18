/* eslint-disable react/jsx-filename-extension */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, ListGroup } from 'react-bootstrap';
import Context from '../context/Context';
import { useNavigate } from 'react-router';

function Products({ Prods }) {
    const { setDetails } = useContext(Context);

    const history = useNavigate();

    const pageChangeToDetails = (item, _id) => {
        setDetails(item);
        history(`/products/details/${_id}`);
    };

    return (
        <div className="Products d-flex flex-wrap justify-content-center container-fluid">
            {Prods && Prods.map((item, i) => {
                const { _id, produto, valor, url_image } = item;
                return (
                    <Card key={ i } className="m-3" style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>{ produto }</Card.Title>
                            <Card.Img alt={ produto } className='cellImage' variant="top" src={url_image} />
                            <ListGroup variant="flush">
                                <ListGroup.Item>{`por R$${valor} anual`}</ListGroup.Item>
                            </ListGroup>
                            <Button onClick={ () => pageChangeToDetails(item, _id)} variant="primary">Ver detalhes</Button>
                        </Card.Body>
                    </Card>
                );
            })}
        </div>
    );
}

Products.propTypes = {
    Prods: PropTypes.shape().isRequired,
};
  

export default Products;