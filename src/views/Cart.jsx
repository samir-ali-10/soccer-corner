import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import cartImage from "../images/cart_image.jpg"
import image1 from "../images/carousel_1.jpeg"
import image2 from "../images/carousel_2.jpeg"
import image3 from "../images/carousel_3.jpeg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { decreaseQuantity, getTotals, increaseQuantity } from '../rtk/features/cart/cartSlice'

export default function Cart() {

    const [cart, setCart] = useState([]),
        [totalPrice, setTotalPrice] = useState();

    const cartRtk = useSelector((state) => state.cart)
    const dispatch = useDispatch()


    // let getCartItems = () => {
    //     fetch(`http://localhost:3001/api/products/cart`).then((res) => res.json()).then((data) => setCart(data));
    // }

    let removeSingleProduct = (product) => {
        fetch(`http://localhost:3001/api/products/cart/delete-product/${product}`).then((res) => res.json()).then((data) => console.log(data));
        window.location.reload()
    }

    let removeAllProducts = () => {
        fetch(`http://localhost:3001/api/products/cart/delete-products`).then((res) => res.json()).then((data) => console.log(data));
        window.location.reload()
    }

    let handleIncreaseCartQuantity = (item) => {
        dispatch(increaseQuantity(item));
    }

    let handleDecreaseCartQuantity = (item) => {
        dispatch(decreaseQuantity(item));
    }

    useEffect(() => {
        // getCartItems();
        dispatch(getTotals())
    }, [dispatch])

    return (
        <div className='cart'>
            <h2>Shopping Cart</h2>
            <Container>
                {
                    cartRtk.cartItems.length === 0
                        ?
                        <div className="image text-center">
                            <img src={cartImage} alt="emptyCart" />
                            <p>Your shopping bag is empty</p>
                        </div>
                        :
                        <div className="cart_items">
                            {
                                cartRtk.cartItems.map(item =>
                                    <div key={item._id} className="cart_item">
                                        <div className="info d-flex">
                                            <div className="image">
                                                <img src={image3} alt="image1" />
                                            </div>
                                            <div className="content">
                                                <h5>{item.code}</h5>
                                            </div>
                                        </div>
                                        <div className="actions">
                                            <div className="quantity">
                                                <div className="quantity_icons d-flex">
                                                    {item.cartQuantity === 1 ? <button disabled className='minus' onClick={() => handleDecreaseCartQuantity(item)}><FontAwesomeIcon icon={faMinus} /></button> : <button className='minus' onClick={() => handleDecreaseCartQuantity(item)}><FontAwesomeIcon icon={faMinus} /></button>}
                                                    <span>{item.cartQuantity}</span>
                                                    {item.cartQuantity === item.quantity ? <button disabled className='plus' onClick={() => handleIncreaseCartQuantity(item)}><FontAwesomeIcon icon={faPlus} /></button> : <button className='plus' onClick={() => handleIncreaseCartQuantity(item)}><FontAwesomeIcon icon={faPlus} /></button>}
                                                </div>
                                                <div className="remove_item">
                                                    {/* <button onClick={() => removeSingleProduct(item.code)}>remove</button> */}
                                                </div>
                                            </div>
                                            <div className="price">
                                                {item.price}EGP
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            {/* <button>get total price</button> */}
                            <div className="sub_total mt-4 text-end">
                                <button className='me-5' onClick={() => window.location.reload()}>Update Cart</button>
                                subtotal<span>{cartRtk.cartTotalAmount}EGP</span>
                            </div>
                            <div className="tax text-end mt-4 fs-5">
                                Tax included and shipping calculated at checkout
                            </div>
                            <div className="checkout_btn">
                                <NavLink to="/checkout" className="me-4">Proceed To Checkout</NavLink>
                                {/* <button onClick={removeAllProducts}>Clear Cart</button> */}
                            </div>
                        </div>
                }
            </Container>
        </div>
    )
}
