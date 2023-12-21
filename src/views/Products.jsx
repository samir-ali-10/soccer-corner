import React from 'react'
import { useParams } from 'react-router'
import image1 from "../images/carousel_1.jpeg"
import image2 from "../images/carousel_2.jpeg"
import image3 from "../images/carousel_3.jpeg"
import { NavLink } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'

export default function Products() {

    const egyptianLeague = [
        {
            image: image1,
            price: 300,
            title: "t-shirt one alahly",
            id: 1,
            quantity: 2
        },
        {
            image: image2,
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
            image: image1,
            price: 500,
            title: "t-shirt three alahly",
            id: 4,
            quantity: 0
        },
        {
            image: image2,
            price: 500,
            title: "t-shirt three alahly",
            id: 5,
            quantity: 0
        },
    ]

    const zamalekAPI = [
        {
            image: image2,
            price: 300,
            title: "t-shirt one zamalek"
        },
        {
            image: image3,
            price: 400,
            title: "t-shirt two zamalek"
        },
        {
            image: image1,
            price: 500,
            title: "t-shirt three zamalek"
        },
    ]

    let params = useParams();

    return (
        <div className='products'>
            <Container>
                {params.category === "footballJerseys" &&
                    <div className='football_jerseys'>
                        <div className="egyptian_league">
                            <h2>Egyptian League</h2>
                            <div className="add_cart">
                                <button>All Products</button>
                            </div>
                            <div className="slider_container d-flex">
                                {egyptianLeague.map(item =>
                                    <NavLink key={item.id} className="item">
                                        <div className="image">
                                            <img src={item.image} alt="image1" />
                                        </div>
                                        <div className="info">
                                            <div className="name">{item.title}</div>
                                            <div className="inner_info d-flex justify-content-between">
                                                <div className="price">{item.price}EGP</div>
                                                <div className="add_cart"><FontAwesomeIcon icon={faCartPlus} /></div>
                                            </div>
                                        </div>
                                    </NavLink>
                                )}
                            </div>
                        </div>
                    </div>
                }
                {/* {params.category === "zamalek" && <p>zamalek</p>} */}
            </Container>
        </div>
    )
}