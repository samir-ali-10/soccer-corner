import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Container } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function Navigation() {
    return (
        <div className='navigation'>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <h2 className='logo'>Logo</h2>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <NavLink to="/" href="#action1">Home</NavLink>
                            <NavLink to="/" href="#action2">Link</NavLink>
                            <NavDropdown title="Categories" id="navbarScrollingDropdown">
                                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action4">
                                    Another action
                                </NavDropdown.Item>
                            </NavDropdown>
                            <NavLink to="/adminSecret" href="#action1">Admin</NavLink>
                        </Nav>
                        <div className="actions">
                            <NavLink to="/"><FontAwesomeIcon className='fs-4' icon={faUser} /></NavLink>
                            <NavLink to="/"><FontAwesomeIcon className='fs-4' icon={faCartShopping} /></NavLink>
                        </div>
                    </Navbar.Collapse>
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
