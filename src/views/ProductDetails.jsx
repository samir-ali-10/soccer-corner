import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import image1 from "../images/carousel_1.jpeg"
import image2 from "../images/carousel_2.jpeg"
import image3 from "../images/carousel_3.jpeg"
import { Container } from 'react-bootstrap'
import Swal from 'sweetalert2'

export default function ProductDetails() {

    let params = useParams();

    const [selectedSize, setSelectedSize] = useState(),
        [product, setProduct] = useState();

    let handleActive = (element) => {
        setSelectedSize(element)
    }

    let handleActiveBlur = () => {
        setSelectedSize();
    }

    let getProduct = () => {
        fetch(`http://localhost:3001/api/products/code/${params.code}`).then((res) => res.json()).then((data) => setProduct(data))
    }

    const addToCart = async () => {
        let timerInterval;
        Swal.fire({
            title: "Product Added To Cart",
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading();
            },
            willClose: () => {
                clearInterval(timerInterval);
            }
        }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                console.log("I was closed by the timer");
            }
        });
        let response = await fetch(`http://localhost:3001/api/PostOncart/${params.code}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({
                selectedSize
            })
        })
        return response.json();
    }

    useEffect(() => {
        getProduct();
    }, [])

    const sizes = ['xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl', 'xxxxl'];


    return (
        <div className='product_details mt-5'>
            <Container>
                {
                    product !== undefined
                        ?
                        <div className="product_container">
                            <div className="image text-center">
                                <img src={image3} alt="image3" />
                            </div>
                            <div className="infos text-center">
                                <h3 className="title">
                                    {product.code}
                                </h3>
                                <div className="price">
                                    Price: {product.price}EGP
                                </div>
                                <h3 className='text-white mb-3'>Sizes</h3>
                                <div className="sizes d-flex justify-content-center">
                                    {
                                        sizes.map(size => {
                                            const isAvailable = product.availableSizes.includes(size);
                                            return (
                                                <button
                                                    key={size}
                                                    className={isAvailable ? (selectedSize === size ? "active me-2" : "me-2") : "not_available"}
                                                    onClick={() => handleActive(size)}
                                                    onBlur={handleActiveBlur}
                                                >
                                                    {size.toUpperCase()}
                                                </button>
                                            );
                                        })
                                    }
                                    {/* {
                                        product.availableSizes.map(size =>
                                            <div key={size}>
                                                <button className={selectedSize === size ? "active me-2" : "me-2"} onBlur={handleActiveBlur} onClick={() => handleActive(size)}>{size.toUpperCase()}</button>
                                            </div>
                                        )
                                    } */}
                                </div>
                                <button onClick={addToCart} className='add_to_cart'>Add to cart</button>
                            </div>
                        </div>
                        :
                        null
                }
            </Container>
        </div>
    )
}
