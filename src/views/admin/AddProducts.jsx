import React from 'react'
import { Container } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import * as formik from 'formik';
import * as yup from 'yup';

export default function AddProducts() {

    const { Formik } = formik;

    const schema = yup.object().shape({
        label: yup.string().required(),
        file: yup.mixed().required(),
        terms: yup.bool().required().oneOf([true], 'terms must be accepted'),
    });

    let formCheckOnClick = () => {
        
    }

    return (
        <div className='add_products mt-5'>
            <Container>
                <Formik
                    validationSchema={schema}
                    onSubmit={console.log}
                    initialValues={{
                        label: '',
                        file: null,
                        terms: false,
                    }}
                >
                    {({ handleSubmit, handleChange, values, touched, errors }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <Row className="mb-3">
                                <Form.Group
                                    as={Col}
                                    controlId="validationFormik101"
                                    className="position-relative"
                                >
                                    <Form.Label>Label</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="label"
                                        value={values.label}
                                        onChange={handleChange}
                                        isValid={touched.label && !errors.label}
                                    />
                                    <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Form.Group className="position-relative mb-3">
                                <Form.Label>Product Image</Form.Label>
                                <Form.Control
                                    type="file"
                                    required
                                    name="file"
                                    onChange={handleChange}
                                    isInvalid={!!errors.file}
                                />
                                <Form.Control.Feedback type="invalid" tooltip>
                                    {errors.file}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="position-relative mb-3">
                                <Form.Check
                                    required
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
                            <Button type="submit">Send To Stock</Button>
                        </Form>
                    )}
                </Formik>
            </Container>
        </div>
    )
}
