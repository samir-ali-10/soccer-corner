import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Container } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

export default function Footer() {
    return (
        <footer className='text-center'>
            <Container>
                <h2>Enjoy The Adventure</h2>
                <div className="policies_socials">
                    <div className="moto">
                        <h3>Soccer Corner Sports</h3>
                        <p>Our goal is the bring to your a very well developed and quality product in the field of football and sport. By reviving the spirit of collaboration and sportiveness</p>
                    </div>
                    <ul className='policies'>
                        <li><NavLink to="">shipping policy</NavLink></li>
                        <li><NavLink to="">refund policy</NavLink></li>
                        <li><NavLink to="">terms & conditions</NavLink></li>
                        <li><NavLink to="">privacy policy</NavLink></li>
                    </ul>
                    <ul className='socials'>
                        <li><NavLink to=""><FontAwesomeIcon icon={faFacebook} /></NavLink></li>
                        <li><NavLink to=""><FontAwesomeIcon icon={faInstagram} /></NavLink></li>
                    </ul>
                </div>
                <div className="copyright">
                    © 2023 Soccer Corner Sports. All rights reserved
                </div>
            </Container>
        </footer>
    )
}
