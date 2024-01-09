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
        [totalPrice, setTotalPrice] = useState(),
        [totalQuantity, setTotalQuantity] = useState(0);

    // const cartRtk = useSelector((state) => state.cart)
    // const dispatch = useDispatch()


    let getCartItems = () => {
        fetch(`http://localhost:3001/api/products/cart`).then((res) => res.json()).then((data) => setCart(data));
    }

    let removeSingleProduct = (product) => {
        fetch(`http://localhost:3001/api/products/cart/delete-product/${product}`).then((res) => res.json()).then((data) => console.log(data));
        window.location.reload()
    }

    let removeAllProducts = () => {
        fetch(`http://localhost:3001/api/products/cart/delete-products`).then((res) => res.json()).then((data) => console.log(data));
        window.location.reload()
    }

    let increaseQuantity = async (product) => {
        let response = await fetch(`http://localhost:3001/api/products/cart/increase/${product}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({
            })
        })
        return response.json();
    }

    let decreaseQuantity = async (product) => {
        let response = await fetch(`http://localhost:3001/api/products/cart/decrease/${product}`, {
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
        // console.log(product.price);
        return product.sale
        // if(product.sale !== null) {
        // }

        // else {
        //     return product.price
        // }
        // // Ensure that price and sale are valid numbers
        // if (typeof product.price !== 'number' || typeof product.sale !== 'number') {
        //     return 'Invalid input';
        // }

        // // Calculate the sale price
        // const salePrice = product.price - (product.price * product.sale) / 100;
        // return salePrice.toFixed(2); // Adjust decimal places as needed
    };

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
                                                    <button onClick={() => decreaseQuantity(item.code)} className='minus'><FontAwesomeIcon icon={faMinus} /></button>
                                                    {item.quantity}
                                                    <button onClick={() => increaseQuantity(item.code)} className='plus' ><FontAwesomeIcon icon={faPlus} /></button>
                                                </div>
                                                <div className="remove_item">
                                                    <button onClick={() => removeSingleProduct(item.code)}>remove</button>
                                                </div>
                                            </div>
                                            <div className="price">
                                                {item.price}EGP
                                            </div>
                                            {/* {calculateSalePrice(item) === 'Invalid input' ? <div className="price">{item.price}EGP</div> : <div className="price_dashed">{item.price}EGP</div>}
                                            {calculateSalePrice(item) !== 'Invalid input' ? <span>{calculateSalePrice(item)}EGP</span> : null} */}
                                        </div>
                                    </div>
                                )
                            }
                            <div className="sub_total mt-4 text-end">
                                subtotal<span>{getTotal()}EGP</span>
                            </div>
                            <div className="tax text-end mt-4 fs-5">
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
