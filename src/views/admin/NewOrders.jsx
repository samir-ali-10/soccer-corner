import { faEnvelope, faEnvelopeOpen, faLeftLong } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Container } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

export default function NewOrders() {
    return (
        <div className='new_orders text-white mt-4'>
            <Container>
                <div className="back_to_admin mb-5">
                    <NavLink to="/adminSecret" className="back_to_admin"><FontAwesomeIcon icon={faLeftLong} />Back to admin dashboard</NavLink>
                </div>
                <div className="selections">
                    <NavLink to="/adminSecret/newOrders/new" className="selection">
                        <h3>New Orders</h3>
                        <div className="icon">
                            <FontAwesomeIcon icon={faEnvelopeOpen} />
                        </div></NavLink>
                    <NavLink to="/adminSecret/newOrders/archived" className="selection">
                        <h3>Archived Orders</h3>
                        <div className="icon">
                            <FontAwesomeIcon icon={faEnvelope} />
                        </div>
                    </NavLink>
                </div>
            </Container>
        </div>
    )
}
