import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import image1 from "../images/ahly_1.jpeg"
import image2 from "../images/ahly_2.jpeg"
import image3 from "../images/ahly_3.jpeg"
import image4 from "../images/ahly_4.jpeg"
import image5 from "../images/ahly_5.jpeg"
import studsTurfsOne from "../images/studs_turfs_1.jpeg"
import studsTurfsTwo from "../images/studs_turfs_2.jpeg"
import studsTurfsThree from "../images/studs_turfs_3.jpeg"
import studsTurfsFour from "../images/studs_turfs_4.jpeg"
import { NavLink } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'

export default function ProductsAll() {

    let params = useParams();

    const [stock, setStock] = useState([]);

    let sizes = ["S", "M", "L", "XL", "XXL"]

    const [activeSize, setActiveSize] = useState(null);

    const egyptianLeague = [
        {
            image: image1,
            price: 300,
            title: "t-shirt one alahly",
            id: 1,
            quantity: 2,
            sizes: ["s", "m", "l", "xl", "xxl"]
        },
        {
            image: image2,
            price: 400,
            title: "t-shirt two alahly",
            id: 2,
            quantity: 5,
            sizes: ["s", "m", "l", "xl", "xxl"]
        },
        {
            image: image3,
            price: 500,
            title: "t-shirt three alahly",
            id: 3,
            quantity: 0,
            sizes: ["s", "m", "l", "xl", "xxl"]
        },
        {
            image: image4,
            price: 500,
            title: "t-shirt three alahly",
            id: 4,
            quantity: 0,
            sizes: ["s", "m", "l", "xl", "xxl"]
        },
        {
            image: image5,
            price: 500,
            title: "t-shirt three alahly",
            id: 5,
            quantity: 0,
            sizes: ["s", "m", "l", "xl", "xxl"]
        },
    ]

    const serieA = [
        {
            image: image2,
            price: 300,
            title: "t-shirt one alahly",
            id: 1,
            quantity: 2
        },
        {
            image: image1,
            price: 400,
            title: "t-shirt two alahly",
            id: 2,
            quantity: 5
        },
        {
            image: image3,
            price: 500,
            title: "t-shirt three alahly",
            id: 3,
            quantity: 0
        },
        {
            image: image2,
            price: 500,
            title: "t-shirt three alahly",
            id: 4,
            quantity: 0
        },
        {
            image: image3,
            price: 500,
            title: "t-shirt three alahly",
            id: 5,
            quantity: 0
        },
    ]

    const studsTurfs = [
        {
            image: studsTurfsOne,
            price: 300,
            title: "Studs and Turfs One",
            id: 1
        },
        {
            image: studsTurfsTwo,
            price: 400,
            title: "Studs and Turfs Two",
            id: 2
        },
        {
            image: studsTurfsThree,
            price: 500,
            title: "Studs and Turfs Three",
            id: 3
        },
        {
            image: studsTurfsFour,
            price: 500,
            title: "Studs and Turfs Four",
            id: 4
        },
        {
            image: studsTurfsTwo,
            price: 500,
            title: "Studs and Turfs Five",
            id: 5
        },
    ]

    const sportsWear = [
        {
            image: image1,
            price: 300,
            title: "Sports Wear One",
            id: 1
        },
        {
            image: image2,
            price: 400,
            title: "Sports Wear Two",
            id: 2
        },
        {
            image: image3,
            price: 500,
            title: "Sports Wear Three",
            id: 3
        },
        {
            image: image4,
            price: 500,
            title: "Sports Wear Four",
            id: 4
        },
        {
            image: image5,
            price: 500,
            title: "Sports Wear Five",
            id: 5
        },
    ]

    let getData = () => {
        fetch(`http://localhost:3001/api/products`).then((res) => res.json()).then((data) => setStock(data))
    }

    useEffect(() => {
        getData();
    }, [])

    let handleActive = (index) => {
        setActiveSize(index === activeSize ? null : index);
    }

    return (
        <div className='products_all'>
            <Container>
                {params.category === "footballJerseys" &&
                    <div className='football_jerseys'>
                        <div className="egyptian_league">
                            <h2>Egyptian League</h2>
                            <div className="items_container">
                                {stock.map((egypt) => egypt.league === "egyptian"
                                    ?
                                    <NavLink key={egypt.code} className="item">
                                        <div className="image">
                                            <img src={image1} alt="image1" />
                                        </div>
                                        <div className="info">
                                            <div className="name">{egypt.code}</div>
                                            <div className="price">{egypt.price}EGP</div>
                                            <div className="sizes">
                                                {sizes.map((size, index) =>
                                                    <button key={index} className={index === activeSize ? "active" : ""} onClick={() => handleActive(index)} >{size.toLocaleUpperCase()}</button>
                                                )}
                                            </div>
                                            <button className='add_to_cart'>Add to cart</button>
                                        </div>
                                    </NavLink>
                                    :
                                    null
                                )}
                            </div>
                        </div>
                        <div className="serie_a">
                            <h2>Serie A</h2>
                            <div className="items_container">
                                {stock.map((serieA) => serieA.league === "serie a"
                                    ?
                                    <NavLink key={serieA.code} className="item">
                                        <div className="image">
                                            <img src={image1} alt="image1" />
                                        </div>
                                        <div className="info">
                                            <div className="name">{serieA.code}</div>
                                            <div className="price">{serieA.price}EGP</div>
                                            <div className="sizes">
                                                {sizes.map((size, index) =>
                                                    <button key={index} className={index === activeSize ? "active" : ""} onClick={() => handleActive(index)} >{size.toLocaleUpperCase()}</button>
                                                )}
                                            </div>
                                            <button className='add_to_cart'>Add to cart</button>
                                        </div>
                                    </NavLink>
                                    :
                                    null
                                )}
                            </div>
                        </div>
                        <div className="spanish_league">
                            <h2>Spanish League</h2>
                            <div className="items_container">
                                {stock.map((spanish) => spanish.league === "spanish"
                                    ?
                                    <NavLink key={spanish.code} className="item">
                                        <div className="image">
                                            <img src={image1} alt="image1" />
                                        </div>
                                        <div className="info">
                                            <div className="name">{spanish.code}</div>
                                            <div className="price">{spanish.price}EGP</div>
                                            <div className="sizes">
                                                {sizes.map((size, index) =>
                                                    <button key={index} className={index === activeSize ? "active" : ""} onClick={() => handleActive(index)} >{size.toLocaleUpperCase()}</button>
                                                )}
                                            </div>
                                            <button className='add_to_cart'>Add to cart</button>
                                        </div>
                                    </NavLink>
                                    :
                                    null
                                )}
                            </div>
                        </div>
                    </div>
                }
                {params.category === "studs_turfs" &&
                    <div className='studs_turfs'>
                        <h2>Studs & Turfs</h2>
                        <div className="items_container">
                            {studsTurfs.map(item =>
                                <NavLink key={item.id} className="item">
                                    <div className="image">
                                        <img src={item.image} alt="image1" />
                                    </div>
                                    <div className="info">
                                        <div className="name">{item.title}</div>
                                        <div className="price">Price: {item.price}EGP</div>
                                        <div className="sizes">
                                            <button className={activeSize === "s" ? "active" : ""} onClick={() => handleActive("s")}>S</button>
                                            <button className={activeSize === "m" ? "active" : ""} onClick={() => handleActive("m")}>M</button>
                                            <button className={activeSize === "l" ? "active" : ""} onClick={() => handleActive("l")}>L</button>
                                            <button className={activeSize === "xl" ? "active" : ""} onClick={() => handleActive("xl")}>XL</button>
                                            <button className={activeSize === "xxl" ? "active" : ""} onClick={() => handleActive("xxl")}>XXL</button>
                                        </div>
                                        <button className='add_to_cart'>Add to cart</button>
                                    </div>
                                </NavLink>
                            )}
                        </div>
                    </div>
                }
                {params.category === "sportsWear" &&
                    <div className='sports_wear'>
                        <h2>Sports Wear</h2>
                        <div className="items_container">
                            {sportsWear.map(item =>
                                <NavLink key={item.id} className="item">
                                    <div className="image">
                                        <img src={item.image} alt="image1" />
                                    </div>
                                    <div className="info">
                                        <div className="name">{item.title}</div>
                                        <div className="price">Price: {item.price}EGP</div>
                                        <div className="sizes">
                                            <button className={activeSize === "s" ? "active" : ""} onClick={(item) => handleActive("s")}>S</button>
                                            <button className={activeSize === "m" ? "active" : ""} onClick={(item) => handleActive("m")}>M</button>
                                            <button className={activeSize === "l" ? "active" : ""} onClick={(item) => handleActive("l")}>L</button>
                                            <button className={activeSize === "xl" ? "active" : ""} onClick={(item) => handleActive("xl")}>XL</button>
                                            <button className={activeSize === "xxl" ? "active" : ""} onClick={(item) => handleActive("xxl")}>XXL</button>
                                        </div>
                                        <button className='add_to_cart'>Add to cart</button>
                                    </div>
                                </NavLink>
                            )}
                        </div>
                    </div>
                }
                {params.category === "others" &&
                    <div className='others'>
                        <h2>Others</h2>
                        <div className="items_container">
                            {sportsWear.map(item =>
                                <NavLink key={item.id} className="item">
                                    <div className="image">
                                        <img src={item.image} alt="image1" />
                                    </div>
                                    <div className="info">
                                        <div className="name">{item.title}</div>
                                        <div className="price">Price: {item.price}EGP</div>
                                        <div className="sizes">
                                            <button className={activeSize === "s" ? "active" : ""} onClick={(item) => handleActive("s")}>S</button>
                                            <button className={activeSize === "m" ? "active" : ""} onClick={(item) => handleActive("m")}>M</button>
                                            <button className={activeSize === "l" ? "active" : ""} onClick={(item) => handleActive("l")}>L</button>
                                            <button className={activeSize === "xl" ? "active" : ""} onClick={(item) => handleActive("xl")}>XL</button>
                                            <button className={activeSize === "xxl" ? "active" : ""} onClick={(item) => handleActive("xxl")}>XXL</button>
                                        </div>
                                        <button className='add_to_cart'>Add to cart</button>
                                    </div>
                                </NavLink>
                            )}
                        </div>
                    </div>
                }
            </Container>
        </div>
    )
}
