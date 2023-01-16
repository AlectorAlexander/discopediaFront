/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';

function PedidosCheckout({ Pedidos, Total }) {
    const totalPorAno = `R$${(Total).replace('.', ',')} Por Ano`;
    const totalPorMês = `R$${(((Total / 12).toFixed(2))).replace('.', ',')} Por Mês`;

    return(
        <div  className="Pedidos d-flex flex-wrap justify-content-around container-fluid">
            <Table className="mt-5">
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Modelo</th>
                        <th>Valor Anual</th>
                        <th>Valor Mensal</th>
                    </tr>
                </thead>
                {Pedidos.length > 0 && Pedidos.map((product, i) => {
                    const { id, produto, valor } = product;
                    const valuePerMonth = (valor / 12).toFixed(2, 2);
                    return (
                        <tbody
                            key={ i }
                        >
                            <tr>
                                <td
                                >
                                    { id }

                                </td>
                                <td
                                >
                                    { produto }

                                </td>
                                
                                <td
                                >
                                    { valor.replace('.', ',') }

                                </td>
                                <td
                                >
                                    {valuePerMonth.replace('.', ',') }

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
        </div>);
}

PedidosCheckout.propTypes = {
    Pedidos: PropTypes.shape().isRequired,
    Total: PropTypes.string.isRequired,
};
    

export default PedidosCheckout;