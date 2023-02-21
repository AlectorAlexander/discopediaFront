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
    const { setPage,   setImagesHeader,  setPagesLenght,  setLabel } = useContext(Context);

    const request = async () => {
        const { data } = await getDiscs();
        setImagesHeader([]);
        let randomNumber = Math.floor(Math.random() * 10) + 1;
        data.map(({ url_img, details }, i) => {
            const { Gravadora } = details;
            setLabel((prevLabel) => prevLabel.concat(Gravadora));
            if (randomNumber === i) {
                setImagesHeader((prevImages) => prevImages.concat(url_img));
                randomNumber += 12;
            }

        });
        
        setLabel((prevLabel) => {
            for (let i = 0; i < prevLabel.length; i++) {
                let organizedLabels = prevLabel[i].split('/');
                prevLabel.splice(i, 1, ...organizedLabels);
            }
            
            return prevLabel.filter((val, index) => prevLabel.indexOf(val) === index)
                .filter((el) => el !== '').sort();
        });
        if (data.length % 9 !== 0) {
            setPagesLenght(parseInt(data.length / 9) + 1);
        } else {
            setPagesLenght(data.length / 9);
        }
    };

    useEffect(() => {
        request();
    }, []);

  

    const Logout = () => {
        setPage('login');
        localStorage.clear();
        history('/');
    };

    const renderTheRightHeader = !admin ? (
        <Nav className="me-auto">
            <Nav.Link style={{  }} href="/discase">Minha Estante</Nav.Link>
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