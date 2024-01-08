import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Container } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from "../images/logo.jpeg";

export default function Navigation() {

    const [totalQuantity, setTotalQuantity] = useState(0),
        [cart, setCart] = useState([]);


    let getCartItems = () => {
        fetch(`http://localhost:3001/api/products/cart`).then((res) => res.json()).then((data) => setCart(data));
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
        <div className='navigation'>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <div className="logo">
                        <img src={logo} alt="logo" />
                    </div>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            navbarScroll
                        >
                            <NavLink to="/home" href="#action1">Home</NavLink>
                            <NavDropdown title="Categories" id="navbarScrollingDropdown">
                                <NavDropdown.Item href="/products/footballJerseys">Jerseys</NavDropdown.Item>
                                <NavDropdown.Item href="/products/sportsWear">Sports Wear</NavDropdown.Item>
                                <NavDropdown.Item href="/products/studs_turfs">Studs & Turfs</NavDropdown.Item>
                                <NavDropdown.Item href="/products/others">Classic De7k</NavDropdown.Item>
                                <NavDropdown.Item href="/products/others">Other</NavDropdown.Item>
                            </NavDropdown>
                            <NavLink to="/contactUs">Contact Us</NavLink>
                            <NavLink to="/adminSecret">Admin</NavLink>
                        </Nav>
                    </Navbar.Collapse>
                    <div className="actions">
                        <NavLink to="/"><FontAwesomeIcon className='fs-5' icon={faUser} /></NavLink>
                        <div className="cart_action">
                            <NavLink className="cart_icon" to="/cart"><FontAwesomeIcon className='fs-5' icon={faCartShopping} /></NavLink>
                            <span className='total_cart_quantity'>{totalQuantity}</span>
                        </div>
                    </div>
                </Container>
            </Navbar>
            {/* <Container>
                <nav>
                    <div className="logo">
                        Logo
                    </div>
                    <ul className='d-flex'>
                        <li>
                            <NavLink>Home</NavLink>
                        </li>
                        <li>
                            <NavDropdown className='drop_down' title="Categories" id="collasible-nav-dropdown">
                                <NavLink>Action</NavLink>
                                <NavLink>
                                    Another action
                                </NavLink>
                                <NavLink>Something</NavLink>
                            </NavDropdown>
                        </li>
                        <li>
                            <NavLink>Admin</NavLink>
                        </li>
                    </ul>
                    <div className="actions">
                        <NavLink><FontAwesomeIcon icon={faUser} /></NavLink>
                        <NavLink><FontAwesomeIcon icon={faCartShopping} /></NavLink>
                    </div>
                </nav>
            </Container> */}
        </div>
    )
}
