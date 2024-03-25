import React, { useEffect, useRef, useState } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import image1 from "../images/carousel_1.jpeg"
import image2 from "../images/temp-2.jpeg"
import image3 from "../images/previous_seasons.jpeg"
import sportswearImage from "../images/sports_wear.jpeg"
import jerseysImage from "../images/jerseys.jpeg"
import studsTurfsImage from "../images/studs_turfs.jpeg"
import previousSeasons from "../images/previous_seasons.jpeg"
import classicJerseys from "../images/classic_jerseys.jpeg"
import { Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

export default function Home({ appearLoginSignupm, setAppearLoginSignup }) {

    const [stock, setStock] = useState([]);

    let getData = () => {
        fetch(`http://localhost:3001/api/products`).then((res) => res.json()).then((data) => setStock(data))
    }

    useEffect(() => {
        getData();
        setAppearLoginSignup(true)
    }, [])

    let addToCart = async (product) => {
        let timerInterval;
        Swal.fire({
            title: "Product Added To Cart",
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading();
            },
            willClose: () => {
                clearInterval(timerInterval);
            }
        }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                console.log("I was closed by the timer");
            }
        });
        let response = await fetch(`http://localhost:3001/api/PostOncart/${product}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({
            })
        })
        return response.json();
    }

    const calculateSalePrice = (product) => {
        // Ensure that price and sale are valid numbers
        if (typeof product.price !== 'number' || typeof product.sale !== 'number') {
            return 'Invalid input';
        }

        // Calculate the sale price
        const salePrice = product.price - (product.price * product.sale) / 100;
        return salePrice.toFixed(2); // Adjust decimal places as needed
    };

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
                        <button>Shop Now</button>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            <Container>
                <div className="new_collection">
                    <p>our products</p>
                    <div className="new_collection_container">
                        <div className="item smsc-w100 lgsc-w50">
                            <NavLink to="/products/footballJerseys">
                                <img src={jerseysImage} alt="Image1" />
                                <div className="category">2023 - 24 Jerseys</div>
                            </NavLink>
                        </div>
                        <div className="item lgsc-w50">
                            <NavLink to="/products/sportsWear">
                                <img src={sportswearImage} alt="Image1" />
                                <div className="category">Sports Wear</div>
                            </NavLink>
                        </div>
                        <div className="item">
                            <NavLink to="/products/classicJerseys">
                                <img src={classicJerseys} alt="Image1" />
                                <div className="category">Classic Jerseys</div>
                            </NavLink>
                        </div>
                        <div className="item">
                            <NavLink to="/products/studs_turfs">
                                <img src={studsTurfsImage} alt="Image1" />
                                <div className="category">Studs & Turfs</div>
                            </NavLink>
                        </div>
                        <div className="item">
                            <NavLink to="/products/previousSeasons">
                                <img src={previousSeasons} alt="Image1" />
                                <div className="category">Previous Seasons</div>
                            </NavLink>
                        </div>
                    </div>
                </div>

                <div className="best_sellers">
                    <h2>Offers</h2>
                    <div className="all_products">
                        <NavLink to="/products/footballJerseys/all">See All</NavLink>
                    </div>
                    <div className="slider_container d-flex">
                        {
                            stock.map(product =>
                                product.sale !== null || 0
                                    ?
                                    <NavLink to={`/products/offers/${product.code}`} key={product._id} className="item">
                                        <div className="image">
                                            <img src={product.images} alt="image1" />
                                        </div>
                                        <div className="info">
                                            <div className="name">{product.code}</div>
                                            <div className='size text-uppercase text-center mb-2 fs-5'>{product.size}</div>
                                            <div className="inner_info d-flex justify-content-between">
                                                {calculateSalePrice(product) === 'Invalid input' ? <div className="price">{product.price}EGP</div> : <div className="price_dashed">{product.price}EGP</div>}
                                                {calculateSalePrice(product) !== 'Invalid input' ? <span>{calculateSalePrice(product)}EGP</span> : null}
                                                <div className="add_cart" onClick={(e) => {
                                                    e.preventDefault();
                                                    addToCart(product.code)
                                                }}><FontAwesomeIcon icon={faCartPlus} /></div>
                                            </div>
                                        </div>
                                    </NavLink>
                                    :
                                    null
                            )
                        }
                    </div>
                </div>

                <div className="best_sellers">
                    <h2>New Collection</h2>
                    <div className="all_products">
                        <NavLink to="/products/footballJerseys/all">See All</NavLink>
                    </div>
                    <div className="slider_container d-flex">
                        {stock.map(newCollection =>
                            newCollection.newCollection === "new"
                                ?
                                <NavLink to={`/products/newCollection/${newCollection.code}`} key={newCollection._id} className={calculateSalePrice(newCollection) === 'Invalid input' ? "item" : "item sale"}>
                                    <div className="image">
                                        <img src={newCollection.images} alt="image2" />
                                    </div>
                                    <div className="info">
                                        <div className="name">{newCollection.code}</div>
                                        <div className='size text-uppercase text-center mb-2 fs-5'>{newCollection.size}</div>
                                        <div className="inner_info d-flex justify-content-between">
                                            {calculateSalePrice(newCollection) === 'Invalid input' ? <div className="price">{newCollection.price}EGP</div> : <div className="price_dashed">{newCollection.price}EGP</div>}
                                            {calculateSalePrice(newCollection) !== 'Invalid input' ? <span>{calculateSalePrice(newCollection)}EGP</span> : null}
                                            <div className="add_cart" onClick={(e) => {
                                                e.preventDefault();
                                                addToCart(newCollection.code)
                                            }}><FontAwesomeIcon icon={faCartPlus} /></div>
                                        </div>
                                    </div>
                                </NavLink>
                                :
                                null
                        )}
                    </div>
                </div>
            </Container>
        </div>
    )
}
