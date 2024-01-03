import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import image1 from "../images/carousel_1.jpeg"
import image2 from "../images/carousel_2.jpeg"
import image3 from "../images/carousel_3.jpeg"
import { Container } from 'react-bootstrap'

export default function ProductDetails() {

    let params = useParams();

    const [activeSize, setActiveSize] = useState(),
        [product, setProduct] = useState();

    let handleActive = (element) => {
        setActiveSize(element)
    }

    let getProduct = () => {
        fetch(`http://localhost:3001/api/products/code/${params.code}`).then((res) => res.json()).then((data) => setProduct(data))
    }

    const alahlyAPI = [
        {
            image: image1,
            price: 300,
            title: "t-shirt one alahly",
            id: 1
        },
        {
            image: image2,
            price: 400,
            title: "t-shirt two alahly",
            id: 2
        },
        {
            image: image3,
            price: 500,
            title: "t-shirt three alahly",
            id: 3
        },
    ]

    useEffect(() => {
        getProduct();
    }, [])


    return (
        <div className='product_details mt-5'>
            <Container>
                {
                    product !== undefined
                        ?
                        <div className="product_container">
                            <div className="infos text-center">
                                <h3 className="title">
                                    {product.code}
                                </h3>
                                <div className="price">
                                    Price: {product.price}EGP
                                </div>
                                <div className="sizes">
                                    <button className={activeSize === "s" ? "active" : ""} onClick={() => handleActive("s")}>S</button>
                                    <button className={activeSize === "m" ? "active" : ""} onClick={() => handleActive("m")}>M</button>
                                    <button className={activeSize === "l" ? "active" : ""} onClick={() => handleActive("l")}>L</button>
                                    <button className={activeSize === "xl" ? "active" : ""} onClick={() => handleActive("xl")}>XL</button>
                                    <button className={activeSize === "xxl" ? "active" : ""} onClick={() => handleActive("xxl")}>XXL</button>
                                </div>
                                <button className='add_to_cart'>Add to cart</button>
                            </div>
                            <div className="image text-center">
                                <img src={image3} alt="image3" />
                            </div>
                        </div>
                        :
                        null
                }
            </Container>
        </div>
    )
}
