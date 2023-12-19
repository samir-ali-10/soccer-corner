import React from 'react'
import { Container } from 'react-bootstrap'

export default function ContactUs() {
    return (
        <div className='contact_us'>
            <Container>
                <h2>Contact Us</h2>
                <form>
                    <div className="name_email">
                        <input type="text" name="name" id="name" placeholder='Name'/>
                        <input type="email" name="email" id="email" placeholder='Email'/>
                    </div>
                    <div className="phone">
                        <input type="text" name="phone" id="phone" placeholder='Phone'/>
                    </div>
                    <div className="message">
                        <textarea name="message" id="message" rows="10" placeholder='Message'></textarea>
                    </div>
                    <div className="send text-start">
                        <button type="submit">Send Message</button>
                    </div>
                </form>
            </Container>
        </div>
    )
}
