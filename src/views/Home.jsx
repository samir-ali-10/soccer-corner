import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import carouselImage1 from "../images/carousel_1.jpeg"
import carouselImage2 from "../images/carousel_2.jpeg"
import carouselImage3 from "../images/carousel_3.jpeg"

export default function Home() {
    return (
        <div className='home_page'>
            <Carousel fade>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={carouselImage1}
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h2>Soccer Corner</h2>
                        <button>Button</button>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={carouselImage2}
                        alt="Second slide"
                    />
                    <Carousel.Caption>
                        <h2>Soccer Corner</h2>
                        <button>Button</button>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={carouselImage3}
                        alt="Third slide"
                    />
                    <Carousel.Caption>
                        <h2>Soccer Corner</h2>
                        <button>Button</button>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    )
}
