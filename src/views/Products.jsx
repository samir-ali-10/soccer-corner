import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import image1 from "../images/ahly_1.jpeg"
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
import { useDispatch } from 'react-redux'
import { increaseQuantity } from '../rtk/features/cart/cartSlice'
import Swal from 'sweetalert2'

export default function Products() {


    const [stock, setStock] = useState([]),
        [leagues, setLeagues] = useState([]),
        [activeButton, setActiveButton] = useState(null);

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

    let params = useParams();

    let getData = () => {
        fetch(`http://localhost:3001/api/products`).then((res) => res.json()).then((data) => setStock(data))
    }

    let getLeagues = () => {
        fetch(`http://localhost:3001/api/products/LeagueOrBrandNames`).then((res) => res.json()).then((data) => setLeagues(data));
    }

    const getByBrandAndSize = (brandName, size) => {
        fetch(`http://localhost:3001/api/products/${brandName}/${size}`).then((res) => res.json()).then((data) => setStock(data))
    }

    const handleClick = (size) => {
        setActiveButton(size);
    };


    let addToCart = async (product) => {
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
        let response = await fetch(`http://localhost:3001/api/PostOncart/${product}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({
            })
        })
        return response.json();
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
        getLeagues();
    }, [])

    return (
        <div className='products'>
            <Container>
                {params.category === "footballJerseys" &&
                    <div className='football_jerseys'>
                        <div className="egyptian_league">
                            {
                                leagues.map(league =>
                                    league.leagueOrBrand === "egyptian"
                                        ?
                                        <>
                                            <h2>Egyptian League</h2>
                                            <div className="all_products">
                                                <NavLink to="/products/egyptian/all">See All</NavLink>
                                                <div className='filter text-uppercase'>
                                                    <button
                                                        className={activeButton === 'xs' ? 'me-3 active' : 'me-3'}
                                                        onClick={() => {
                                                            handleClick('xs');
                                                            getByBrandAndSize(league.leagueOrBrand, 'xs')
                                                        }}
                                                    >
                                                        xs
                                                    </button>
                                                    <button
                                                        className={activeButton === 's' ? 'me-3 active' : 'me-3'}
                                                        onClick={() => {
                                                            handleClick('s');
                                                            getByBrandAndSize(league.leagueOrBrand, 's')
                                                        }}
                                                    >
                                                        s
                                                    </button>
                                                    <button
                                                        className={activeButton === 'm' ? 'me-3 active' : 'me-3'}
                                                        onClick={() => {
                                                            handleClick('m');
                                                            getByBrandAndSize(league.leagueOrBrand, 'm')
                                                        }}
                                                    >
                                                        m
                                                    </button>
                                                    <button
                                                        className={activeButton === 'l' ? 'me-3 active' : 'me-3'}
                                                        onClick={() => {
                                                            handleClick('l');
                                                            getByBrandAndSize(league.leagueOrBrand, 'l')
                                                        }}
                                                    >
                                                        l
                                                    </button>
                                                    <button
                                                        className={activeButton === 'xl' ? 'me-3 active' : 'me-3'}
                                                        onClick={() => {
                                                            handleClick('xl');
                                                            getByBrandAndSize(league.leagueOrBrand, 'xl')
                                                        }}
                                                    >
                                                        xl
                                                    </button>
                                                    <button
                                                        className={activeButton === 'xxl' ? 'me-3 active' : 'me-3'}
                                                        onClick={() => {
                                                            handleClick('xxl');
                                                            getByBrandAndSize(league.leagueOrBrand, 'xxl')
                                                        }}
                                                    >
                                                        xxl
                                                    </button>
                                                    <button
                                                        className={activeButton === 'xxxl' ? 'me-3 active' : 'me-3'}
                                                        onClick={() => {
                                                            handleClick('xxxl');
                                                            getByBrandAndSize(league.leagueOrBrand, 'xxxl')
                                                        }}
                                                    >
                                                        xxxl
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="slider_container d-flex">
                                                {stock.map(egypt =>
                                                    egypt.league === "egyptian"
                                                        ?
                                                        <NavLink to={`/products/${params.category}/${egypt.code}`} key={egypt._id} className={calculateSalePrice(egypt) === 'Invalid input' ? "item" : "item sale"}>
                                                            <div className="image">
                                                                <img src={image1} alt="image1" />
                                                            </div>
                                                            <div className="info">
                                                                <div className="name">{egypt.code}</div>
                                                                <div className="inner_info d-flex justify-content-between">
                                                                    {calculateSalePrice(egypt) === 'Invalid input' ? <div className="price">{egypt.price}EGP</div> : <div className="price_dashed">{egypt.price}EGP</div>}
                                                                    {calculateSalePrice(egypt) !== 'Invalid input' ? <span>{calculateSalePrice(egypt)}EGP</span> : null}
                                                                    <div className="add_cart" onClick={(e) => {
                                                                        e.preventDefault();
                                                                        addToCart(egypt.code)
                                                                    }}><FontAwesomeIcon icon={faCartPlus} /></div>
                                                                </div>
                                                            </div>
                                                        </NavLink>
                                                        :
                                                        null
                                                )}
                                            </div>
                                        </>
                                        :
                                        null
                                )
                            }
                        </div>
                        <div className="serie_A">
                            {
                                leagues.map(league =>
                                    league.leagueOrBrand === "serie a"
                                        ?
                                        <>
                                            <h2>Serie A</h2>
                                            <div className="all_products d-flex">
                                                <NavLink className='me-5' to="/products/serie a/all">See All</NavLink>
                                                <div className='filter text-uppercase'>
                                                    <span className='text-capitalize text-white me-3 fs-5'>Filter By Size:</span>
                                                    <button
                                                        className={activeButton === 'xs' ? 'me-3 active' : 'me-3'}
                                                        onClick={() => {
                                                            handleClick('xs');
                                                            getByBrandAndSize(league.leagueOrBrand, 'xs')
                                                        }}
                                                    >
                                                        xs
                                                    </button>
                                                    <button
                                                        className={activeButton === 's' ? 'me-3 active' : 'me-3'}
                                                        onClick={() => {
                                                            handleClick('s');
                                                            getByBrandAndSize(league.leagueOrBrand, 's')
                                                        }}
                                                    >
                                                        s
                                                    </button>
                                                    <button
                                                        className={activeButton === 'm' ? 'me-3 active' : 'me-3'}
                                                        onClick={() => {
                                                            handleClick('m');
                                                            getByBrandAndSize(league.leagueOrBrand, 'm')
                                                        }}
                                                    >
                                                        m
                                                    </button>
                                                    <button
                                                        className={activeButton === 'l' ? 'me-3 active' : 'me-3'}
                                                        onClick={() => {
                                                            handleClick('l');
                                                            getByBrandAndSize(league.leagueOrBrand, 'l')
                                                        }}
                                                    >
                                                        l
                                                    </button>
                                                    <button
                                                        className={activeButton === 'xl' ? 'me-3 active' : 'me-3'}
                                                        onClick={() => {
                                                            handleClick('xl');
                                                            getByBrandAndSize(league.leagueOrBrand, 'xl')
                                                        }}
                                                    >
                                                        xl
                                                    </button>
                                                    <button
                                                        className={activeButton === 'xxl' ? 'me-3 active' : 'me-3'}
                                                        onClick={() => {
                                                            handleClick('xxl');
                                                            getByBrandAndSize(league.leagueOrBrand, 'xxl')
                                                        }}
                                                    >
                                                        xxl
                                                    </button>
                                                    <button
                                                        className={activeButton === 'xxxl' ? 'me-3 active' : 'me-3'}
                                                        onClick={() => {
                                                            handleClick('xxxl');
                                                            getByBrandAndSize(league.leagueOrBrand, 'xxxl')
                                                        }}
                                                    >
                                                        xxxl
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="slider_container d-flex">
                                                {stock.map(seriea =>
                                                    seriea.league === "serie a"
                                                        ?
                                                        <NavLink to={`/products/${params.category}/${seriea.code}`} key={seriea._id} className={calculateSalePrice(seriea) === 'Invalid input' ? "item" : "item sale"}>
                                                            <div className="image">
                                                                <img src={image1} alt="image1" />
                                                            </div>
                                                            <div className="info">
                                                                <div className="name">{seriea.code}</div>
                                                                <div className="inner_info d-flex justify-content-between">
                                                                    {calculateSalePrice(seriea) === 'Invalid input' ? <div className="price">{seriea.price}EGP</div> : <div className="price_dashed">{seriea.price}EGP</div>}
                                                                    {calculateSalePrice(seriea) !== 'Invalid input' ? <span>{calculateSalePrice(seriea)}EGP</span> : null}
                                                                    <div className="add_cart" onClick={(e) => {
                                                                        e.preventDefault();
                                                                        addToCart(seriea.code)
                                                                    }}><FontAwesomeIcon icon={faCartPlus} /></div>
                                                                </div>
                                                            </div>
                                                        </NavLink>
                                                        :
                                                        null
                                                )}
                                            </div>
                                        </>
                                        :
                                        null
                                )
                            }
                        </div>
                        <div className="spanish_league">
                            {
                                leagues.map(league =>
                                    league.leagueOrBrand === "La Liga"
                                        ?
                                        <>
                                            <h2>La Liga</h2>
                                            <div className="all_products d-flex">
                                                <NavLink className='me-5' to="/products/La Liga/all">See All</NavLink>
                                                <div className='filter text-uppercase'>
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
                                            </div>
                                            <div className="slider_container d-flex">
                                                {stock.map(la_liga =>
                                                    la_liga.league === "La Liga"
                                                        ?
                                                        <NavLink to={`/products/${params.category}/${la_liga.code}`} key={la_liga._id} className={calculateSalePrice(la_liga) === 'Invalid input' ? "item" : "item sale"}>
                                                            <div className="image">
                                                                <img src={image1} alt="image1" />
                                                            </div>
                                                            <div className="info">
                                                                <div className="name">{la_liga.code}</div>
                                                                <div className="inner_info d-flex justify-content-between">
                                                                    {calculateSalePrice(la_liga) === 'Invalid input' ? <div className="price">{la_liga.price}EGP</div> : <div className="price_dashed">{la_liga.price}EGP</div>}
                                                                    {calculateSalePrice(la_liga) !== 'Invalid input' ? <span>{calculateSalePrice(la_liga)}EGP</span> : null}
                                                                    <div className="add_cart" onClick={(e) => {
                                                                        e.preventDefault();
                                                                        addToCart(la_liga.code)
                                                                    }}><FontAwesomeIcon icon={faCartPlus} /></div>
                                                                </div>
                                                            </div>
                                                        </NavLink>
                                                        :
                                                        null
                                                )}
                                            </div>
                                        </>
                                        :
                                        null
                                )
                            }
                        </div>
                        <div className="saudi_league">
                            {
                                leagues.map(league =>
                                    league.leagueOrBrand === "saudi"
                                        ?
                                        <>
                                            <h2>Saudi League</h2>
                                            <div className="all_products d-flex">
                                                <NavLink className='me-5' to="/products/saudi/all">See All</NavLink>
                                                <div className='filter text-uppercase'>
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
                                            </div>
                                            <div className="slider_container d-flex">
                                                {stock.map(saudi =>
                                                    saudi.league === "saudi"
                                                        ?
                                                        <NavLink to={`/products/${params.category}/${saudi.code}`} key={saudi._id} className={calculateSalePrice(saudi) === 'Invalid input' ? "item" : "item sale"}>
                                                            <div className="image">
                                                                <img src={image1} alt="image1" />
                                                            </div>
                                                            <div className="info">
                                                                <div className="name">{saudi.code}</div>
                                                                <div className="inner_info d-flex justify-content-between">
                                                                    {calculateSalePrice(saudi) === 'Invalid input' ? <div className="price">{saudi.price}EGP</div> : <div className="price_dashed">{saudi.price}EGP</div>}
                                                                    {calculateSalePrice(saudi) !== 'Invalid input' ? <span>{calculateSalePrice(saudi)}EGP</span> : null}
                                                                    <div className="add_cart" onClick={(e) => {
                                                                        e.preventDefault();
                                                                        addToCart(saudi.code)
                                                                    }}><FontAwesomeIcon icon={faCartPlus} /></div>
                                                                </div>
                                                            </div>
                                                        </NavLink>
                                                        :
                                                        null
                                                )}
                                            </div>
                                        </>
                                        :
                                        null
                                )
                            }
                        </div>
                    </div>
                }
                {
                    params.category === "studs_turfs" &&
                    <div className='studs_turfs'>
                        {
                            leagues.map(league =>
                                league.leagueOrBrand === "puma"
                                    ?
                                    <>
                                        <div className="puma">
                                            <h2>Puma</h2>
                                            <div className="all_products">
                                                <NavLink to="/products/studs_turfs/all">See All</NavLink>
                                            </div>
                                            <div className="slider_container d-flex">
                                                {stock.map(item =>
                                                    item.BrandName === "puma"
                                                        ?
                                                        <NavLink to={`/products/${params.category}/${item.code}`} key={item._id} className="item">
                                                            <div className="image">
                                                                <img src={image4} alt="image1" />
                                                            </div>
                                                            <div className="info">
                                                                <div className="name">{item.code}</div>
                                                                <div className="inner_info d-flex justify-content-between">
                                                                    {calculateSalePrice(item) === 'Invalid input' ? <div className="price">{item.price}EGP</div> : <div className="price_dashed">{item.price}EGP</div>}
                                                                    {calculateSalePrice(item) !== 'Invalid input' ? <span>{calculateSalePrice(item)}EGP</span> : null}
                                                                    <div className="add_cart" onClick={(e) => {
                                                                        e.preventDefault();
                                                                        addToCart(item.code)
                                                                    }}><FontAwesomeIcon icon={faCartPlus} /></div>
                                                                </div>
                                                            </div>
                                                        </NavLink>
                                                        :
                                                        null
                                                )}
                                            </div>
                                        </div>
                                    </>
                                    :
                                    null
                            )
                        }
                        {
                            leagues.map(league =>
                                league.leagueOrBrand === "adidas"
                                    ?
                                    <>
                                        <div className="adidas">
                                            <h2>Adidas</h2>
                                            <div className="all_products">
                                                <NavLink to="/products/studs_turfs/all">See All</NavLink>
                                            </div>
                                            <div className="slider_container d-flex">
                                                {stock.map(item =>
                                                    item.BrandName === "adidas"
                                                        ?
                                                        <NavLink to={`/products/${params.category}/${item.code}`} key={item._id} className="item">
                                                            <div className="image">
                                                                <img src={image4} alt="image1" />
                                                            </div>
                                                            <div className="info">
                                                                <div className="name">{item.code}</div>
                                                                <div className="inner_info d-flex justify-content-between">
                                                                    {calculateSalePrice(item) === 'Invalid input' ? <div className="price">{item.price}EGP</div> : <div className="price_dashed">{item.price}EGP</div>}
                                                                    {calculateSalePrice(item) !== 'Invalid input' ? <span>{calculateSalePrice(item)}EGP</span> : null}
                                                                    <div className="add_cart" onClick={(e) => {
                                                                        e.preventDefault();
                                                                        addToCart(item.code)
                                                                    }}><FontAwesomeIcon icon={faCartPlus} /></div>
                                                                </div>
                                                            </div>
                                                        </NavLink>
                                                        :
                                                        null
                                                )}
                                            </div>
                                        </div>
                                    </>
                                    :
                                    null
                            )
                        }
                        {
                            leagues.map(league =>
                                league.leagueOrBrand === "nike"
                                    ?
                                    <>
                                        <div className="nike">
                                            <h2>Nike</h2>
                                            <div className="all_products">
                                                <NavLink to="/products/studs_turfs/all">See All</NavLink>
                                            </div>
                                            <div className="slider_container d-flex">
                                                {stock.map(item =>
                                                    item.BrandName === "nike" && item.type === "studs"
                                                        ?
                                                        <NavLink to={`/products/${params.category}/${item.code}`} key={item._id} className="item">
                                                            <div className="image">
                                                                <img src={image4} alt="image1" />
                                                            </div>
                                                            <div className="info">
                                                                <div className="name">{item.code}</div>
                                                                <div className="inner_info d-flex justify-content-between">
                                                                    {calculateSalePrice(item) === 'Invalid input' ? <div className="price">{item.price}EGP</div> : <div className="price_dashed">{item.price}EGP</div>}
                                                                    {calculateSalePrice(item) !== 'Invalid input' ? <span>{calculateSalePrice(item)}EGP</span> : null}
                                                                    <div className="add_cart" onClick={(e) => {
                                                                        e.preventDefault();
                                                                        addToCart(item.code)
                                                                    }}><FontAwesomeIcon icon={faCartPlus} /></div>
                                                                </div>
                                                            </div>
                                                        </NavLink>
                                                        :
                                                        null
                                                )}
                                            </div>
                                        </div>
                                    </>
                                    :
                                    null
                            )
                        }
                    </div>
                }
                {
                    params.category === "sportsWear" &&
                    <div className='sports_wear'>
                        <h2>Sports Wear</h2>
                        <div className="all_products">
                            <NavLink to="/products/sportsWear/all">See All</NavLink>
                        </div>
                        <div className="slider_container d-flex">
                            {stock.map(item =>
                                item.type === "sports wear"
                                    ?
                                    <NavLink to={`/products/${params.category}/${item.code}`} key={item.id} className="item">
                                        <div className="image">
                                            <img src={item.image} alt="image1" />
                                        </div>
                                        <div className="info">
                                            <div className="name">{item.title}</div>
                                            <div className="inner_info d-flex justify-content-between">
                                                {calculateSalePrice(item) === 'Invalid input' ? <div className="price">{item.price}EGP</div> : <div className="price_dashed">{item.price}EGP</div>}
                                                {calculateSalePrice(item) !== 'Invalid input' ? <span>{calculateSalePrice(item)}EGP</span> : null}
                                                <div className="add_cart" onClick={(e) => {
                                                    e.preventDefault();
                                                    addToCart(item.code)
                                                }}><FontAwesomeIcon icon={faCartPlus} /></div>
                                            </div>
                                        </div>
                                    </NavLink>
                                    :
                                    null
                            )}
                        </div>
                    </div>
                }
                {
                    params.category === "classicJerseys" &&
                    <div className='classic_jerseys'>
                        <h2>Classic Jerseys</h2>
                        <div className="all_products">
                            <NavLink to="/products/classicJerseys/all">See All</NavLink>
                        </div>
                        <div className="slider_container d-flex">
                            {stock.map(item =>
                                item.type === "classic jerseys"
                                    ?
                                    <NavLink to={`/products/${params.category}/${item.code}`} key={item.id} className="item">
                                        <div className="image">
                                            <img src={item.image} alt="image1" />
                                        </div>
                                        <div className="info">
                                            <div className="name">{item.title}</div>
                                            <div className="inner_info d-flex justify-content-between">
                                                {calculateSalePrice(item) === 'Invalid input' ? <div className="price">{item.price}EGP</div> : <div className="price_dashed">{item.price}EGP</div>}
                                                {calculateSalePrice(item) !== 'Invalid input' ? <span>{calculateSalePrice(item)}EGP</span> : null}
                                                <div className="add_cart" onClick={(e) => {
                                                    e.preventDefault();
                                                    addToCart(item.code)
                                                }}><FontAwesomeIcon icon={faCartPlus} /></div>
                                            </div>
                                        </div>
                                    </NavLink>
                                    :
                                    null
                            )}
                        </div>
                    </div>
                }
                {
                    params.category === "previousSeasons" &&
                    <div className='previous_seasons'>
                        <h2>Previous Seasons</h2>
                        <div className="all_products">
                            <NavLink to="/products/previousSeasons/all">See All</NavLink>
                        </div>
                        <div className="slider_container d-flex">
                            {stock.map(item =>
                                item.type === "previous seasons"
                                    ?
                                    <NavLink to={`/products/${params.category}/${item.code}`} key={item.id} className="item">
                                        <div className="image">
                                            <img src={item.image} alt="image1" />
                                        </div>
                                        <div className="info">
                                            <div className="name">{item.title}</div>
                                            <div className="inner_info d-flex justify-content-between">
                                                {calculateSalePrice(item) === 'Invalid input' ? <div className="price">{item.price}EGP</div> : <div className="price_dashed">{item.price}EGP</div>}
                                                {calculateSalePrice(item) !== 'Invalid input' ? <span>{calculateSalePrice(item)}EGP</span> : null}
                                                <div className="add_cart" onClick={(e) => {
                                                    e.preventDefault();
                                                    addToCart(item.code)
                                                }}><FontAwesomeIcon icon={faCartPlus} /></div>
                                            </div>
                                        </div>
                                    </NavLink>
                                    :
                                    null
                            )}
                        </div>
                    </div>
                }
            </Container >
        </div >
    )
}
