import React, { useState, useEffect, useContext } from 'react';
import { Carousel } from 'react-bootstrap';
import Context from '../../context/Context';

function CarouselComponent() {
    const { ImagesHeader } = useContext(Context);
    const [currentIndex, setCurrentIndex] = useState(0);



    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex((currentIndex + 1) % ImagesHeader.length);
        }, 6000);
        return () => clearInterval(intervalId);
    }, [currentIndex, ImagesHeader]);

    return (
        <Carousel
            bg="dark"
            activeIndex={currentIndex}
            controls={false}
            onSelect={setCurrentIndex}
            style={{
                backgroundImage: `url(${ImagesHeader[currentIndex]})`,
                backgroundSize: 'cover',
                animation: 'moveBackground 9s linear infinite'
            }}>
            {ImagesHeader.map((image, index) => (
                <Carousel.Item key={index}>
                    <img style={{
                        width: '35vw',
                        height: '35vw',
                        border: 'solid 1px',
                        borderRadius: '6px',
                        boxShadow: '10px 10px 20px 0px rgba(0, 0, 0, 0.3)'
                    }} src={image} alt="capa de disco" />
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

export default CarouselComponent;
