/* eslint-disable react/jsx-filename-extension */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, ListGroup} from 'react-bootstrap';
import Context from '../../context/Context';
import { useNavigate } from 'react-router';
import PaginationLove from './pagination';
import usePaginationData from '../../hooks/usePagination';

function Discs() {
    const { setDetails, data } = useContext(Context);
    const { page, onChangePage } = usePaginationData();

    const history = useNavigate();

    const pageChangeToDetails = (item, _id) => {
        setDetails(item);
        history(`/store/details/${_id}`);
    };

    return (
        <div className='d-flex justify-content-center flex-column'>
            <div className="disc d-flex flex-wrap justify-content-center container-fluid">
                {data.length > 0 && data[page - 1].map((item, i) => {
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
            <PaginationLove
                total={data.length}
                current={page}
                onChangePage={onChangePage}
            />
        </div>
    );
}

Discs.propTypes = {
    disc: PropTypes.shape().isRequired,
};
  

export default Discs;