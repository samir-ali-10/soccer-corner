import { faEnvelope, faFaceAngry } from '@fortawesome/free-regular-svg-icons'
import { faArrowRotateLeft, faCartFlatbedSuitcase, faPlus, faWarehouse } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Container } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

export default function AdminView() {

    return (
        <div className='admin_home'>
            <Container>
                <div className="selections">
                    <NavLink to="/adminSecret/addProducts" className="selection">
                        <h3>Add a new products</h3>
                        <div className="icon">
                            <FontAwesomeIcon icon={faPlus} />
                        </div>
                    </NavLink>
                    <NavLink to="/adminSecret/stock" className="selection">
                        <h3>Stock</h3>
                        <div className="icon">
                            <FontAwesomeIcon icon={faWarehouse} />
                        </div>
                    </NavLink>
                    <NavLink to="/adminSecret/reviews" className="selection">
                        <h3>Reviews</h3>
                        <div className="icon">
                            <FontAwesomeIcon icon={faEnvelope} />
                        </div>
                    </NavLink>
                    <NavLink to="/adminSecret/newOrders" className="selection">
                        <h3>Orders</h3>
                        <div className="icon">
                            <FontAwesomeIcon icon={faCartFlatbedSuitcase} />
                        </div>
                    </NavLink>
                    <NavLink to="/adminSecret/returns" className="selection">
                        <h3>Returns</h3>
                        <div className="icon">
                            <FontAwesomeIcon icon={faArrowRotateLeft} />
                        </div>
                    </NavLink>
                </div>
            </Container>
        </div>
    )
}
