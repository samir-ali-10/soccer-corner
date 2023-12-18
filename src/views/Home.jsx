import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import image1 from "../images/carousel_1.jpeg"
import image2 from "../images/carousel_2.jpeg"
import image3 from "../images/carousel_3.jpeg"
import { Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export default function Home() {
    return (
        <div className='home_page'>
            <Carousel fade>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={image1}
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h2>Soccer Corner</h2>
                        <button>Shop Now</button>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={image2}
                        alt="Second slide"
                    />
                    <Carousel.Caption>
                        <h2>Soccer Corner</h2>
                        <button>Shop Now</button>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={image3}
                        alt="Third slide"
                    />
                    <Carousel.Caption>
                        <h2>Soccer Corner</h2>
                        <button>Shop Now</button>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            <Container>
                <div className="about_section">
                    <h2 className='mb-4'>About Us</h2>
                    <p>Our goal is the bring to your a very well developed and quality product in the field of football and sport. By reviving the spirit of collaboration and sportiveness</p>
                </div>

                <div className="new_collection">
                    <p>new collection</p>
                    <div className="new_collection_container">
                        <div className="item half one_sm">
                            <NavLink to="/products/alahly">
                                <img src={image1} alt="Image1" />
                                <div className="category">Alahly</div>
                            </NavLink>
                        </div>
                        <div className="item half">
                            <NavLink to="/products/zamalek">
                                <img src={image2} alt="Image1" />
                                <div className="category">Zamalek</div>
                            </NavLink>
                        </div>
                        <div className="item">
                            <NavLink to="/products/paris">
                                <img src={image3} alt="Image1" />
                                <div className="category">Paris</div>
                            </NavLink>
                        </div>
                        <div className="item">
                            <NavLink to="/products/barcelona">
                                <img src={image1} alt="Image1" />
                                <div className="category">Barcelona</div>
                            </NavLink>
                        </div>
                        <div className="item">
                            <NavLink to="/products/realMadrid">
                                <img src={image3} alt="Image1" />
                                <div className="category">Real Madrid</div>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}
