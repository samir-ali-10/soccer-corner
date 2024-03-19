import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import cartImage from "../images/cart_image.jpg"
import image1 from "../images/carousel_1.jpeg"
import image2 from "../images/carousel_2.jpeg"
import image3 from "../images/carousel_3.jpeg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { decreaseQuantity, getTotals, increaseQuantity } from '../rtk/features/cart/cartSlice'

export default function Cart() {

    const [cart, setCart] = useState([]),
        [totalPrice, setTotalPrice] = useState(),
        [totalQuantity, setTotalQuantity] = useState(0),
        [error, setError] = useState(false);


    let getCartItems = () => {
        fetch(`http://localhost:3001/api/ProductsOncart`).then((res) => res.json()).then((data) => setCart(data));
    }

    let removeSingleProduct = (product) => {
        fetch(`http://localhost:3001/api/deleteproductFromCart/${product}`).then((res) => res.json()).then((data) => console.log(data));
        window.location.reload()
    }

    let removeAllProducts = () => {
        fetch(`http://localhost:3001/api/deleteproductsFromCart`).then((res) => res.json()).then((data) => console.log(data));
        window.location.reload()
    }

    let increaseQuantity = async (product) => {
        let response;
        try {
            response = await fetch(`http://localhost:3001/api/increaseQuantity/${product}`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify({})
            });
            setError(false);

            // Check if response is not successful
            if (!response.ok) {
                // Throw an error with the response status
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            return response.json();
        } catch (error) {
            // Log the error and response
            setError(true);
            // Rethrow the error to maintain the error flow
            // throw error;
        }
    }

    let decreaseQuantity = async (product) => {
        let response = await fetch(`http://localhost:3001/api/decreaseQuantity/${product}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({
            })
        })
        setError(false);
        return response.json();
    }

    let getTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    }

    let calculateTotalQuantity = () => {
        const total = cart.reduce((accumulator, item) => {
            return accumulator + item.quantity;
        }, 0);

        // Update the state with the total quantity
        setTotalQuantity(total);
    }

    useEffect(() => {
        getCartItems();
        calculateTotalQuantity();
    }, [cart])


    return (
        <div className='cart'>
            <h2>Shopping Cart</h2>
            <Container>
                <div className="top_heading d-flex justify-content-end me-5">
                    <h4>Quantity</h4>
                    <h4>Total</h4>
                </div>
                {
                    cart.length === 0
                        ?
                        <div className="image text-center">
                            <img src={cartImage} alt="emptyCart" />
                            <p>Your shopping bag is empty</p>
                        </div>
                        :
                        <div className="cart_items">
                            {
                                cart.map(item =>
                                    <div key={item._id} className="cart_item">
                                        <div className="info d-flex align-items-center">
                                            <div className="image">
                                                <img src={image3} alt="image1" />
                                            </div>
                                            <div className="content">
                                                <div className="code">
                                                    <h5>{item.code}</h5>
                                                </div>
                                                <p>{item.size.toUpperCase()}</p>
                                                <div className="remove_item">
                                                    <button onClick={() => removeSingleProduct(item.code)}>remove</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="actions">
                                            <div className="quantity">
                                                <div className="quantity_icons d-flex">
                                                    <button onClick={() => decreaseQuantity(item.code)} className='minus bg-transparent'><FontAwesomeIcon icon={faCaretDown} /></button>
                                                    {item.quantity}
                                                    <button onClick={() => increaseQuantity(item.code)} className='plus bg-transparent' ><FontAwesomeIcon icon={faCaretUp} /></button>
                                                </div>
                                                {error ? <div className='bg-danger px-2 rounded mt-3'>can not add anymore</div> : null}
                                            </div>
                                            <div className="price">
                                                {item.price}EGP
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            <div className="sub_total mt-4 text-end">
                                subtotal<span>{getTotal()}EGP</span>
                            </div>
                            <div className="tax text-end mt-4 fs-6">
                                Tax included and shipping calculated at checkout
                            </div>
                            <div className="checkout_btn">
                                <NavLink to="/checkout" className="me-4">Proceed To Checkout</NavLink>
                                <button onClick={removeAllProducts}>Clear Cart</button>
                            </div>
                        </div>
                }
            </Container>
        </div>
    )
}
