import { faLeftLong, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Container, NavLink } from 'react-bootstrap'

export default function Archived() {

    const [archievedOrders, setArchievedOrders] = useState([]);

    const getArchieved = () => {
        fetch(`http://localhost:3001/api/archive`).then((res) => res.json()).then((data) => setArchievedOrders(data));
    }

    useEffect(() => {
        getArchieved();
    }, [])

    console.log(archievedOrders);


    return (
        <div className='orders text-white mt-4'>
            <Container>
                <div className="back_to_admin mb-5">
                    <NavLink to="/adminSecret" className="back_to_admin"><FontAwesomeIcon icon={faLeftLong} />Back to admin dashboard</NavLink>
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
                                <button className='bg-danger border-0 rounded text-white fs-5'>Delete All</button>
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
                                                    <tr key={innerIndex} className='text-capitalize'>
                                                        <td>{product.code}</td>
                                                        <td>{product.size}</td>
                                                        <td>{product.quantity}</td>
                                                        <td>{product.price}EGP</td>
                                                        <td>{order.name}</td>
                                                        <td>{order.phone}</td>
                                                        <td>{order.zone}, {order.area}</td>
                                                        <td>
                                                            <div>
                                                                <button className='bg-transparent border-0 text-danger'><FontAwesomeIcon icon={faTrashCan} /></button>
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
