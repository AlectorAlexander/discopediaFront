/* eslint-disable react/jsx-filename-extension */
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, ListGroup} from 'react-bootstrap';
import Context from '../../context/Context';
import { useNavigate } from 'react-router';
import PaginationLove from './pagination';

function Discs({ disc }) {
    
    const { setDetails } = useContext(Context);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [callsFunctionControll, setControll] = useState(0);
    const [discsSize, setDiscsSize] = useState(0);

    let sizeOfData = 0;
    const paginationLessThenNineCards = () => {
        const leftOver = disc.slice((sizeOfData -1), disc.length - 1);
        sizeOfData += leftOver.length;
        setData((prev) => {
            
            return  [...prev, leftOver];
        }, setDiscsSize(disc.length));
    };

    const paginationParty = () => {
        setControll((prev) => prev += 1);
        const discsLeftOver = disc.length % 9;
        const justNineDiscs = (disc.length - discsLeftOver);
        for (let i = 0; i < justNineDiscs ; i += 9) {
            if (sizeOfData >= justNineDiscs) {
                break;
            }
            const nineDiscs = [];
            for (let index = i; index < i + 9; index++) {
                const element = disc[index];
                nineDiscs.push(element);
                sizeOfData += 1;
            }
            setData((prev) => {
                return  [...prev, nineDiscs];
            });
        }
        sizeOfData < disc.length && paginationLessThenNineCards();
    };


    useEffect(() => {
        console.log(disc);
        console.log(discsSize);
        if (callsFunctionControll === 0 && disc.length) {
            paginationParty();
        } 
        if (discsSize > disc.length) {
            sizeOfData = 0;
            paginationParty();
        }
    }, [disc]
    );

    const onChangePage = (page) => {
        window.scroll(0, 0);
        setPage(page);
    };

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