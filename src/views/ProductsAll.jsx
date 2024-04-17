import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import image1 from "../images/carousel_3.jpeg"
import image2 from "../images/ahly_2.jpeg"
import image3 from "../images/ahly_3.jpeg"
import image4 from "../images/ahly_4.jpeg"
import image5 from "../images/ahly_5.jpeg"
import studsTurfsOne from "../images/studs_turfs_1.jpeg"
import studsTurfsTwo from "../images/studs_turfs_2.jpeg"
import studsTurfsThree from "../images/studs_turfs_3.jpeg"
import studsTurfsFour from "../images/studs_turfs_4.jpeg"
import { NavLink } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'

export default function ProductsAll() {

    let params = useParams();

    const [stock, setStock] = useState([]),
        [activeSize, setActiveSize] = useState(null),
        [sizeSelected, setSizeSelected] = useState(),
        [size, setSize] = useState(),
        [activeButton, setActiveButton] = useState(null);

    const handleClick = (size) => {
        setActiveButton(size);
    };


    const sizeOptions = [
        { value: '', text: '--Choose By Size--' },
        { value: 's', text: 'S' },
        { value: 'm', text: 'M' },
        { value: 'l', text: 'L' },
        { value: 'xl', text: 'XL' },
        { value: 'xxl', text: 'XXL' },
    ];

    const studsTurfs = [
        {
            image: studsTurfsOne,
            price: 300,
            title: "Studs and Turfs One",
            id: 1
        },
        {
            image: studsTurfsTwo,
            price: 400,
            title: "Studs and Turfs Two",
            id: 2
        },
        {
            image: studsTurfsThree,
            price: 500,
            title: "Studs and Turfs Three",
            id: 3
        },
        {
            image: studsTurfsFour,
            price: 500,
            title: "Studs and Turfs Four",
            id: 4
        },
        {
            image: studsTurfsTwo,
            price: 500,
            title: "Studs and Turfs Five",
            id: 5
        },
    ]

    const sportsWear = [
        {
            image: image1,
            price: 300,
            title: "Sports Wear One",
            id: 1
        },
        {
            image: image2,
            price: 400,
            title: "Sports Wear Two",
            id: 2
        },
        {
            image: image3,
            price: 500,
            title: "Sports Wear Three",
            id: 3
        },
        {
            image: image4,
            price: 500,
            title: "Sports Wear Four",
            id: 4
        },
        {
            image: image5,
            price: 500,
            title: "Sports Wear Five",
            id: 5
        },
    ]

    let getData = () => {
        fetch(`http://localhost:3001/api/products`).then((res) => res.json()).then((data) => setStock(data))
    }

    let getProductsBySize = (val) => {
        fetch(`http://localhost:3001/api/products/size/${val.target.value}`).then((res) => res.json()).then((data) => setStock(data))
    }

    const calculateSalePrice = (product) => {
        // Ensure that price and sale are valid numbers
        if (typeof product.price !== 'number' || typeof product.sale !== 'number') {
            return 'Invalid input';
        }

        // Calculate the sale price
        const salePrice = product.price - (product.price * product.sale) / 100;
        return salePrice.toFixed(2); // Adjust decimal places as needed
    };

    useEffect(() => {
        getData();
    }, [])

    console.log(params);

    return (
        <div className='products_all'>
            <Container>
                {/* <div className="drop_down text-center mb-5">
                    <select value={sizeSelected} onChange={getProductsBySize} name="sizes" id="sizes">
                        {
                            sizeOptions.map(option =>
                                <option key={option.value} value={option.value}>{option.text}</option>
                            )
                        }
                    </select>
                </div> */}
                {
                    <div>
                        <h2 className=''>{params.category}</h2>
                        <div className='filter text-uppercase mb-3'>
                            <span className='text-capitalize text-white me-3 fs-5'>Filter By Size:</span>
                            <button
                                className={activeButton === 'xs' ? 'me-3 active' : 'me-3'}
                                onClick={() => handleClick('xs')}
                            >
                                xs
                            </button>
                            <button
                                className={activeButton === 's' ? 'me-3 active' : 'me-3'}
                                onClick={() => handleClick('s')}
                            >
                                s
                            </button>
                            <button
                                className={activeButton === 'm' ? 'me-3 active' : 'me-3'}
                                onClick={() => handleClick('m')}
                            >
                                m
                            </button>
                            <button
                                className={activeButton === 'l' ? 'me-3 active' : 'me-3'}
                                onClick={() => handleClick('l')}
                            >
                                l
                            </button>
                            <button
                                className={activeButton === 'xl' ? 'me-3 active' : 'me-3'}
                                onClick={() => handleClick('xl')}
                            >
                                xl
                            </button>
                            <button
                                className={activeButton === 'xxl' ? 'me-3 active' : 'me-3'}
                                onClick={() => handleClick('xxl')}
                            >
                                xxl
                            </button>
                            <button
                                className={activeButton === 'xxxl' ? 'me-3 active' : 'me-3'}
                                onClick={() => handleClick('xxxl')}
                            >
                                xxxl
                            </button>
                        </div>
                        <div className='items_container'>
                            {
                                stock.map(product =>
                                    product.league === params.category || product.newCollection === params.category || product.sale !== null || 0
                                        ?
                                        <NavLink to={`/products/${params.category}/${product.code}`} key={product._id} className="item">
                                            <div className="image">
                                                <img src={image1} alt="image1" />
                                            </div>
                                            <div className="info">
                                                <div className="name">{product.code}</div>
                                                {calculateSalePrice(product) === 'Invalid input' ? <div className="price">{product.price}EGP</div> : <div className="price_dashed">{product.price}EGP</div>}
                                                {calculateSalePrice(product) !== 'Invalid input' ? <span>{calculateSalePrice(product)}EGP</span> : null}
                                            </div>
                                        </NavLink>
                                        :
                                        null
                                )
                            }
                        </div>
                    </div>
                }
                {/* {params.category === "footballJerseys" &&
                    <div className='football_jerseys'>
                        <div className="egyptian_league">
                            <h2>Egyptian League</h2>
                            <div className="items_container">
                                {stock.map((egypt) => egypt.league === "egyptian"
                                    ?
                                    <NavLink to={`/products/${params.category}/${egypt.code}`} key={egypt._id} className="item">
                                        <div className="image">
                                            <img src={image1} alt="image1" />
                                        </div>
                                        <div className="info">
                                            <div className="name">{egypt.code}</div>
                                            {calculateSalePrice(egypt) === 'Invalid input' ? <div className="price">{egypt.price}EGP</div> : <div className="price_dashed">{egypt.price}EGP</div>}
                                            {calculateSalePrice(egypt) !== 'Invalid input' ? <span>{calculateSalePrice(egypt)}EGP</span> : null}
                                        </div>
                                    </NavLink>
                                    :
                                    null
                                )}
                            </div>
                        </div>
                        <div className="serie_a">
                            <h2>Serie A</h2>
                            <div className="items_container">
                                {stock.map((serieA) => serieA.league === "serie a"
                                    ?
                                    <NavLink to={`/products/${params.category}/${serieA.code}`} key={serieA._id} className="item">
                                        <div className="image">
                                            <img src={image1} alt="image1" />
                                        </div>
                                        <div className="info">
                                            <div className="name">{serieA.code}</div>
                                            {calculateSalePrice(serieA) === 'Invalid input' ? <div className="price">{serieA.price}EGP</div> : <div className="price_dashed">{serieA.price}EGP</div>}
                                            {calculateSalePrice(serieA) !== 'Invalid input' ? <span>{calculateSalePrice(serieA)}EGP</span> : null}
                                        </div>
                                    </NavLink>
                                    :
                                    null
                                )}
                            </div>
                        </div>
                        <div className="spanish_league">
                            <h2>La Liga</h2>
                            <div className="items_container">
                                {stock.map((spanish) => spanish.league === "La Liga"
                                    ?
                                    <NavLink to={`/products/${params.category}/${spanish.code}`} key={spanish._id} className="item">
                                        <div className="image">
                                            <img src={image1} alt="image1" />
                                        </div>
                                        <div className="info">
                                            <div className="name">{spanish.code}</div>
                                            {calculateSalePrice(spanish) === 'Invalid input' ? <div className="price">{spanish.price}EGP</div> : <div className="price_dashed">{spanish.price}EGP</div>}
                                            {calculateSalePrice(spanish) !== 'Invalid input' ? <span>{calculateSalePrice(spanish)}EGP</span> : null}
                                        </div>
                                    </NavLink>
                                    :
                                    null
                                )}
                            </div>
                        </div>
                        <div className="saudi_league">
                            <h2>Saudi</h2>
                            <div className="items_container">
                                {stock.map((saudi) => saudi.league === "saudi"
                                    ?
                                    <NavLink to={`/products/${params.category}/${saudi.code}`} key={saudi._id} className="item">
                                        <div className="image">
                                            <img src={image1} alt="image1" />
                                        </div>
                                        <div className="info">
                                            <div className="name">{saudi.code}</div>
                                            {calculateSalePrice(saudi) === 'Invalid input' ? <div className="price">{saudi.price}EGP</div> : <div className="price_dashed">{saudi.price}EGP</div>}
                                            {calculateSalePrice(saudi) !== 'Invalid input' ? <span>{calculateSalePrice(saudi)}EGP</span> : null}
                                        </div>
                                    </NavLink>
                                    :
                                    null
                                )}
                            </div>
                        </div>
                    </div>
                } */}
                {params.category === "studs_turfs" &&
                    <div className='studs_turfs'>
                        <h2>Studs & Turfs</h2>
                        <div className="items_container">
                            {stock.map(item =>
                                item.type === "studs"
                                    ?
                                    <NavLink to={`/products/${params.category}/${item.code}`} key={item._id} className="item">
                                        <div className="image">
                                            <img src={image2} alt="image1" />
                                        </div>
                                        <div className="info">
                                            <div className="name">{item.code}</div>
                                            <div className="price">{item.price}EGP</div>
                                        </div>
                                    </NavLink>
                                    :
                                    null
                            )}
                        </div>
                    </div>
                }
                {params.category === "sportsWear" &&
                    <div className='sports_wear'>
                        <h2>Sports Wear</h2>
                        <div className="items_container">
                            {sportsWear.map(item =>
                                <NavLink key={item.id} className="item">
                                    <div className="image">
                                        <img src={item.image} alt="image1" />
                                    </div>
                                    <div className="info">
                                        <div className="name">{item.title}</div>
                                        <div className="price">{item.price}EGP</div>
                                    </div>
                                </NavLink>
                            )}
                        </div>
                    </div>
                }
                {params.category === "others" &&
                    <div className='others'>
                        <h2>Others</h2>
                        <div className="items_container">
                            {sportsWear.map(item =>
                                <NavLink key={item.id} className="item">
                                    <div className="image">
                                        <img src={item.image} alt="image1" />
                                    </div>
                                    <div className="info">
                                        <div className="name">{item.title}</div>
                                        <div className="price">{item.price}EGP</div>
                                    </div>
                                </NavLink>
                            )}
                        </div>
                    </div>
                }
            </Container>
        </div>
    )
}
