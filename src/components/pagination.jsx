import { Pagination } from 'react-bootstrap';
import React from 'react';

export default function({total, current, onChangePage}, page) {
    let items = [];
    if (current > 1) {
        items.push(<Pagination.Prev key="prev" onClick={() => onChangePage(page - 1)} />);
    }
    for (let page = 1; page <= total; page ++) {
        items.push(
            <Pagination.Item key={page} data-page={page} active={page === current} onClick={() => onChangePage(page)}>
                {page}
            </Pagination.Item>
        );
    }

    if (current < total) {
        items.push(<Pagination.prev key="next" onClick={() => onChangePage(page + 1)} />);
    }
}