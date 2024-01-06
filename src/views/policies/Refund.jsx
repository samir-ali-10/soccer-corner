import React from 'react'
import { Container } from 'react-bootstrap'

export default function Refund() {
    return (
        <div className='policy refund text-center'>
            <Container>
                <h2>Refund & Exchange</h2>
                <div className="content">
                    <h3 className='text-start'>Refunds</h3>
                    <p>We will notify you once we’ve received and inspected your return, and let you know if the refund was approved or not. If approved, you’ll be automatically refunded on your original payment method. Please remember it can take some time for your bank or credit card company to process and post the refund too.
                        We have a 2 day return policy, which means you have 2 days after receiving your item to request a return.</p>
                    <p>To be eligible for a return, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging. You’ll also need the receipt or proof of purchase.</p>
                    <p>Damages and issues
                        Please inspect your order upon reception and contact us immediately if the item is defective, damaged or if you receive the wrong item, so that we can evaluate the issue and make it right.</p>
                    <p>Exceptions / non-returnable items</p>
                    <p>Unfortunately, we cannot accept returns on sale items or gift cards.</p>
                    <h3 className='text-start'>Exchanges</h3>
                    <p>Exchanges are available within 7 days only after receiving the product, the product must be in its same condition as recieved with the tag attached to; otherwise the exchange won't be processed.</p>
                </div>
            </Container>
        </div>
    )
}
