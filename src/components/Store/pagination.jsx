/* eslint-disable no-unused-vars */
import { Pagination } from 'react-bootstrap';
import { getDiscsForPaginations } from '../../services/BDsRequests';
import React, { useContext, useEffect, useState } from 'react';
import Context from '../../context/Context';
import usePaginationData from '../../hooks/usePagination';

function PaginationLove () {

    const [PagesClicked, setPagesClicked] = useState([]);
    const { pageStore, setLoading, setActualPage, disc, setDisc, pagesLenght, setPagesLenght, data } = useContext(Context);
    const { onChangePage } = usePaginationData();


    const total = pagesLenght; 
    const current = pageStore;

    const paginationUser = async () => {
        const alreadyClick = data[pageStore - 1] !== undefined;
        if (!alreadyClick) {
            setLoading(true);
            const { data } = await getDiscsForPaginations(pageStore, 9);
            console.log(data);
            setActualPage(data);
            setPagesClicked((prev) => prev.concat(pageStore));
            if (!disc || disc.length < 1) {
                return setDisc(data);
            }
            return setDisc((prev) => prev.concat(data));
        }
        return setLoading(false);
    };

    useEffect(() => {
        paginationUser();
    }, [pageStore]);

    /* Esse código é responsável por renderizar as diferentes opções de paginação, como os botões de "Primeira Página", "Anterior", "Próxima", "Última Página" e também os botões de números de página */
    const firstAndPrev = () => {
        /* A primeira coisa que a função faz é criar uma variável chamada "items" que é um array vazio. Este array será preenchido com os componentes que serão renderizados na tela. */
        let items = [];
        /* Em seguida, verifica-se se a página atual é maior que 1, se for, adiciona-se ao array items, um componente "Pagination.First" com a propriedade "key" com o valor "first" e uma função de "onClick" que ao clicar, chama a função "onChangePage" passando como parâmetro o número 1. */
        if(current > 1) {
            items.push(<Pagination.First key="first" onClick={() => onChangePage(1)} />);
        }
        /* Se a página atual é maior que 4, adiciona-se ao array items, um componente "Pagination.Ellipsis" com a propriedade "key" com o valor "ellipsis-start" */
        if (current > 4) {
            items.push(<Pagination.Ellipsis key="ellipsis-start" />);
        }
        /* Usando um loop "for", percorre-se as páginas de "current - 3" até "current + 3" e adiciona-se ao array items, um componente "Pagination.Item" com as propriedades "key" com o valor da página, "data-page" com o valor da página, "active" com o valor se a página é igual à página atual, e uma função de "onClick" que ao clicar, chama a função "onChangePage" passando como parâmetro a página. */
        for (let page = current - 3; page <= current + 3; page ++) {
            if (page > 0 && page <= total) {
                items.push(
                    <Pagination.Item key={page} data-page={page} active={page === current} onClick={() => onChangePage(page)}>
                        {page}
                    </Pagination.Item>
                );
            }
        }
        /* Se a página atual é menor que "total - 3", adiciona-se ao array items, um componente "Pagination.Ellipsis" com a propriedade "key" com o valor "ellipsis-end" */
        if (current < total - 3) {
            items.push(<Pagination.Ellipsis key="ellipsis-end" />);
        }
        /* Se a página atual é menor que o total, adiciona-se ao array items, um componente "Pagination.Last" com a propriedade "key" com o valor "last" e uma função de "onClick" que ao clicar, chama a função "onChangePage" passando como parâmetro o total. */
        if (current < total) {
            items.push(<Pagination.Last key="last" onClick={() => onChangePage(total)} />);
        }
        /* Por fim, retorna-se o array items dentro de um componente React. */
        return (
            <>
                {items}
            </>
        );
    };

    useEffect(() => {
        if (data.length > 0 && data.length !== pagesLenght) {
            setPagesLenght(data.length);
            firstAndPrev();
        }
        
    }, [data]);


    return (
        <Pagination className='d-flex justify-content-center'>
            {firstAndPrev()}
        </Pagination>
    );
}


export default PaginationLove;