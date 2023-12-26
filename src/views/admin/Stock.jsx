import { faLeftLong } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Container } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import image1 from "../../images/carousel_1.jpeg"
import image2 from "../../images/carousel_2.jpeg"
import image3 from "../../images/carousel_3.jpeg"


export default function Stock() {
    return (
        <div className='stock mt-4'>
            <Container>
                <div className="back_to_admin">
                    <NavLink to="/adminSecret" className="back_to_admin"><FontAwesomeIcon icon={faLeftLong} />Back to admin dashboard</NavLink>
                </div>
                <h2>Stock</h2>
                <div className="categories mt-5">
                    <div className="teams">
                        <button>Ahly</button>
                        <button>Zamalek</button>
                        <button>Paris</button>
                    </div>
                    <div className="dropdowns">
                        <select className='me-3' name="sizes" id="sizes">
                            <option value="s">S</option>
                            <option value="m">M</option>
                            <option value="l">L</option>
                            <option value="xl">XL</option>
                            <option value="xxl">XXL</option>
                        </select>
                        <select name="year" id="year">
                            <option value="2020">2020</option>
                            <option value="2021">2021</option>
                            <option value="2022">2022</option>
                            <option value="2023">2023</option>
                        </select>
                    </div>
                </div>
                <div className="products">
                    <NavLink className="product" to="">
                        <div className="image">
                            <img src={image1} alt="image1" />
                        </div>
                        <div className="info">
                            <div className="code">Product Code: <span>234232424</span></div>
                            <div className="name">Product Name: <span>Ahly First</span></div>
                            <div className="name">Product Description: <span>A very good quality product</span></div>
                            <div className="price">Product Price: <span>300EGP</span></div>
                        </div>
                    </NavLink>
                    <NavLink className="product" to="">
                        <div className="image">
                            <img src={image1} alt="image1" />
                        </div>
                        <div className="info">
                            <div className="code">Product Code: <span>234232424</span></div>
                            <div className="name">Product Name: <span>Ahly First</span></div>
                            <div className="name">Product Description: <span>A very good quality product</span></div>
                            <div className="price">Product Price: <span>300EGP</span></div>
                        </div>
                    </NavLink>
                    <NavLink className="product" to="">
                        <div className="image">
                            <img src={image1} alt="image1" />
                        </div>
                        <div className="info">
                            <div className="code">Product Code: <span>234232424</span></div>
                            <div className="name">Product Name: <span>Ahly First</span></div>
                            <div className="name">Product Description: <span>A very good quality product</span></div>
                            <div className="price">Product Price: <span>300EGP</span></div>
                        </div>
                    </NavLink>
                    <NavLink className="product" to="">
                        <div className="image">
                            <img src={image1} alt="image1" />
                        </div>
                        <div className="info">
                            <div className="code">Product Code: <span>234232424</span></div>
                            <div className="name">Product Name: <span>Ahly First</span></div>
                            <div className="name">Product Description: <span>A very good quality product</span></div>
                            <div className="price">Product Price: <span>300EGP</span></div>
                        </div>
                    </NavLink>
                    <NavLink className="product" to="">
                        <div className="image">
                            <img src={image1} alt="image1" />
                        </div>
                        <div className="info">
                            <div className="code">Product Code: <span>234232424</span></div>
                            <div className="name">Product Name: <span>Ahly First</span></div>
                            <div className="name">Product Description: <span>A very good quality product</span></div>
                            <div className="price">Product Price: <span>300EGP</span></div>
                        </div>
                    </NavLink>
                    <NavLink className="product" to="">
                        <div className="image">
                            <img src={image1} alt="image1" />
                        </div>
                        <div className="info">
                            <div className="code">Product Code: <span>234232424</span></div>
                            <div className="name">Product Name: <span>Ahly First</span></div>
                            <div className="name">Product Description: <span>A very good quality product</span></div>
                            <div className="price">Product Price: <span>300EGP</span></div>
                        </div>
                    </NavLink>
                    <NavLink className="product" to="">
                        <div className="image">
                            <img src={image1} alt="image1" />
                        </div>
                        <div className="info">
                            <div className="code">Product Code: <span>234232424</span></div>
                            <div className="name">Product Name: <span>Ahly First</span></div>
                            <div className="name">Product Description: <span>A very good quality product</span></div>
                            <div className="price">Product Price: <span>300EGP</span></div>
                        </div>
                    </NavLink>
                    <NavLink className="product" to="">
                        <div className="image">
                            <img src={image1} alt="image1" />
                        </div>
                        <div className="info">
                            <div className="code">Product Code: <span>234232424</span></div>
                            <div className="name">Product Name: <span>Ahly First</span></div>
                            <div className="name">Product Description: <span>A very good quality product</span></div>
                            <div className="price">Product Price: <span>300EGP</span></div>
                        </div>
                    </NavLink>
                    <NavLink className="product" to="">
                        <div className="image">
                            <img src={image1} alt="image1" />
                        </div>
                        <div className="info">
                            <div className="code">Product Code: <span>234232424</span></div>
                            <div className="name">Product Name: <span>Ahly First</span></div>
                            <div className="name">Product Description: <span>A very good quality product</span></div>
                            <div className="price">Product Price: <span>300EGP</span></div>
                        </div>
                    </NavLink>
                </div>
            </Container>
        </div>
    )
}
