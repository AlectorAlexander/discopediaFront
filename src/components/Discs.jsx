/* eslint-disable react/jsx-filename-extension */
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, ListGroup} from 'react-bootstrap';
import Context from '../context/Context';
import { useNavigate } from 'react-router';
import PaginationLove from './pagination';

function Discs({ disc }) {
    const { setDetails } = useContext(Context);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    let callsFunctionControll = 0;

    // AQUI HÁ DRAGÕES
    // lógica criada pra criação da páginação. O objetivo é que apareçam apenas 9 discos por página
    const paginationParty = () => {
        for (let discsArraySize = 9; discsArraySize < disc.length; discsArraySize += 9) {
            const nineDiscs = [];
            const leftOver = [];

            // se no próximo ciclo de repetição, não houverem 9 discos disponíveis, ele vai pegar apenas os discos q restam
            const bugControll = discsArraySize + 9;
            if (bugControll > disc.length ) {
                for (let index = (discsArraySize - 1); index < disc.length; index++) {
                    leftOver.push(disc[index]);
                    if ((index + 1) === disc.length) {
                        setData((prev) => {
                            return  [...prev, leftOver];
                        });
                    }
                }
            
            } else {
                for (let index = (discsArraySize - 9); index < discsArraySize; index++) {
                    nineDiscs.push(disc[index]);
                    if ((index + 1) === discsArraySize) {
                        if (discsArraySize > 9) {
                            setData((prev) => {
                                return  [...prev, nineDiscs];
                            });
                            break;
                        } else {
                            setData([nineDiscs]);
                            break;
                        }
                    }
                }
            }
        }
        callsFunctionControll += 1;
    };

    const onChangePage = (page) => {
        window.scroll(0, 0);
        setPage(page);
    };


    useEffect(() => {
        if(callsFunctionControll === 0) {
            paginationParty();
        }
    }, []
    );

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