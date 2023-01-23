/* eslint-disable react/jsx-filename-extension */
import React, { useContext, useEffect, useState } from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import Context from '../../context/Context';
import { validateUser } from '../../services/BDsRequests';
import { getDiscs } from '../../services/BDsRequests';
import CarouselComponent from './carrossel';


function Header() {
    const [admin, setAdmin] = useState(false);
    const history = useNavigate();
    const { setPage, setImagesHeader, setDisc, disc, setLabel } = useContext(Context);

    const request = async () => {
        const response = await getDiscs();
        const { data } = response;
        data.map( async ({ url_img, details }) => {
            const { Gravadora } = details;
            setLabel((prevLabel) => prevLabel.concat(Gravadora));
            setImagesHeader((prevImages) => prevImages.concat(url_img));
        });
        setImagesHeader((prevImages) => prevImages.sort(() => Math.random() - 0.5));
        
        setLabel((prevLabel) => {
            for (let i = 0; i < prevLabel.length; i++) {
                let organizedLabels = prevLabel[i].split('/');
                prevLabel.splice(i, 1, ...organizedLabels);
            }
            
            return prevLabel.filter((val, index) => prevLabel.indexOf(val) === index)
                .filter((el) => el !== '').sort();
        });
        return setDisc(data);
    };

    useEffect(() => {
        if (!disc) {
            request();
        }
    }, [disc]);

    const Logout = () => {
        setPage('login');
        localStorage.clear();
        history('/');
    };

    const renderTheRightHeader = !admin ? (
        <Nav className="me-auto">
            <Nav.Link style={{  }} href="/cart">Carrinho</Nav.Link>
            <Nav.Link style={{  }} href="/pedidos">Meus Pedidos</Nav.Link>
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
            <Navbar
                className=" brazilian_colors"
                variant="dark"
                style={{ height: '6vw' }}
            >
                <Container>
                    <Navbar.Brand style={{ cursor: 'pointer' }} onClick={() => history('/store')}>Home</Navbar.Brand>
                    {renderTheRightHeader}
                    <Button variant='danger' className='brazilian_colors' onClick={ Logout }>Logout</Button>
                </Container>
            </Navbar>
        </div>
    );
}

export default Header;