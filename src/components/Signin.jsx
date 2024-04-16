import React, { useEffect, useState } from 'react'
import * as formik from 'formik';
import * as yup from 'yup';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import logo from "../images/logo.jpeg"
import { NavLink, useNavigate } from 'react-router-dom';

export default function Signin({ appearLoginSignupm, setAppearLoginSignup, loggedIn, setLoggedIn }) {

    const { Formik } = formik;

    const navigate = useNavigate();

    useEffect(() => {
        setAppearLoginSignup(false)
    }, [])

    const schema = yup.object().shape({
        email: yup.string().required(),
        password: yup.string().min(8, 'Password must be at least 8 characters').matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
            'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character'
        ).required(),
    });

    const handleSignin = async (values) => {
        try {
            let response = await fetch(`http://localhost:3001/api/auth/logIn`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify({
                    email: values.email,
                    password: values.password
                })
            })

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            const { token } = await response.json();

            sessionStorage.setItem('token', token);

            setLoggedIn(true);
            navigate('/');
        } catch (error) {
            console.error('Login failed:', error.message);
        }

    }

    return (
        <div className='signin'>
            <Container>
                <div className="card_auth text-center">
                    <div className="logo">
                        <img src={logo} alt="logo" />
                    </div>
                    <h2 className='mt-4 mb-5'>Sign in your Account</h2>
                    <Formik
                        validationSchema={schema}
                        initialValues={{
                            email: "",
                            password: ""
                        }}
                        onSubmit={(values) => {
                            handleSignin(values)
                        }}
                    >
                        {({ handleSubmit, handleChange, values, touched, errors }) => (
                            <Form noValidate onSubmit={handleSubmit}>
                                <Row className='personal'>
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
                                </Row>
                                <div className='check d-flex justify-content-between align-items-center'>
                                    <Button className='submit' type="submit">Login</Button>
                                    <div className='d-flex flex-column'>
                                        <NavLink to="/signup">Don't have an account?</NavLink>
                                        <NavLink to="/">Back To Home</NavLink>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </Container>
        </div>
    )
}
