import React from 'react'
import { useParams } from 'react-router'
import image1 from "../images/carousel_1.jpeg"
import image2 from "../images/carousel_2.jpeg"
import image3 from "../images/carousel_3.jpeg"
import { NavLink } from 'react-router-dom'
import { Container } from 'react-bootstrap'

export default function Products() {

    const alahlyAPI = [
        {
            image: image1,
            price: 300,
            title: "t-shirt one alahly"
        },
        {
            image: image2,
            price: 400,
            title: "t-shirt two alahly"
        },
        {
            image: image3,
            price: 500,
            title: "t-shirt three alahly"
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
                {params.category === "alahly" &&
                    <div className='alahly_products'>
                        <h2>Alahly</h2>
                        <div className="item_container">
                            {alahlyAPI.map((item, index) =>
                                <NavLink to="/" key={index} className='item'>
                                    <div className="image">
                                        <img src={item.image} alt="image1" />
                                    </div>
                                    <div className="info">
                                        <h3>{item.title}</h3>
                                        <p>{item.price}EGP</p>
                                    </div>
                                </NavLink>
                            )}
                        </div>
                    </div>
                }
                {/* {params.category === "zamalek" && <p>zamalek</p>} */}
            </Container>
        </div>
    )
}
