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

    const [openFields, setOpenFields] = useState(false),
        [product, setProduct] = useState(),
        [collectionName, setCollectionName] = useState(),
        [model, setModel] = useState(),
        [code, setCode] = useState(),
        [price, setPrice] = useState(),
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

    const sizes = ["S", "M", "L", "XL", "XXL"];

    const schema = yup.object().shape({
        code: yup.string().required(),
        model: yup.string().required(),
        collectionName: yup.string(),
        price: yup.number(),
        size: yup.string().required(),
        quantity: yup.number().required(),
        description: yup.string(),
        file: yup.mixed(),
    });

    let openAllFields = () => {
        setOpenFields(!openFields);
    }

    let closeFields = (value) => {
        codes.map(product => {
            if (value === product.productCode) {
                setOpenFields(true);
            }
        }
        )
    }

    let getProduct = () => {
        fetch(`http://localhost:3001/api/products/code/${params.code}`).then(res => res.json()).then(data => {
            setProduct(data)
            setCode(data.code)
            setCollectionName(data.collectionName)
            setDescription(data.description)
            setModel(data.model)
            setPrice(data.price)
            setQuantity(data.quantity)
            setSize(data.size)
        })
    }

    async function editProduct() {
        fetch(`http://localhost:3001/api/editProduct/${params.code}`).then((res) => res.json()).then((data) => console.log(data))
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
        else if (e.target.name === "description") {
            setDescription(e.target.value)
        }
        else if (e.target.name === "model") {
            setModel(e.target.value)
        }
        else if (e.target.name === "collectionName") {
            setCollectionName(e.target.value)
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
        <div className='add_products mt-5'>
            <Container>
                <Form onSubmit={(e) => handleEditProduct(e)}>
                    <Form.Group className="mb-4">
                        <Form.Label className='mb-3'>Code</Form.Label>
                        <Form.Control type="text" value={code} name='code' onChange={handleChange} />
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
                        <Form.Label className='mb-3'>Size</Form.Label>
                        <Form.Control list='sizeList' type="text" value={size} name='size' onChange={handleChange} />
                    </Form.Group>
                    <datalist id='sizeList'>
                        {
                            sizes.map((size, index) =>
                                <option key={index} value={size}></option>
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
                {/* <div className='open_fields_container'>
                    <button className='open_fields' onClick={openAllFields}>Open all fields</button>
                </div>
                <Formik
                    validationSchema={schema}
                    initialValues={{
                        collectionName: collectionName,
                        model: model,
                        code: code,
                        price: price,
                        size: size,
                        quantity: quantity,
                        description: description,
                        file: undefined,
                    }}
                    onSubmit={console.log("skdjfbn")}
                >
                    {({ handleSubmit, handleChange, values, touched, errors }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <Row>
                                <Form.Group
                                    as={Col}
                                    controlId="validationFormik101"
                                    className="position-relative"
                                >
                                    <Form.Label>Code</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="code"
                                        required
                                        list='productsList'
                                        value={values.code}
                                        onChange={handleChange}
                                        onBlur={(val) => closeFields(val.target.value)}
                                        isValid={touched.code && !errors.code}
                                    />
                                    <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                                <datalist id='productsList'>
                                    {
                                        codes.map(product =>
                                            <option key={product.id} value={product.productCode} />
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
                                    <Form.Label>Model</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="model"
                                        value={values.model}
                                        onChange={handleChange}
                                        isValid={touched.model && !errors.model}
                                        disabled={openFields ? true : false}
                                    />
                                    <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
                                </Form.Group>
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
                                        value={values.collectionName}
                                        onChange={handleChange}
                                        isValid={touched.collectionName && !errors.collectionName}
                                        disabled={openFields ? true : false}
                                    />
                                    <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
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
                                        value={values.price}
                                        onChange={handleChange}
                                        isValid={touched.price && !errors.price}
                                        disabled={openFields ? true : false}
                                    />
                                    <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
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
                                        value={values.size}
                                        onChange={handleChange}
                                        isValid={touched.size && !errors.size}
                                    />
                                    <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                                <datalist id='sizeList'>
                                    {
                                        sizes.map((size, index) =>
                                            <option key={index} value={size}></option>
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
                                        value={values.quantity}
                                        onChange={handleChange}
                                        isValid={touched.quantity && !errors.quantity}
                                    />
                                    <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
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
                                        value={values.description}
                                        onChange={handleChange}
                                        isValid={touched.description && !errors.description}
                                        disabled={openFields ? true : false}
                                    />
                                    <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Form.Group className="position-relative mb-4">
                                <Form.Label>Product Image</Form.Label>
                                <Form.Control
                                    type="file"
                                    name="file"
                                    onChange={handleChange}
                                    isInvalid={!!errors.file}
                                    disabled={openFields ? true : false}
                                />
                                <Form.Control.Feedback type="invalid" tooltip>
                                    {errors.file}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Button type="submit">Send To Stock</Button>
                        </Form>
                    )}
                </Formik> */}
            </Container>
        </div>
    )
}
