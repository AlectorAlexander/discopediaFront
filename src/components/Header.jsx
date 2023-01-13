/* eslint-disable react/jsx-filename-extension */
import React, { useContext, useEffect, useState } from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import Context from '../context/Context';
import { validateUser } from '../services/BDsRequests';
import CarouselComponent from './carrossel';


function Header() {
    const [admin, setAdmin] = useState(false);
    const history = useNavigate();
    const { setPage } = useContext(Context);

    const Logout = () => {
        setPage('login');
        localStorage.clear();
        history('/');
    };

    const renderTheRightHeader = !admin ? (
        <Nav className="me-auto">
            <Nav.Link href="/cart">Carrinho</Nav.Link>
            <Nav.Link href="/pedidos">Meus Pedidos</Nav.Link>
        </Nav>
    ) : (
        <Nav className="me-auto">
            <Nav.Link href="/admin/products">Administrar Produtos</Nav.Link>
        </Nav>
    );

    useEffect(() => {
        adminOrUser();
    }, []);

    const adminOrUser = async () => {
        const role = await validateUser();
        if (role !== 'Administrador') {
            return setAdmin(false);
        }
        return setAdmin(true);

    };

    return (
        <div className="Header">
            <CarouselComponent /> 
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">Home</Navbar.Brand>
                    {renderTheRightHeader}
                    <Button  onClick={ Logout }>Logout</Button>
                </Container>
            </Navbar>
        </div>
    );
}

export default Header;