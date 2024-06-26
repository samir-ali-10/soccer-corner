import { faBoxOpen, faLeftLong, faMoneyBill1Wave, faRotateLeft, faTrashCan, faTruck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';

export default function Archived() {

    const [archievedOrders, setArchievedOrders] = useState([]);

    const getArchieved = () => {
        fetch(`http://localhost:3001/api/archive`).then((res) => res.json()).then((data) => setArchievedOrders(data));
    }

    const deleteOrder = (orderId) => {
        fetch(`http://localhost:3001/api/archive/deleteOrderFromArchive/${orderId}`).then((res) => res.json()).then((data) => console.log(data));
        window.location.reload();
    }

    const deleteSingleProduct = (orderId, productId) => {
        fetch(`http://localhost:3001/api/deleteProductFromOrderInArchive/${orderId}/${productId}`).then((res) => res.json()).then((data) => console.log(data));
        window.location.reload();
    }

    const deleteAllOrders = () => {
        fetch(`http://localhost:3001/api/archive/deleteAllOrdersFromArchive`).then((res) => res.json()).then((data) => console.log(data));
        // console.log("hello");
    }

    const handleReturnStatus = async (orderId, productId) => {
        window.location.reload();
        let response = await fetch(`http://localhost:3001/api/orderStatus/returns/${orderId}/${productId}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({
            })
        })
        return response.json();
    }

    const handleDeliveredStatus = async (orderId, productId) => {
        window.location.reload();
        let response = await fetch(`http://localhost:3001/api/orderStatus/delivered/${orderId}/${productId}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({
            })
        })
        return response.json();
    }

    const handleOutForDeliveryStatus = async (orderId, productId) => {
        window.location.reload();
        let response = await fetch(`http://localhost:3001/api/orderStatus/outForDelivery/${orderId}/${productId}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({
            })
        })
        return response.json();
    }

    const handleMoneyCollectedStatus = async (orderId, productId) => {
        window.location.reload();
        let response = await fetch(`http://localhost:3001/api/orderStatus/moneyCollected/${orderId}/${productId}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({
            })
        })
        return response.json();
    }

    const handleStatus = (status) => {
        if (status === "returns") {
            return 'bg-danger'
        }
        else if (status === "delivered") {
            return 'bg-success'
        }
        else if (status === "outForDelivery") {
            return 'bg-warning'
        }
        else if (status === "moneyCollected") {
            return 'bg-info'
        }
    }

    useEffect(() => {
        getArchieved();
    }, [])

    console.log(archievedOrders);


    return (
        <div className='orders text-white mt-4'>
            <Container>
                <div className="back_to_admin mb-5">
                    <NavLink to='/adminSecret' className="back_to_admin"><FontAwesomeIcon icon={faLeftLong} />Back to admin dashboard</NavLink>
                </div>
                <h2 className='text-center'>Archived Orders</h2>
                {
                    archievedOrders.length === 0
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
                                        <th>Code</th>
                                        <th>Size</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>Name</th>
                                        <th>Phone</th>
                                        <th>Area-Zone</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                {
                                    archievedOrders.map((order, index) =>
                                        <tbody key={index}>
                                            {
                                                order.productsOrdered.map((product, innerIndex) =>
                                                    <tr key={innerIndex} className={`text-capitalize rounded ${handleStatus(product.status)}`}>
                                                        <td>{product.code}</td>
                                                        <td>{product.size}</td>
                                                        <td>{product.quantity}</td>
                                                        <td>{product.price}EGP</td>
                                                        <td>{order.name}</td>
                                                        <td>{order.phone}</td>
                                                        <td>{order.zone}, {order.area}</td>
                                                        <td>
                                                            <div className='actions d-flex gap-2 justify-content-center'>
                                                                <button onClick={() => handleReturnStatus(order.orderId, product._id)} className='bg-transparent border-0 text-white'><FontAwesomeIcon icon={faRotateLeft} /></button>
                                                                <button onClick={() => handleOutForDeliveryStatus(order.orderId, product._id)} className='bg-transparent border-0 text-white'><FontAwesomeIcon icon={faTruck} /></button>
                                                                <button onClick={() => handleMoneyCollectedStatus(order.orderId, product._id)} className='bg-transparent border-0 text-white'><FontAwesomeIcon icon={faMoneyBill1Wave} /></button>
                                                                <button onClick={() => handleDeliveredStatus(order.orderId, product._id)} className='bg-transparent border-0 text-white'><FontAwesomeIcon icon={faBoxOpen} /></button>
                                                                <button onClick={() => deleteSingleProduct(order.orderId, product._id)} className='bg-transparent border-0 text-white'><FontAwesomeIcon icon={faTrashCan} /></button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                            <div>
                                                <button onClick={() => deleteOrder(order.orderId)}>Delete Order</button>
                                            </div>
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
