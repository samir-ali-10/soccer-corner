import { faLeftLong, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Container, Table } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import image3 from "../../images/carousel_3.jpeg"

export default function New() {

    const [cart, setCart] = useState([]),
        [newOrders, setNewOrders] = useState([]);

    // let getCartItems = () => {
    //     fetch(`http://localhost:3001/api/products/cart`).then((res) => res.json()).then((data) => setCart(data));
    // }

    const getNewOrders = () => {
        fetch(`http://localhost:3001/api/orders`).then((res) => res.json()).then((data) => setNewOrders(data));
    }

    const deleteSingleOrder = (orderId) => {
        fetch(`http://localhost:3001/api/deleteOrder/${orderId}`).then((res) => res.json()).then((data) => console.log(data));
        window.location.reload();
    }

    const deleteSingleProduct = (orderId, productId) => {
        fetch(`http://localhost:3001/api/deleteProductFromOrder/${orderId}/${productId}`).then((res) => res.json()).then((data) => console.log(data));
        window.location.reload();
    }

    const deleteAllOrders = () => {
        fetch(`http://localhost:3001/api/deleteAllOrders`).then((res) => res.json()).then((data) => console.log(data));
        window.location.reload();
    }

    const sendToArchive = async (orderId) => {
        let response = await fetch(`http://localhost:3001/api/postToArchive/${orderId}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({
            })
        })
        return response.json();
    }

    useEffect(() => {
        getNewOrders();
    }, [])

    console.log(newOrders);

    return (
        <div className='orders text-white mt-4'>
            <Container>
                <div className="back_to_admin mb-5">
                    <NavLink to="/adminSecret" className="back_to_admin"><FontAwesomeIcon icon={faLeftLong} />Back to admin dashboard</NavLink>
                </div>
                <h2 className='text-center'>New Orders</h2>
                {
                    newOrders.length === 0
                        ?
                        <div className="image text-center text-capitalize mt-5">
                            <h1>There are no new orders</h1>
                        </div>
                        :
                        <div className='mt-5'>
                            <div className='text-end mt-3 mb-5'>
                                <button onClick={deleteAllOrders} className='bg-danger border-0 rounded text-white fs-5'>Delete All</button>
                            </div>
                            <table className='w-100 ms-auto text-center'>
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Code</th>
                                        <th>Size</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>Name</th>
                                        <th>Phone</th>
                                        <th>Area-Zone</th>
                                        <th>Address</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                {
                                    newOrders.map((order, index) =>
                                        <tbody key={index}>
                                            {
                                                order.productsOrdered.map((product, innerIndex) =>
                                                    <tr key={innerIndex} className='text-capitalize'>
                                                        <td className='d-flex justify-content-center mt-3'>
                                                            <div className="image">
                                                                <img src={image3} alt="image1" />
                                                            </div>
                                                        </td>
                                                        <td>{product.code}</td>
                                                        <td>{product.size}</td>
                                                        <td>{product.quantity}</td>
                                                        <td>{product.price}EGP</td>
                                                        <td>{order.name}</td>
                                                        <td>{order.phone}</td>
                                                        <td>{order.zone}, {order.area}</td>
                                                        <td>{order.address}</td>
                                                        <td>
                                                            <div>
                                                                <button onClick={() => deleteSingleProduct(order.orderId, product._id)} className='bg-transparent border-0 text-danger'><FontAwesomeIcon icon={faTrashCan} /></button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                            {/* <div className='mt-3 text-end'>
                                                <button onClick={() => sendToArchive(order.orderId)} className='bg-success border-0 py-2 px-3 rounded'>Send Orders To Archive</button>
                                            </div> */}
                                            {/* <button>ksjbdf</button> */}
                                        </tbody>
                                    )
                                }
                            </table>
                        </div>
                }
            </Container>
        </div>
    )
}
