import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
// import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import * as formik from 'formik';
import * as yup from 'yup';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeftLong } from '@fortawesome/free-solid-svg-icons';

export default function AddProducts() {

    const { Formik } = formik;

    const options = [
        { value: 's', text: 'S' },
        { value: 'm', text: 'M' },
        { value: 'l', text: 'L' },
        { value: 'xl', text: 'XL' },
        { value: 'xxl', text: 'XXL' },
    ];

    const schema = yup.object().shape({
        code: yup.string(),
        model: yup.string(),
        kit: yup.string(),
        type: yup.string(),
        BrandName: yup.string(),
        collectionName: yup.string(),
        league: yup.string(),
        price: yup.number(),
        sale: yup.number(),
        newCollection: yup.string(),
        size: yup.string(),
        quantity: yup.number(),
        description: yup.string(),
        image: yup.mixed(),
    });

    let handleSub = async (values) => {
        let response = await fetch(`http://localhost:3001/api/products`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({
                collectionName: values.collectionName,
                kit: values.kit,
                type: values.type,
                BrandName: values.BrandName,
                league: values.league,
                code: values.code,
                model: values.model,
                price: values.price,
                sale: values.sale,
                newCollection: values.newCollection,
                size: values.size,
                quantity: values.quantity,
                description: values.description,
                image: values.image
            })
        })
        return response.json();
    }

    let handleCollectionNames = () => {
        fetch(`http://localhost:3001/api/products/CollectionsNames`).then((res) => res.json()).then((data) => console.log(data));
    }

    const [stock, setStock] = useState([]),
        [selectedCode, setSelectedCode] = useState(),
        [product, setProduct] = useState(),
        [collectionName, setCollectionName] = useState(),
        [league, setLeague] = useState(),
        [model, setModel] = useState(),
        [kit, setKit] = useState(),
        [type, setType] = useState(),
        [BrandName, setBrandName] = useState(),
        [code, setCode] = useState(),
        [price, setPrice] = useState(),
        [sale, setSale] = useState(),
        [newCollection, setNewCollection] = useState(),
        [size, setSize] = useState(),
        [quantity, setQuantity] = useState(),
        [description, setDescription] = useState();

    let getData = () => {
        fetch(`http://localhost:3001/api/products`).then((res) => res.json()).then((data) => setStock(data))
    }

    let getProduct = (val) => {
        // console.log(val.target.value);
        fetch(`http://localhost:3001/api/products/code/${val.target.value}`).then(res => res.json()).then(data => {
            setProduct(data)
            setCode(data.code)
            setCollectionName(data.collectionName)
            setLeague(data.league)
            setDescription(data.description)
            setModel(data.model)
            setPrice(data.price)
            setSale(data.sale)
            setNewCollection(data.newCollection)
            setKit(data.kit)
            setType(data.type)
            setBrandName(data.BrandName)
            setQuantity(data.quantity)
            setSize(data.size)
        })
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <div className='add_products mt-4'>
            <Container>
                <div className="back_to_admin mb-5">
                    <NavLink to="/adminSecret" className="back_to_admin"><FontAwesomeIcon icon={faLeftLong} />Back to admin dashboard</NavLink>
                </div>
                <Formik
                    validationSchema={schema}
                    initialValues={{
                        collectionName: "",
                        kit: "",
                        type: "",
                        BrandName: "",
                        league: "",
                        model: "",
                        code: "",
                        price: "",
                        sale: "",
                        newCollection: "",
                        size: "",
                        quantity: "",
                        description: "",
                        image: undefined,
                    }}
                    onSubmit={(values) => {
                        handleSub(values);
                        handleCollectionNames();
                    }
                    }
                >
                    {({ handleSubmit, handleChange, values, touched, errors }) => (
                        <Form noValidate onSubmit={handleSubmit} encType='multipart/form-data'>
                            <Row className='code_info'>
                                <Form.Group
                                    as={Col}
                                    controlId="validationFormik101"
                                    className="position-relative mb-0"
                                >
                                    <Form.Label>Code</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="code"
                                        list='productsList'
                                        value={values.code === "" ? code : values.code}
                                        onChange={handleChange}
                                        isInvalid={!!errors.code}
                                    />
                                    <Form.Control.Feedback type="invalid" tooltip>
                                        {errors.code}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <select className='code_list mb-5' value={selectedCode} onChange={getProduct} name="code_list" id="code_list">
                                    <option value={"--Choose Existing Code--"} >--Choose Existing Code--</option>
                                    {
                                        stock.map(product =>
                                            <option key={product._id} value={product.code} >{product.code}</option>
                                        )
                                    }
                                </select>
                            </Row>
                            <Row>
                                <Form.Group
                                    as={Col}
                                    controlId="validationFormik101"
                                    className="position-relative"
                                >
                                    <Form.Label>Collection</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="collectionName"
                                        value={values.collectionName === "" ? collectionName : values.collectionName}
                                        onChange={handleChange}
                                        isInvalid={!!errors.collectionName}
                                    />
                                    <Form.Control.Feedback type="invalid" tooltip>
                                        {errors.collectionName}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group
                                    as={Col}
                                    controlId="validationFormik101"
                                    className="position-relative"
                                >
                                    <Form.Label>Kit</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="kit"
                                        value={values.kit === "" ? kit : values.kit}
                                        onChange={handleChange}
                                        isInvalid={!!errors.kit}
                                    />
                                    <Form.Control.Feedback type="invalid" tooltip>
                                        {errors.kit}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group
                                    as={Col}
                                    controlId="validationFormik101"
                                    className="position-relative"
                                >
                                    <Form.Label>Model</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="model"
                                        value={values.model === "" ? model : values.model}
                                        onChange={handleChange}
                                        isInvalid={!!errors.model}
                                    />
                                    <Form.Control.Feedback type="invalid" tooltip>
                                        {errors.model}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group
                                    as={Col}
                                    controlId="validationFormik101"
                                    className="position-relative"
                                >
                                    <Form.Label>League</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="league"
                                        value={values.league === "" ? league : values.league}
                                        onChange={handleChange}
                                        isInvalid={!!errors.league}
                                    />
                                    <Form.Control.Feedback type="invalid" tooltip>
                                        {errors.league}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group
                                    as={Col}
                                    controlId="validationFormik101"
                                    className="position-relative"
                                >
                                    <Form.Label>Type</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="type"
                                        value={values.type === "" ? type : values.type}
                                        onChange={handleChange}
                                        isInvalid={!!errors.type}
                                    />
                                    <Form.Control.Feedback type="invalid" tooltip>
                                        {errors.type}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group
                                    as={Col}
                                    controlId="validationFormik101"
                                    className="position-relative"
                                >
                                    <Form.Label>Brand Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="BrandName"
                                        value={values.BrandName === "" ? BrandName : values.BrandName}
                                        onChange={handleChange}
                                        isInvalid={!!errors.BrandName}
                                    />
                                    <Form.Control.Feedback BrandName="invalid" tooltip>
                                        {errors.BrandName}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group
                                    as={Col}
                                    controlId="validationFormik101"
                                    className="position-relative"
                                >
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="price"
                                        value={values.price === "" ? price : values.price}
                                        onChange={handleChange}
                                        isInvalid={!!errors.price}
                                    />
                                    <Form.Control.Feedback type="invalid" tooltip>
                                        {errors.price}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group
                                    as={Col}
                                    controlId="validationFormik101"
                                    className="position-relative"
                                >
                                    <Form.Label>Sale</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="sale"
                                        value={values.sale === "" ? sale : values.sale}
                                        onChange={handleChange}
                                        isInvalid={!!errors.sale}
                                    />
                                    <Form.Control.Feedback type="invalid" tooltip>
                                        {errors.sale}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group
                                    as={Col}
                                    controlId="validationFormik101"
                                    className="position-relative"
                                >
                                    <Form.Label>New Collection</Form.Label>
                                    <Form.Control
                                        type="string"
                                        name="newCollection"
                                        value={values.newCollection === "" ? newCollection : values.newCollection}
                                        onChange={handleChange}
                                        isInvalid={!!errors.newCollection}
                                    />
                                    <Form.Control.Feedback type="invalid" tooltip>
                                        {errors.newCollection}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group
                                    as={Col}
                                    controlId="validationFormik101"
                                    className="position-relative"
                                >
                                    <Form.Label>Size</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="size"
                                        list='sizeList'
                                        value={values.size === "" ? size : values.size}
                                        onChange={handleChange}
                                        isInvalid={!!errors.size}
                                    />
                                    <Form.Control.Feedback type="invalid" tooltip>
                                        {errors.size}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <datalist id='sizeList'>
                                    {
                                        options.map((option, index) =>
                                            <option key={index} value={option.value}>{option.text}</option>
                                        )
                                    }
                                </datalist>
                            </Row>
                            <Row>
                                <Form.Group
                                    as={Col}
                                    controlId="validationFormik101"
                                    className="position-relative"
                                >
                                    <Form.Label>Quantity</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="quantity"
                                        value={values.quantity === "" ? quantity : values.quantity}
                                        onChange={handleChange}
                                        isInvalid={!!errors.quantity}
                                    />
                                    <Form.Control.Feedback type="invalid" tooltip>
                                        {errors.quantity}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group
                                    as={Col}
                                    controlId="validationFormik101"
                                    className="position-relative"
                                >
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="description"
                                        value={values.description === "" ? description : values.description}
                                        onChange={handleChange}
                                        isInvalid={!!errors.description}
                                    />
                                    <Form.Control.Feedback type="invalid" tooltip>
                                        {errors.description}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Form.Group className="position-relative mb-4">
                                <Form.Label>Product Image</Form.Label>
                                <Form.Control
                                    type="file"
                                    name="image"
                                    onChange={handleChange}
                                    isInvalid={!!errors.image}
                                />
                                <Form.Control.Feedback type="invalid" tooltip>
                                    {errors.image}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <div className='clear_fields_container d-flex justify-content-between'>
                                <Button type="submit">Send To Stock</Button>
                                <button type='button' className='clear_fields' onClick={() => {
                                    values.code = ""
                                    values.collectionName = ""
                                    values.league = ""
                                    values.BrandName = ""
                                    values.kit = ""
                                    values.type = ""
                                    values.description = ""
                                    values.model = ""
                                    values.price = ""
                                    values.quantity = ""
                                    values.size = ""
                                }}>Clear all fields</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Container>
        </div>
    )
}
