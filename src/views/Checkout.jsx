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
        <div className='checkout'>
            <div className='containing d-flex'>
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
                        <Form className='mt-5' noValidate onSubmit={handleSubmit}>
                            <Row className='contact mb-5'>
                                <div className="headlines d-flex justify-content-between align-items-center">
                                    <h2>Contact</h2>
                                    <p className='m-0'>Have an account? <NavLink to="/">Log in</NavLink></p>
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
                                        {errors.receiverName}
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
                                        {errors.zone}
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
                                        {errors.area}
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
                                        {errors.phone}
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
                                        {errors.address}
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
                                        isInvalid={!!errors.termsCondition}
                                        feedback={errors.termsCondition}
                                        feedbackType="invalid"
                                        id="validationFormik106"
                                        feedbackTooltip
                                    />
                                </Form.Group>
                            </Row>
                            <div className="shipping_price mt-5">
                                <h2>Shipping Prices</h2>
                                <p className='m-0'>Enter your shipping address to view available shipping Prices</p>
                            </div>
                            <div className='buy_products mt-5'>
                                <Button className='w-100 pt-2 pb-2 fs-5' type="submit">Order Now</Button>
                            </div>
                        </Form>
                    )}
                </Formik>
                <div className="floating_receipt pt-4 pb-4">
                    <div className="content">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, cum nesciunt optio quisquam expedita facere cupiditate, ex ipsum cumque, eligendi deserunt? Iure qui consectetur quas aliquid! Itaque rem inventore quas.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
