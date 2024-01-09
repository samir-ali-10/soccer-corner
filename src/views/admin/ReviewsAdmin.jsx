import { faLeftLong, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

export default function ReviewsAdmin() {

    const [reviews, setReviews] = useState([]);

    let getReviews = () => {
        fetch(`http://localhost:3001/api/reviews`).then((res) => res.json()).then((data) => setReviews(data));
    }

    useEffect(() => {
        getReviews();
    }, [reviews])

    return (
        <div className='reviews_admin mt-3'>
            <Container>
                <div className="back_to_admin">
                    <NavLink to="/adminSecret" className="back_to_admin"><FontAwesomeIcon icon={faLeftLong} />Back to admin dashboard</NavLink>
                </div>
                <h1 className='text-center'>Reviews</h1>
                <div className="reviews">
                    {
                        reviews.map((review) =>
                            <div className="review">
                                <div className="info">
                                    <div className="name">{review.name}</div>
                                </div>
                                <div className="content">
                                    <q>{review.message}</q>
                                </div>
                            </div>
                        )
                    }
                </div>
            </Container>
        </div>
    )
}
