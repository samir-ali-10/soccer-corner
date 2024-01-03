import React, { useState } from 'react'
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

    const [openFields, setOpenFields] = useState(false);

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

    const schema = yup.object().shape({
        code: yup.string().required(),
        model: yup.string().required(),
        collectionName: yup.string(),
        league: yup.string(),
        price: yup.number(),
        size: yup.string().required(),
        quantity: yup.number().required(),
        description: yup.string(),
        file: yup.mixed(),
    });

    let handleSub = async (values) => {
        let response = await fetch(`http://localhost:3001/api/products`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({
                collectionName: values.collectionName,
                league: values.league,
                code: values.code,
                model: values.model,
                price: values.price,
                size: values.size,
                quantity: values.quantity,
                description: values.description,
                file: values.file
            })
        })
        return response.json();
    }

    let handleCollectionNames = () => {
        fetch(`http://localhost:3001/api/products/CollectionsNames`).then((res) => res.json()).then((data) => console.log(data));
    }

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
                        league: "",
                        model: "",
                        code: "",
                        price: "",
                        size: "",
                        quantity: "",
                        description: "",
                        file: undefined,
                    }}
                    onSubmit={(values) => {
                        handleSub(values);
                        handleCollectionNames();
                    }
                    }
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
                                    <Form.Label>League</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="league"
                                        value={values.league}
                                        onChange={handleChange}
                                        isValid={touched.league && !errors.league}
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
                            <div className='clear_fields_container d-flex justify-content-between'>
                                <Button type="submit">Send To Stock</Button>
                                <button className='clear_fields' onClick={() => {
                                    values.code = ""
                                    values.collectionName = ""
                                    values.league = ""
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
