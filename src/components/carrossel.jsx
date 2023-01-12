import React, { useState, useEffect, useContext } from 'react';
import { Carousel } from 'react-bootstrap';
import Context from '../context/Context';

function CarouselComponent() {
    const { ImagesHeader } = useContext(Context);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex((currentIndex + 1) % ImagesHeader.length);
        }, 3000);

        // clear the interval on unmount
        return () => clearInterval(intervalId);
    }, [currentIndex, ImagesHeader]);

    return (
        <Carousel bg="dark" activeIndex={currentIndex} onSelect={setCurrentIndex}>
            {ImagesHeader.map((image, index) => (
                <Carousel.Item key={index}>
                    <img src={image} alt="capa de disco" />
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

export default CarouselComponent;
