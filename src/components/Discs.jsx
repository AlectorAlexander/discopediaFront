/* eslint-disable react/jsx-filename-extension */
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, ListGroup} from 'react-bootstrap';
import Context from '../context/Context';
import { useNavigate } from 'react-router';

function Discs({ disc }) {
    const { setDetails } = useContext(Context);
    const [data, setData] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [page, setPage] = useState(0);


    // lógica criada pra criação da páginação. O objetivo é que apareçam apenas 9 discos por página
    useEffect(() => {
        for (let discsArraySize = 9; discsArraySize < disc.length; discsArraySize + 9) {
            if ((discsArraySize + 9) > disc.length ) {
                for (let index = (discsArraySize - 1); index < disc.length; index++) {
                    const leftOver = [];
                    leftOver.push(disc[index]);
                    if ((index + 1) === disc.length) {
                        setData([...data, leftOver]);
                    }
                }
            
            } else {
                for (let index = (discsArraySize - 9); index < discsArraySize; index++) {
                    const nineDiscs = [];
                    nineDiscs.push(disc[index]);
                    if (index === discsArraySize) {
                        if (data.length > 0) {
                            setData([...data, nineDiscs]);
                        } else {
                            setData(nineDiscs);
                        }
                    }
                }
            }
        }
    }, []
    );

    const history = useNavigate();

    const pageChangeToDetails = (item, _id) => {
        setDetails(item);
        history(`/store/details/${_id}`);
    };

    return (
        <div className="disc d-flex flex-wrap justify-content-center container-fluid">
            {data.length > 0 && data[page].map((item, i) => {
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