import React from 'react'
import { Container } from 'react-bootstrap'
import cartImage from "../images/cart_image.jpg"
import image1 from "../images/carousel_1.jpeg"
import image2 from "../images/carousel_2.jpeg"
import image3 from "../images/carousel_3.jpeg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'

export default function Cart() {

    const alahlyAPI = [
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
    ]

    return (
        <div className='cart'>
            <h2>Shopping Cart</h2>
            <Container>
                {
                    alahlyAPI.length === 0
                        ?
                        <div className="image">
                            <img src={cartImage} alt="emptyCart" />
                        </div>
                        :
                        <div className="cart_items">
                            {
                                alahlyAPI.map(item =>
                                    <div key={item.id} className="cart_item">
                                        <div className="info d-flex">
                                            <div className="image me-4">
                                                <img src={item.image} alt="image1" />
                                            </div>
                                            <div className="content">
                                                <h5>{item.title}</h5>
                                            </div>
                                        </div>
                                        <div className="quantity">
                                            <FontAwesomeIcon icon={faMinus} />
                                            0
                                            <FontAwesomeIcon icon={faPlus} />
                                            <div className="remove_item">
                                                <button>remove</button>
                                            </div>
                                        </div>
                                        <div className="price">
                                            {item.price}
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                }
            </Container>
        </div>
    )
}
