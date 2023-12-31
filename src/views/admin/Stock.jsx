import { faLeftLong } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'
import { Container } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import image1 from "../../images/carousel_1.jpeg"
import image2 from "../../images/carousel_2.jpeg"
import image3 from "../../images/carousel_3.jpeg"
import Spinner from 'react-bootstrap/Spinner';
import Swal from 'sweetalert2'


export default function Stock() {

    const sizeOptions = [
        { value: '', text: '--Choose a Size--' },
        { value: 's', text: 'S' },
        { value: 'm', text: 'M' },
        { value: 'l', text: 'L' },
        { value: 'xl', text: 'XL' },
        { value: 'xxl', text: 'XXL' },
    ];

    const modelOptions = [
        { text: '--Choose a model--' },
        { text: '2020' },
        { text: '2021' },
        { text: '2022' },
        { text: '2023' },
    ];

    const [stock, setStock] = useState([]),
        [sizeSelected, setSizeSelected] = useState(sizeOptions[0].value),
        [modelSelected, setModelSelected] = useState(sizeOptions[0].value),
        [size, setSize] = useState(),
        [collectionName, setCollectionName] = useState();

    let navigate = useNavigate();

    let getData = () => {
        fetch(`http://localhost:3001/api/products`).then((res) => res.json()).then((data) => setStock(data))
    }

    let getCollection = (val) => {
        setCollectionName(val.toLowerCase());
        fetch(`http://localhost:3001/api/products/collection/${val.toLowerCase()}`).then((res) => res.json()).then((data) => setStock(data))
    }

    let getCollectionSize = (val) => {
        setSize(val.target.value);
        if (collectionName === "") {
            fetch(`http://localhost:3001/api/products/size/${val.target.value}`).then((res) => res.json()).then((data) => setStock(data))
        }
        else {
            fetch(`http://localhost:3001/api/products/collection/${collectionName}/size/${val.target.value}`).then((res) => res.json()).then((data) => setStock(data))
        }
    }

    let getCollectionSizeModel = (val) => {
        fetch(`http://localhost:3001/api/products/collection/${collectionName}/model/${val.target.value}/size/${size}`).then((res) => res.json()).then((data) => setStock(data))
    }


    let propagationNo = (event) => {
        event.stopPropagation()
        event.preventDefault();
    }

    let navigateToEdit = (item) => {
        navigate(`/adminSecret/editProduct/${item.code}`);
    }


    const deleteItem = (itemName) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:3001/api/products/delete-product/${itemName.code}`).then(res => res.json()).then(data => console.log(data))
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
            window.location.reload()
        })
    }

    const deleteAllProducts = async () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:3001/api/products/delete-products`).then(res => res.json()).then(data => console.log(data))
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
            window.location.reload()
        })
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
                        <button onClick={() => {
                            getData()
                            setCollectionName("")
                        }}>All</button>
                        <button onClick={(e) => getCollection(e.target.innerHTML)}>Ahly</button>
                        <button onClick={(e) => getCollection(e.target.innerHTML)}>Zamalek</button>
                        <button onClick={(e) => getCollection(e.target.innerHTML)}>Paris</button>
                        <button onClick={(e) => getCollection(e.target.innerHTML)}>Barcelona</button>
                    </div>
                    <div className="dropdowns">
                        <select className='me-3' value={sizeSelected} onChange={getCollectionSize} name="sizes" id="sizes">
                            {
                                sizeOptions.map(option =>
                                    <option key={option.value} value={option.value}>{option.text}</option>
                                )
                            }
                        </select>
                        <select value={modelSelected} onChange={getCollectionSizeModel} name="year" id="year">
                            {
                                modelOptions.map(option =>
                                    <option key={option.text} value={option.text}>{option.text}</option>
                                )
                            }
                        </select>
                    </div>
                </div>
                <div className="delete_all text-end">
                    <button onClick={() => {
                        deleteAllProducts()
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
                                        <div className="code">Product Model: <span>{item.model}</span></div>
                                        <div className="name">Product Name: <span>{item.collectionName}</span></div>
                                        <div className="price">Product Price: <span>{item.price}EGP</span></div>
                                        <div className="price">Product Size: <span>{item.size}</span></div>
                                        <div className="name">Product Description: <span>{item.description}</span></div>
                                        <div className="quantity">Product Quantity: <span>{item.quantity} pieces</span></div>
                                        <div className="delete_item">
                                            <button onClick={(e) => {
                                                propagationNo(e)
                                                deleteItem(item)
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
