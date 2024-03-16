import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
// import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import * as formik from 'formik';
import * as yup from 'yup';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeftLong } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

export default function EditProduct() {

    let params = useParams();

    let navigate = useNavigate();

    const [product, setProduct] = useState(),
        [collectionName, setCollectionName] = useState(),
        [league, setLeague] = useState(),
        [model, setModel] = useState(),
        [code, setCode] = useState(),
        [price, setPrice] = useState(),
        [sale, setSale] = useState(),
        [size, setSize] = useState(),
        [quantity, setQuantity] = useState(),
        [description, setDescription] = useState();

    const { Formik } = formik;

    const codes = [
        {
            productCode: "paris",
            id: 1
        },
        {
            productCode: "alahly",
            id: 2
        },
        {
            productCode: "zamalek",
            id: 3
        }
    ];

    const options = [
        { value: 's', text: 'S' },
        { value: 'm', text: 'M' },
        { value: 'l', text: 'L' },
        { value: 'xl', text: 'XL' },
        { value: 'xxl', text: 'XXL' },
    ];

    let getProduct = () => {
        fetch(`http://localhost:3001/api/products/code/${params.code}`).then(res => res.json()).then(data => {
            setProduct(data)
            setCode(data.code)
            setCollectionName(data.collectionName)
            setLeague(data.league)
            setDescription(data.description)
            setModel(data.model)
            setPrice(data.price)
            setSale(data.sale)
            setQuantity(data.quantity)
            setSize(data.size)
        })
    }

    async function editProduct() {
        let response = await fetch(`http://localhost:3001/api/products/editProduct/${params.code}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({
                ...product,
                code,
                collectionName,
                league,
                description,
                model,
                price,
                sale,
                quantity,
                size
            })
        })
        return response.json();
    }

    useEffect(() => {
        getProduct()
    }, [])

    let handleChange = (e) => {
        if (e.target.name === "code") {
            setCode(e.target.value)
        }
        else if (e.target.name === "price") {
            setPrice(e.target.value)
        }
        else if (e.target.name === "sale") {
            setSale(e.target.value)
        }
        else if (e.target.name === "description") {
            setDescription(e.target.value)
        }
        else if (e.target.name === "model") {
            setModel(e.target.value)
        }
        else if (e.target.name === "collectionName") {
            setCollectionName(e.target.value)
        }
        else if (e.target.name === "league") {
            setLeague(e.target.value)
        }
        else if (e.target.name === "size") {
            setSize(e.target.value)
        }
        else if (e.target.name === "quantity") {
            setQuantity(e.target.value)
        }
    }

    let handleEditProduct = (e) => {
        e.preventDefault();
        editProduct()
        navigate('/adminSecret/stock')
    }


    return (
        <div className='add_products edit mt-5'>
            <Container>
                <Form onSubmit={(e) => handleEditProduct(e)}>
                    <Form.Group className="mb-4">
                        <Form.Label className='mb-3'>Code</Form.Label>
                        <Form.Control type="text" value={code} name='code' onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-4">
                        <Form.Label className='mb-3'>League</Form.Label>
                        <Form.Control type="text" value={league} name='league' onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-4">
                        <Form.Label className='mb-3'>Collection</Form.Label>
                        <Form.Control type="text" value={collectionName} name='collectionName' onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-4">
                        <Form.Label className='mb-3'>Model</Form.Label>
                        <Form.Control type="text" value={model} name='model' onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-4">
                        <Form.Label className='mb-3'>Price</Form.Label>
                        <Form.Control type="number" value={price} name='price' onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-4">
                        <Form.Label className='mb-3'>sale</Form.Label>
                        <Form.Control type="number" value={sale} name='sale' onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-4">
                        <Form.Label className='mb-3'>Size</Form.Label>
                        <Form.Control list='sizeList' type="text" value={size} name='size' onChange={handleChange} />
                    </Form.Group>
                    <datalist id='sizeList'>
                        {
                            options.map((option, index) =>
                                <option key={index} value={option.value}>{option.text}</option>
                            )
                        }
                    </datalist>
                    <Form.Group className="mb-4">
                        <Form.Label className='mb-3'>Quantity</Form.Label>
                        <Form.Control type="number" value={quantity} name='quantity' onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-4">
                        <Form.Label className='mb-3'>Description</Form.Label>
                        <Form.Control as="textarea" value={description} rows={3} name='description' onChange={handleChange} />
                    </Form.Group>
                    <Button variant="info" type="submit">
                        Submit
                    </Button>
                </Form>
            </Container>
        </div>
    )
}
