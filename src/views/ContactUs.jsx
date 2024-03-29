import React from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import * as formik from 'formik';
import * as yup from 'yup';
import Swal from 'sweetalert2';

export default function ContactUs() {

    const { Formik } = formik;

    const schema = yup.object().shape({
        name: yup.string().required(),
        message: yup.string().required()
    });

    const handleReview = async (values) => {
        Swal.fire({
            title: "Review Placed Successfully",
            timer: 2000,
            timerProgressBar: true,
        }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                console.log("I was closed by the timer");
            }
        });
        let response = await fetch(`http://localhost:3001/api/reviews`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({
                name: values.name,
                message: values.message
            })
        })
        return response.json();
    }

    return (
        <div className='contact_us'>
            <Container>
                <h2>Make A Review</h2>
                <Formik
                    validationSchema={schema}
                    initialValues={{
                        name: "",
                        message: ""
                    }}
                    onSubmit={(values) => {
                        handleReview(values);
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
                                        className='border-0 text-white'
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
                            </Row>
                            <Row className='message'>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Message</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        className='border-0 text-white'
                                        rows={6}
                                        name='message'
                                        value={values.message}
                                        onChange={handleChange}
                                        isInvalid={!!errors.message}
                                    />
                                    <Form.Control.Feedback type="invalid" tooltip>
                                        {errors.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <div className='send'>
                                <Button className='submit' type="submit">Send Review</Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Container>
        </div>
    )
}
