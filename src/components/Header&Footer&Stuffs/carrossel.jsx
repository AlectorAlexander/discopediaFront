import React, { useState, useEffect, useContext } from 'react';
import { Carousel } from 'react-bootstrap';
import Context from '../../context/Context';
import '../../styles/Carousel.css';

function CarouselComponent() {
    const { ImagesHeader } = useContext(Context);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentIndexBackground, setCurrentIndexBackground] = useState(0);

    const backGroundLogic = () => {
        if (currentIndexBackground < 4) {
            return setCurrentIndexBackground((prev) => {
                return prev += 1;
            });

        }
        return setCurrentIndexBackground(0);
    };

    useEffect(() => {
        if (ImagesHeader && ImagesHeader.length > 0) {
            const intervalId = setInterval(() => {
                setCurrentIndex((currentIndex + 1) % ImagesHeader.length);
            }, 6000);
            backGroundLogic();
            return () => clearInterval(intervalId);
        }
    }, [currentIndex, ImagesHeader]);

    const moveBackground = `
    @keyframes moveBackground {
      from {
        background-position: 100% 0;
      }
      to {
        background-position: 0 100%;
      }
    }
  `;
    
    const moveBackground2 = `
  @keyframes moveBackground {
    from {
      background-position: 100% 100%;
    }
    to {
      background-position: 0 0;
    }
  }
`;


    const moveBackground3 = `
@keyframes moveBackground {
  from {
    background-position: 100% 0%;
  }
  to {
    background-position: 0 100%;
  }
}
`;

    const moveBackground4 = `
@keyframes moveBackground {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 100% 100%;
  }
}
`;

    const movesBackGrounds = [moveBackground, moveBackground2, moveBackground3, moveBackground4];

    return (
        ImagesHeader && ImagesHeader.length > 0 && (
            <div>
                <style>{movesBackGrounds[currentIndexBackground]}</style>
                <Carousel
                    bg="dark"
                    activeIndex={currentIndex}
                    controls={false}
                    onSelect={setCurrentIndex}
                    className="carousel-background"
                    style={{
                        backgroundImage: `url(${ImagesHeader[currentIndex]})`,
                        animation: 'moveBackground 130s linear infinite',
                        backgroundSize: '130%',
                    }}
                >
                    {ImagesHeader.map((image, index) => (
                        <Carousel.Item key={index}>
                            <img
                                style={{
                                    width: '35vw',
                                    height: '35vw',
                                    border: 'solid 1px',
                                    borderRadius: '6px',
                                    boxShadow: '10px 10px 20px 0px rgba(0, 0, 0, 0.3)',
                                }}
                                src={image}
                                alt="capa de disco"
                            />
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>
        )
    );
}

export default CarouselComponent;
