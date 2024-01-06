import React from 'react'
import { Container } from 'react-bootstrap'

export default function Shipping() {
    return (
        <div className='policy shipping text-center'>
            <Container>
                <h2>Shipping</h2>
                <div className="content">
                    <p>ALL SHIPPINGS EXCLUDE WEEKENDS AND HOLIDAYS.</p>
                    <p>We Deliver All Over Egypt.</p>
                    <p>Standard shipping (2-4 working days)</p>
                    <hr className='pb-5' />
                    <p>جميع الشحنات لا تشمل عطلات نهاية الأسبوع والأعياد.</p>
                    <p>نقوم بالتوصيل إلى جميع أنحاء مصر.</p>
                    <p>الشحن العادي (4-2 أيام عمل)</p>
                </div>
            </Container>
        </div>
    )
}
