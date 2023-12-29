import { faLeftLong } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'
import { Container } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import image1 from "../../images/carousel_1.jpeg"
import image2 from "../../images/carousel_2.jpeg"
import image3 from "../../images/carousel_3.jpeg"
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios'


export default function Stock() {

    const [stock, setStock] = useState([]);

    let getData = () => {
        fetch(`http://localhost:3001/api/products`).then(res => res.json()).then(data => setStock(data))
    }

    useEffect(() => {
        getData();
    }, [])

    let propagationNo = (event) => {
        event.stopPropagation()
        event.preventDefault();
    }

    const deleteItem = (itemName) => {
        console.log(itemName);
        axios.delete(`/api/products/delete-product/${itemName.code}`).then(() => {
            let newList = stock.filter((el) => el.itemName !== itemName);

            setStock(newList);
        });
    };

    const deleteAllProducts = async () => {
        const response = await fetch(`http://localhost:3001/api/products`, {
            method: "DELETE",
        });
        return response.json();
    }

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
                <div className="delete_all text-end">
                    <button>Delete All Products</button>
                </div>
                <div className="products">
                    {
                        stock.length !== 0
                            ?
                            stock.map(item =>
                                <NavLink key={item._id} className="product" to="">
                                    <div className="image">
                                        <img src={image1} alt="image1" />
                                    </div>
                                    <div className="info">
                                        <div className="code">Product Code: <span>{item.code}</span></div>
                                        <div className="name">Product Name: <span>{item.collectionName}</span></div>
                                        <div className="name">Product Description: <span>{item.description}</span></div>
                                        <div className="price">Product Price: <span>{item.price}EGP</span></div>
                                        <div className="quantity">Product Quantity: <span>{item.quantity} pieces</span></div>
                                        <div className="delete_item">
                                            <button onClick={(e) => {
                                                propagationNo(e)
                                            }}>Delete Product</button>
                                            <NavLink to="/adminSecret/editProduct" className='edit_product'>Edit Product</NavLink>
                                        </div>
                                    </div>
                                </NavLink>
                            )
                            :
                            <div className="loader text-center">
                                <Spinner animation="border" />
                            </div>
                    }
                </div>
            </Container>
        </div>
    )
}
