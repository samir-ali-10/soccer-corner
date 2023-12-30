import { faLeftLong } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'
import { Container } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import image1 from "../../images/carousel_1.jpeg"
import image2 from "../../images/carousel_2.jpeg"
import image3 from "../../images/carousel_3.jpeg"
import Spinner from 'react-bootstrap/Spinner';
// import axios from 'axios'


export default function Stock() {

    const options = [
        { value: '', text: '--Choose a Size--' },
        { value: 's', text: 'S' },
        { value: 'm', text: 'M' },
        { value: 'l', text: 'L' },
        { value: 'xl', text: 'XL' },
        { value: 'xxl', text: 'XXL' },
    ];

    const [stock, setStock] = useState([]),
        [selected, setSelected] = useState(options[0].value)

    let navigate = useNavigate();

    let getData = () => {
        fetch(`http://localhost:3001/api/products`).then((res) => res.json()).then((data) => setStock(data))
    }

    let getCollection = (val) => {
        fetch(`http://localhost:3001/api/products/collection/${val.toLowerCase()}`).then((res) => res.json()).then((data) => setStock(data))
    }

    let getCollectionSize = (val) => {
        fetch(`http://localhost:3001/api/products/size/${val.target.value}`).then((res) => res.json()).then((data) => setStock(data))
    }


    let propagationNo = (event) => {
        event.stopPropagation()
        event.preventDefault();
    }

    let navigateToEdit = (item) => {
        navigate(`/adminSecret/editProduct/${item.code}`);
    }


    const deleteItem = (itemName) => {
        fetch(`http://localhost:3001/api/products/delete-product/${itemName.code}`).then(res => res.json()).then(data => console.log(data))
    }

    const deleteAllProducts = async () => {
        fetch(`http://localhost:3001/api/products/delete-products`).then(res => res.json()).then(data => console.log(data))
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <div className='stock mt-4'>
            <Container>
                <div className="back_to_admin">
                    <NavLink to="/adminSecret" className="back_to_admin"><FontAwesomeIcon icon={faLeftLong} />Back to admin dashboard</NavLink>
                </div>
                <h2>Stock</h2>
                <div className="categories mt-5">
                    <div className="teams">
                        <button onClick={getData}>All</button>
                        <button onClick={(e) => getCollection(e.target.innerHTML)}>Ahly</button>
                        <button onClick={(e) => getCollection(e.target.innerHTML)}>Zamalek</button>
                        <button onClick={(e) => getCollection(e.target.innerHTML)}>Paris</button>
                    </div>
                    <div className="dropdowns">
                        <select className='me-3' value={selected} onChange={getCollectionSize} name="sizes" id="sizes">
                            {
                                options.map(option =>
                                    <option key={option.value} value={option.value}>{option.text}</option>
                                )
                            }
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
                    <button onClick={() => {
                        deleteAllProducts()
                        window.location.reload()
                    }}>Delete All Products</button>
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
                                        <div className="price">Product Price: <span>{item.price}EGP</span></div>
                                        <div className="price">Product Size: <span>{item.size}</span></div>
                                        <div className="name">Product Description: <span>{item.description}</span></div>
                                        <div className="quantity">Product Quantity: <span>{item.quantity} pieces</span></div>
                                        <div className="delete_item">
                                            <button onClick={(e) => {
                                                propagationNo(e)
                                                deleteItem(item)
                                                window.location.reload()
                                            }}>Delete Product</button>
                                            <button onClick={(e) => {
                                                propagationNo(e)
                                                navigateToEdit(item)
                                            }} className='edit_product'>Edit Product</button>
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
