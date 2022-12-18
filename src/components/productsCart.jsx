/* eslint-disable react/jsx-filename-extension */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Button, Table } from 'react-bootstrap';
import Context from '../context/Context';

function ProductsCart({ carrinho, removeItem, Total }) {
    const totalPorAno = `R$${(Total).replace('.', ',')} Por Ano`;
    const totalPorMês = `R$${(((Total / 12).toFixed(2))).replace('.', ',')} Por Mês`;
    const {setShow} = useContext(Context);


    const finishHim = () => {
        setShow(true);
    };

    return(
        <div  className="ProductsCart d-flex flex-wrap justify-content-around container-fluid">
            <Table className="mt-5">
                <thead>
                    <tr>
                        <th>Produto</th>
                        <th>Valor Anual</th>
                        <th>Valor Mensal</th>
                        <th>Remover Item</th>
                    </tr>
                </thead>
                {carrinho.length > 0 && carrinho.map((product, i) => {
                    const { _id, produto, valor } = product;
                    const valuePerMonth = (valor / 12).toFixed(2, 2);
                    return (
                        <tbody
                            key={ i }
                        >
                            <tr>
                                <td
                                >
                                    { produto }

                                </td>
                                
                                <td
                                >
                                    { valor.toFixed(2, 2).replace('.', ',') }

                                </td>
                                <td
                                >
                                    {valuePerMonth.replace('.', ',') }

                                </td>
                                <td>
                                    {' '}
                                    <Button
                                        type="button"
                                        onClick={ removeItem }
                                        value={ _id }
                                    >
                                        {' '}
                    Remover Item

                                    </Button>
                                </td>
                            </tr>
                        </tbody>
                    );
                })}
            </Table>
            <div>
                <h1>{` ${totalPorMês}`}</h1>
                <h1>{` Ou ${totalPorAno}`}</h1>
            </div>
            <Button onClick={ finishHim } className='h-25'>Finalizar compra</Button>
        </div>);
}

ProductsCart.propTypes = {
    carrinho: PropTypes.shape().isRequired,
    removeItem: PropTypes.func.isRequired,
    Total: PropTypes.string.isRequired,
};
    

export default ProductsCart;