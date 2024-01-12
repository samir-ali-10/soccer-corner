import { faLeftLong } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import image3 from "../../images/carousel_3.jpeg"

export default function New() {

    const [cart, setCart] = useState([]);

    let getCartItems = () => {
        fetch(`http://localhost:3001/api/products/cart`).then((res) => res.json()).then((data) => setCart(data));
    }

    useEffect(() => {
        getCartItems();
    }, [cart])

    return (
        <div className='new_orders_new text-white mt-4'>
            <Container>
                <div className="back_to_admin mb-5">
                    <NavLink to="/adminSecret" className="back_to_admin"><FontAwesomeIcon icon={faLeftLong} />Back to admin dashboard</NavLink>
                </div>
                <h2 className='text-center'>New Orders</h2>
                {
                    cart.length === 0
                        ?
                        <div className="image text-center text-capitalize mt-5">
                            <h1>There are no new orders</h1>
                        </div>
                        :
                        <div className="new_orders_container">
                            {
                                cart.map(item =>
                                    <div key={item._id} className="new_item">
                                        <div className="info d-flex justify-content-around align-items-center">
                                            <div className="image">
                                                <img src={image3} alt="image1" />
                                            </div>
                                            <div className="content">
                                                <div className="code">
                                                    <h5>{item.code}</h5>
                                                </div>
                                                <p>{item.size.toUpperCase()}</p>
                                            </div>
                                            <div className="price">
                                                {item.price}EGP
                                            </div>
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
