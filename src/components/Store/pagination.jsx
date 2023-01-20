/* eslint-disable no-unused-vars */
import { Pagination } from 'react-bootstrap';
import React, { useContext } from 'react';
import Context from '../../context/Context';
import usePaginationData from '../../hooks/usePagination';

function PaginationLove () {

    const { pageStore, data } = useContext(Context);
    const { onChangePage } = usePaginationData();


    const total = data.length; 
    const current = pageStore;

    const firstAndPrev = () => {
        let items = [];
        if(current > 1) {
            items.push(<Pagination.Prev key="prev" onClick={() => onChangePage(current - 1)} />);
        }
        for (let page = 1; page <= total; page ++)
            items.push(
                <Pagination.Item key={page} data-page={page} active={page === current} onClick={() => onChangePage(page)}>
                    {page}
                </Pagination.Item>
            );

        if (current < total) {
            items.push(
                <Pagination.Next key="next" onClick={() => onChangePage(current + 1)} />
            );
        }
        return (
            <>
                {items}
            </>
        );
    };

    return (
        <Pagination className='d-flex justify-content-center'>
            {firstAndPrev()}
        </Pagination>
    );
}


export default PaginationLove;