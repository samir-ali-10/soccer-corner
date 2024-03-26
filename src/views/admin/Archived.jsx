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

    const deleteSingleOrder = (orderId) => {
        fetch(`http://localhost:3001/api/archive/deleteOrderFromArchive/${orderId}`).then((res) => res.json()).then((data) => console.log(data));
    }

    const deleteAllOrders = () => {
        fetch(`http://localhost:3001/api/archive/deleteAllOrdersFromArchive`).then((res) => res.json()).then((data) => console.log(data));
        // console.log("hello");
    }

    const handleStatus = (status) => {
        if(status === "returns") {
            return 'bg-danger'
        }
        else if(status === "delivered"){
            return 'bg-info'
        }
        else if(status === "outForDelivery"){
            return 'bg-success'
        }
        else {
            return 'bg-warning'
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
                                                    <tr key={innerIndex} className={`text-capitalize ${handleStatus(product.status)}`}>
                                                        <td>{product.code}</td>
                                                        <td>{product.size}</td>
                                                        <td>{product.quantity}</td>
                                                        <td>{product.price}EGP</td>
                                                        <td>{order.name}</td>
                                                        <td>{order.phone}</td>
                                                        <td>{order.zone}, {order.area}</td>
                                                        <td>
                                                            <div className='actions d-flex gap-2 justify-content-center'>
                                                                <button className='bg-transparent border-0 text-danger'><FontAwesomeIcon icon={faRotateLeft} /></button>
                                                                <button className='bg-transparent border-0 text-success'><FontAwesomeIcon icon={faTruck} /></button>
                                                                <button className='bg-transparent border-0 text-primary'><FontAwesomeIcon icon={faMoneyBill1Wave} /></button>
                                                                <button className='bg-transparent border-0 text-info'><FontAwesomeIcon icon={faBoxOpen} /></button>
                                                                <button onClick={() => deleteSingleOrder(product._id)} className='bg-transparent border-0 text-danger'><FontAwesomeIcon icon={faTrashCan} /></button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            }
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
