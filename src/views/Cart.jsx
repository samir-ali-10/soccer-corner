import React from 'react'
import { Container } from 'react-bootstrap'
import cartImage from "../images/cart_image.jpg"
import image1 from "../images/carousel_1.jpeg"
import image2 from "../images/carousel_2.jpeg"
import image3 from "../images/carousel_3.jpeg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'

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
                        <div className="image text-center">
                            <img src={cartImage} alt="emptyCart" />
                            <p>Your shopping bag is empty</p>
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
                                            <div className='minus'><FontAwesomeIcon icon={faMinus} /></div>
                                            0
                                            <div className='plus'><FontAwesomeIcon icon={faPlus} /></div>
                                            <div className="remove_item">
                                                <button>remove</button>
                                            </div>
                                        </div>
                                        <div className="price">
                                            {item.price}EGP
                                        </div>
                                    </div>
                                )
                            }
                            <div className="checkout">
                                <NavLink>Proceed To Checkout</NavLink>
                            </div>
                        </div>
                }
            </Container>
        </div>
    )
}
