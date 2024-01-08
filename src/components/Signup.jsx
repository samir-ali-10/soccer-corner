import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import logo from "../images/logo.jpeg"
import * as formik from 'formik';
import * as yup from 'yup';
import { NavLink } from 'react-router-dom';

export default function Signup({ appearLoginSignupm, setAppearLoginSignup }) {

    const { Formik } = formik;

    useEffect(() => {
        setAppearLoginSignup(false)
    }, [])

    const schema = yup.object().shape({
        email: yup.string().required(),
        password: yup.string().min(8, 'Password must be at least 8 characters').matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
            'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character'
        ).required(),
        confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required(),
        name: yup.string().required(),
        zone: yup.string().required(),
        area: yup.string().required(),
        phoneNumber: yup.string().max(11, 'Phone number is 11 digits maximum').required(),
        address: yup.string().required(),
    });

    const handleSignup = async (values) => {
        let response = await fetch(`http://localhost:3001/api/auth/signUp`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({
                email: values.email,
                password: values.password,
                confirmPassword: values.confirmPassword,
                name: values.name,
                zone: values.zone,
                area: values.area,
                phoneNumber: values.phoneNumber,
                address: values.address
            })
        })
        return response.json();
    }


    return (
        <div className='signup'>
            <Container>
                <div className="card text-center">
                    <div className="logo">
                        <img src={logo} alt="logo" />
                    </div>
                    <h2 className='mt-4 mb-5'>Create an Account</h2>
                    <Formik
                        validationSchema={schema}
                        initialValues={{
                            email: "",
                            password: "",
                            confirmPassword: "",
                            name: "",
                            zone: "",
                            area: "",
                            phoneNumber: "",
                            address: ""
                        }}
                        onSubmit={(values) => {
                            handleSignup(values);
                        }}
                    >
                        {({ handleSubmit, handleChange, values, touched, errors }) => (
                            <Form noValidate onSubmit={handleSubmit}>
                                <Row className='personal'>
                                    <Form.Group
                                        as={Col}
                                        controlId="validationFormik101"
                                        className="position-relative"
                                    >
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="name"
                                            required
                                            list='productsList'
                                            value={values.name}
                                            onChange={handleChange}
                                            isInvalid={!!errors.name}
                                        />
                                        <Form.Control.Feedback type="invalid" tooltip>
                                            {errors.name}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group
                                        as={Col}
                                        controlId="validationFormik102"
                                        className="position-relative"
                                    >
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            value={values.email}
                                            onChange={handleChange}
                                            isInvalid={!!errors.email}
                                        />
                                        <Form.Control.Feedback type="invalid" tooltip>
                                            {errors.email}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Row className='passwords'>
                                    <Form.Group
                                        as={Col}
                                        controlId="validationFormik103"
                                        className="position-relative"
                                    >
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="password"
                                            value={values.password}
                                            onChange={handleChange}
                                            isInvalid={!!errors.password}
                                        />
                                        <Form.Control.Feedback type="invalid" tooltip>
                                            {errors.password}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group
                                        as={Col}
                                        controlId="validationFormik104"
                                        className="position-relative"
                                    >
                                        <Form.Label>Confirm Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="confirmPassword"
                                            value={values.confirmPassword}
                                            onChange={handleChange}
                                            isInvalid={!!errors.confirmPassword}
                                        />
                                        <Form.Control.Feedback type="invalid" tooltip>
                                            {errors.confirmPassword}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Form.Group
                                        as={Col}
                                        controlId="validationFormik105"
                                        className="position-relative"
                                    >
                                        <Form.Label>Zone</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="zone"
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
                                        controlId="validationFormik106"
                                        className="position-relative"
                                    >
                                        <Form.Label>Area</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="area"
                                            value={values.area}
                                            onChange={handleChange}
                                            isInvalid={!!errors.area}
                                        />
                                        <Form.Control.Feedback type="invalid" tooltip>
                                            {errors.area}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Form.Group
                                        as={Col}
                                        controlId="validationFormik107"
                                        className="position-relative"
                                    >
                                        <Form.Label>Phone Number</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="phoneNumber"
                                            value={values.phoneNumber}
                                            onChange={handleChange}
                                            isInvalid={!!errors.phoneNumber}
                                        />
                                        <Form.Control.Feedback type="invalid" tooltip>
                                            {errors.phoneNumber}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Form.Group
                                        as={Col}
                                        controlId="validationFormik108"
                                        className="position-relative"
                                    >
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="address"
                                            value={values.address}
                                            onChange={handleChange}
                                            isInvalid={!!errors.address}
                                        />
                                        <Form.Control.Feedback type="invalid" tooltip>
                                            {errors.address}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <div className='check d-flex justify-content-between align-items-center'>
                                    <Button className='submit' type="submit">Submit</Button>
                                    <NavLink>Already have an account?</NavLink>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </Container>
        </div>
    )
}
