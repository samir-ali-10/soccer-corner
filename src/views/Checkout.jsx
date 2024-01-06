import React, { useState } from 'react'
import * as formik from 'formik';
import * as yup from 'yup';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export default function Checkout() {

    const [phone, setPhone] = useState('');

    const { Formik } = formik;

    const schema = yup.object().shape({
        receiverName: yup.string().required(),
        email: yup.string().required(),
        zone: yup.string().required(),
        area: yup.string().required(),
        address: yup.string().required(),
        phone: yup.number().required(),
        note: yup.string(),
        termsCondition: yup.bool().required().oneOf([true], 'terms must be accepted'),
    });

    // let handleValidateDigits = (e) => {
    //     if (e.target.name === "phone") {
    //         setPhone(e.target.value)
    //     }
    // };

    return (
        <div className='checkout mt-5'>
            <Container>
                <Formik
                    validationSchema={schema}
                    initialValues={{
                        receiverName: "",
                        email: "",
                        zone: "",
                        area: "",
                        address: "",
                        phone: "",
                        note: "",
                        termsCondition: false,
                    }}
                    onSubmit={console.log()}
                >
                    {({ handleSubmit, handleChange, values, touched, errors }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <Row className='contact mb-5'>
                                <div className="headlines d-flex justify-content-between align-items-center">
                                    <h2>Contact</h2>
                                    <p className='m-0'>Have an account? <NavLink>Log in</NavLink></p>
                                </div>
                                <Form.Group
                                    as={Col}
                                    controlId="validationFormik101"
                                    className="position-relative"
                                >
                                    <Form.Control
                                        type="text"
                                        name="receiverName"
                                        placeholder='Name'
                                        value={values.receiverName}
                                        onChange={handleChange}
                                        isInvalid={!!errors.receiverName}
                                    />
                                    <Form.Control.Feedback type="invalid" tooltip>
                                        {errors.state}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group
                                    as={Col}
                                    controlId="validationFormik101"
                                    className="position-relative"
                                >
                                    {/* <Form.Label>Code</Form.Label> */}
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        placeholder='Email Address'
                                        value={values.email}
                                        onChange={handleChange}
                                        isInvalid={!!errors.email}
                                    />
                                    <Form.Control.Feedback type="invalid" tooltip>
                                        {errors.state}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row>
                                <h2>Delivery</h2>
                                <Form.Group
                                    as={Col}
                                    controlId="validationFormik101"
                                    className="position-relative mb-4"
                                >
                                    <Form.Control
                                        type="text"
                                        name="zone"
                                        placeholder='Zone'
                                        value={values.zone}
                                        onChange={handleChange}
                                        isInvalid={!!errors.zone}
                                    />
                                    <Form.Control.Feedback type="invalid" tooltip>
                                        {errors.state}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group
                                    as={Col}
                                    controlId="validationFormik101"
                                    className="position-relative mb-4"
                                >
                                    <Form.Control
                                        type="text"
                                        name="area"
                                        placeholder='Area'
                                        value={values.area}
                                        onChange={handleChange}
                                        isInvalid={!!errors.area}
                                    />
                                    <Form.Control.Feedback type="invalid" tooltip>
                                        {errors.state}
                                    </Form.Control.Feedback>
                                    {/* <Form.Select defaultValue="Choose...">
                                        <option>Choose...</option>
                                        <option>...</option>
                                    </Form.Select> */}
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group
                                    as={Col}
                                    controlId="validationFormik101"
                                    className="position-relative mb-4"
                                >
                                    <Form.Control
                                        type="number"
                                        name="phone"
                                        placeholder='Phone Number'
                                        value={values.phone}
                                        onChange={handleChange}
                                        isInvalid={!!errors.phone}
                                    />
                                    <Form.Control.Feedback type="invalid" tooltip>
                                        {errors.state}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group
                                    as={Col}
                                    controlId="validationFormik101"
                                    className="position-relative mb-4"
                                >
                                    <Form.Control
                                        type="text"
                                        name="address"
                                        placeholder='Address'
                                        value={values.address}
                                        onChange={handleChange}
                                        isInvalid={!!errors.address}
                                    />
                                    <Form.Control.Feedback type="invalid" tooltip>
                                        {errors.state}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group
                                    as={Col}
                                    controlId="validationFormik101"
                                    className="position-relative mb-4"
                                >
                                    <Form.Control
                                        as="textarea"
                                        rows={5}
                                        // type="textarea"
                                        name="note"
                                        placeholder='Note (optional)'
                                        value={values.note}
                                        onChange={handleChange}
                                        isInvalid={!!errors.note}
                                    />
                                    <Form.Control.Feedback type="invalid" tooltip>
                                        {errors.state}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group className="position-relative mb-3">
                                    <Form.Check
                                        required
                                        className='terms'
                                        name="terms"
                                        label="Agree to terms and conditions"
                                        onChange={handleChange}
                                        isInvalid={!!errors.terms}
                                        feedback={errors.terms}
                                        feedbackType="invalid"
                                        id="validationFormik106"
                                        feedbackTooltip
                                    />
                                </Form.Group>
                            </Row>
                            <div className='clear_fields_container d-flex justify-content-between'>
                                <Button type="submit">Send To Stock</Button>
                                <button type='button' className='clear_fields' onClick={() => {
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
