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
                    <ul className='policies text-capitalize'>
                        <li><NavLink to="/shippingPolicy">shipping policy</NavLink></li>
                        <li><NavLink to="/refund&exchangePolicy">refund & exchange policy</NavLink></li>
                        <li><NavLink to="">our clients</NavLink></li>
                        <li><NavLink to="">size chart</NavLink></li>
                        <li><NavLink to="">washing methods</NavLink></li>
                        <li><NavLink to="">feedback</NavLink></li>
                    </ul>
                    <ul className='socials'>
                        <li><NavLink target='_blank' to="https://www.facebook.com/profile.php?id=100076016882186&mibextid=9R9pXO"><FontAwesomeIcon icon={faFacebook} /></NavLink></li>
                        <li><NavLink target='_blank' to="https://www.instagram.com/soccer.corner.sports?igsh=dW1mNzJnZ2piemps&utm_source=qr"><FontAwesomeIcon icon={faInstagram} /></NavLink></li>
                    </ul>
                </div>
                <div className="copyright mb-3">
                    © 2023 Soccer Corner Sports. All rights reserved
                </div>
            </Container>
        </footer>
    )
}
