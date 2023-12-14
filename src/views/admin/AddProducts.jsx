import React from 'react'
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

    const [modalShow, setModalShow] = React.useState(false);

    const { Formik } = formik;

    const schema = yup.object().shape({
        label: yup.string().required(),
        price: yup.number().required(),
        quantity: yup.number().required(),
        file: yup.mixed().required(),
        terms: yup.bool().required().oneOf([true], 'terms must be accepted'),
    });

    return (
        <div className='add_products mt-5'>
            <Container>
                <Formik
                    validationSchema={schema}
                    onSubmit={console.log}
                    initialValues={{
                        label: '',
                        price: 0,
                        quantity: 0,
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
                            <Row className="mb-3">
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
                                    />
                                    <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
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
                                    onClick={() => setModalShow(true)}
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
            <Popup show={modalShow} onHide={() => setModalShow(false)} />
        </div>
    )
}
