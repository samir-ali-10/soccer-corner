import React, { useEffect, useState } from 'react'
import * as formik from 'formik';
import * as yup from 'yup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { NavLink } from 'react-router-dom';
import image1 from "../images/carousel_3.jpeg"
import image2 from "../images/ahly_2.jpeg"
import image3 from "../images/ahly_3.jpeg"
import image4 from "../images/ahly_4.jpeg"
import image5 from "../images/ahly_5.jpeg"

export default function Checkout({ setAppearFooter, setAppearLoginSignup }) {

    const { Formik } = formik;

    const schema = yup.object().shape({
        receiverName: yup.string().required(),
        email: yup.string().required(),
        zone: yup.string().required(),
        area: yup.string().required(),
        address: yup.string().required(),
        phone: yup.string().required().matches(/^[0-9]+$/, "Must be only digits").min(10, "Must Be 11 Digits").max(11, "Must Be 11 Digits"),
        note: yup.string(),
        termsCondition: yup.bool().required().oneOf([true], 'terms must be accepted'),
    });

    const [name, setName] = useState(''),
        [zone, setZone] = useState(''),
        [products, setProducts] = useState([]),
        [area, setArea] = useState(''),
        [phone, setPhone] = useState(''),
        [address, setAddress] = useState(''),
        [description, setDescription] = useState(''),
        [terms, setTerms] = useState('');

    let getCartItems = () => {
        fetch(`http://localhost:3001/api/ProductsOncart`).then((res) => res.json()).then((data) => setProducts(data));
    }

    const handlePurchase = async (values) => {
        values.preventDefault();
        try {
            const formData = new FormData();
            formData.append('receiverName', values.receiverName);
            formData.append('zone', values.zone);
            formData.append('area', values.area);
            formData.append('address', values.address);
            formData.append('phone', values.phone);
            formData.append('note', values.note);
            formData.append('termsCondition', values.termsCondition);
            const response = await fetch('http://localhost:3001/api/postOrder', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Handle successful response, maybe show a success message
            console.log('Order placed successfully!');
        } catch (error) {
            console.error('Error placing order:', error);
            // Handle error, maybe show an error message to the user
        }
    }

    useEffect(() => {
        getCartItems();
        setAppearFooter(false)
        setAppearLoginSignup(true)
    }, [])

    return (
        <div className='checkout'>
            <div className='containing'>
                <h2 className='mb-3 mt-3 summary'>Order Summary</h2>
                <div className="floating_receipt pb-4">
                    <div className="content">
                        <div className="item">
                            <div className="info">
                                {
                                    products.map((product, index) =>
                                        <div key={index}>
                                            <div className="top d-flex justify-content-between mb-3">
                                                <div className='d-flex'>
                                                    <div className="image">
                                                        <img src={product.image} alt="image1" />
                                                    </div>
                                                    <div className="title">
                                                        <h5>{product.title}</h5>
                                                        <p className='mb-0'>L</p>
                                                        <p>{product.quantity}</p>
                                                    </div>
                                                </div>
                                                <div className="price">
                                                    {product.price}EGP
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                            <div className="totals">
                                <div className="subtotal">
                                    <span>Subtotal</span>
                                    <p>600EGP</p>
                                </div>
                                <div className="shipping">
                                    <span>Shipping</span>
                                    <p>50EGP</p>
                                </div>
                                <div className="total">
                                    <span>Total</span>
                                    <p>650EGP</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Formik
                    validationSchema={schema}
                    initialValues={{
                        receiverName: "",
                        zone: "",
                        area: "",
                        address: "",
                        phone: "",
                        note: "",
                        termsCondition: false,
                    }}
                    onSubmit={(values) => {
                        handlePurchase(values);
                    }}
                >
                    {({ handleSubmit, handleChange, values, touched, errors }) => (
                        <Form className='mt-5' noValidate onSubmit={handlePurchase}>
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
                                <div className='mb-4'>
                                    <formik.Field
                                        as="select"
                                        name="zone"
                                        className='w-100 rounded'
                                    >
                                        <option value="">Select Zone</option>
                                        <option value="cairo">Cairo</option>
                                        <option value="giza">Giza</option>
                                    </formik.Field>
                                    {touched.zone && errors.zone && (
                                        <span className="text-danger bg-danger text-white p-1 fs-6 rounded mt-2 d-inline-block">please select a zone</span>
                                    )}
                                </div>
                            </Row>
                            <Row>
                                <div className='mb-4'>
                                    <formik.Field
                                        as="select"
                                        name="area"
                                        className='w-100 rounded'
                                    >
                                        <option value="">Select Zone</option>
                                        <option value="cairo">Cairo</option>
                                        <option value="giza">Giza</option>
                                    </formik.Field>
                                    {touched.area && errors.area && (
                                        <span className="text-danger bg-danger text-white p-1 fs-6 rounded mt-2 d-inline-block">please select an area</span>
                                    )}
                                </div>
                            </Row>
                            <Row>
                                <Form.Group
                                    as={Col}
                                    controlId="validationFormik101"
                                    className="position-relative mb-4"
                                >
                                    <Form.Control
                                        type="text"
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
                            <div className='d-flex justify-content-between'>
                                <Row>
                                    <Form.Group className="position-relative mb-3">
                                        <Form.Check
                                            required
                                            className='termsCondition'
                                            name="termsCondition"
                                            label="Agree to terms and conditions"
                                            onChange={handleChange}
                                            isInvalid={!!errors.termsCondition}
                                            feedback="You must agree to terms and conditions"
                                            feedbackType="invalid"
                                            id="validationFormik106"
                                            feedbackTooltip
                                        />
                                    </Form.Group>
                                </Row>
                                <div className='text-end'>
                                    <NavLink className='text-white text-decoration-underline d-block' to="/refund&exchangePolicy">Refund & Exchange Policy</NavLink>
                                    <NavLink className='text-white text-decoration-underline d-block' to="/">Washing Methods</NavLink>
                                </div>
                            </div>
                            <div className="shipping_price mt-5">
                                <h2>Shipping Prices</h2>
                                <p className='m-0'>Enter your shipping address to view available shipping Prices</p>
                            </div>
                            <div className='buy_products lg mt-5'>
                                <Button className='w-100 pt-2 pb-2 fs-5' type="submit">Order Now</Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}
