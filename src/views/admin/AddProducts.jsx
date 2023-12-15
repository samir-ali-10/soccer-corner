import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import * as formik from 'formik';
import * as yup from 'yup';
import Popup from '../../components/Popup';

export default function AddProducts() {

    const [modalShow, setModalShow] = React.useState(false),
        [openFields, setOpenFields] = useState(false);

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
        name: yup.string(),
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
        codes.map(product =>
                {
                    if(value === product.productCode) {
                        setOpenFields(true);
                    }
                }
            )
    }

    return (
        <div className='add_products mt-4'>
            <Container>
                <div className='open_fields_container'>
                    <button className='open_fields' onClick={openAllFields}>Open all fields</button>
                </div>
                <Formik
                    validationSchema={schema}
                    onSubmit={console.log}
                    initialValues={{
                        name: "",
                        code: "",
                        price: "",
                        size: "",
                        quantity: "",
                        description: "",
                        file: undefined,
                        terms: false,
                    }}
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
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={values.name}
                                        onChange={handleChange}
                                        isValid={touched.name && !errors.name}
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
                </Formik>
            </Container>
        </div>
    )
}
