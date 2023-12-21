import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import image1 from "../images/carousel_1.jpeg"
import image2 from "../images/carousel_2.jpeg"
import image3 from "../images/carousel_3.jpeg"
import { Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
    return (
        <div className='home_page'>
            <Carousel>
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
                <div className="new_collection">
                    <p>new collection</p>
                    <div className="new_collection_container">
                        <div className="item">
                            <NavLink to="/products/footballJerseys">
                                <img src={image1} alt="Image1" />
                                <div className="category">Football Jerseys</div>
                            </NavLink>
                        </div>
                        <div className="item">
                            <NavLink to="/products/sportsWear">
                                <img src={image2} alt="Image1" />
                                <div className="category">Sports Wear</div>
                            </NavLink>
                        </div>
                        <div className="item">
                            <NavLink to="/products/studs_turfs">
                                <img src={image3} alt="Image1" />
                                <div className="category">Studs & Turfs</div>
                            </NavLink>
                        </div>
                        <div className="item">
                            <NavLink to="/products/others">
                                <img src={image1} alt="Image1" />
                                <div className="category">Others</div>
                            </NavLink>
                        </div>
                    </div>
                </div>

                <div className="best_sellers">
                    <h2>Best Sellers</h2>
                    <div className="all_products">
                        <button>All Products</button>
                    </div>
                    <div className="slider_container d-flex">
                        <div className="item">
                            <div className="image">
                                <img src={image1} alt="image1" />
                            </div>
                            <div className="info">
                                <div className="name">ahly t-shirt one</div>
                                <div className="inner_info d-flex justify-content-between">
                                    <div className="price">300EGP</div>
                                    <div className="add_cart"><FontAwesomeIcon icon={faCartPlus} /></div>
                                </div>
                            </div>
                        </div>
                        <div className="item">
                            <div className="image">
                                <img src={image2} alt="image2" />
                            </div>
                            <div className="info">
                                <div className="name">ahly t-shirt one</div>
                                <div className="inner_info d-flex justify-content-between">
                                    <div className="price">300EGP</div>
                                    <div className="add_cart"><FontAwesomeIcon icon={faCartPlus} /></div>
                                </div>
                            </div>
                        </div>
                        <div className="item">
                            <div className="image">
                                <img src={image3} alt="image3" />
                            </div>
                            <div className="info">
                                <div className="name">ahly t-shirt one</div>
                                <div className="inner_info d-flex justify-content-between">
                                    <div className="price">300EGP</div>
                                    <div className="add_cart"><FontAwesomeIcon icon={faCartPlus} /></div>
                                </div>
                            </div>
                        </div>
                        <div className="item">
                            <div className="image">
                                <img src={image2} alt="image1" />
                            </div>
                            <div className="info">
                                <div className="name">ahly t-shirt one</div>
                                <div className="inner_info d-flex justify-content-between">
                                    <div className="price">300EGP</div>
                                    <div className="add_cart"><FontAwesomeIcon icon={faCartPlus} /></div>
                                </div>
                            </div>
                        </div>
                        <div className="item">
                            <div className="image">
                                <img src={image2} alt="image1" />
                            </div>
                            <div className="info">
                                <div className="name">ahly t-shirt one</div>
                                <div className="inner_info d-flex justify-content-between">
                                    <div className="price">300EGP</div>
                                    <div className="add_cart"><FontAwesomeIcon icon={faCartPlus} /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}
