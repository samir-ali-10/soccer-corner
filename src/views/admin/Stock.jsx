import { faLeftLong } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import image1 from "../../images/carousel_1.jpeg"
import image2 from "../../images/carousel_2.jpeg"
import image3 from "../../images/carousel_3.jpeg"
import Spinner from 'react-bootstrap/Spinner';
import Swal from 'sweetalert2'


export default function Stock() {

    const sizeOptions = [
        { value: '', text: '--Choose a Size--' },
        { value: 's', text: 'S' },
        { value: 'm', text: 'M' },
        { value: 'l', text: 'L' },
        { value: 'xl', text: 'XL' },
        { value: 'xxl', text: 'XXL' },
    ];

    const modelOptions = [
        { text: '--Choose a model--' },
        { text: '2020' },
        { text: '2021' },
        { text: '2022' },
        { text: '2023' },
    ];

    // const leagues = [
    //     { text: '--Choose a league--' },
    //     { text: "egyptian" },
    //     { text: "serie a" },
    //     { text: "spanish" },
    //     { text: "saudi" },
    // ]

    const [stock, setStock] = useState([]),
        [categories, setCategories] = useState([]),
        [leagues, setLeagues] = useState([]),
        [types, setTypes] = useState([]),
        [sizes, setSizes] = useState([]),
        [all, setAll] = useState(),
        [typeSelected, setTypeSelected] = useState(),
        [categorySelected, setCategorySelected] = useState(),
        [leagueSelected, setLeagueSelected] = useState(),
        [sizeSelected, setSizeSelected] = useState(),
        [modelSelected, setModelSelected] = useState(),
        [size, setSize] = useState(),
        [model, setModel] = useState(),
        [league, setLeague] = useState(),
        [type, setType] = useState(),
        [collectionName, setCollectionName] = useState("");

    let navigate = useNavigate();

    let getData = () => {
        setCollectionName("")
        setModel("")
        setSize("")
        setLeague("")
        setType("")
        setAll("all")
        fetch(`http://localhost:3001/api/products`).then((res) => res.json()).then((data) => setStock(data))
    }

    let getType = (val) => {
        setLeague("")
        setSize("")
        setModel("")
        setCollectionName("")
        setAll("");
        setType(val.target.value)
        fetch(`http://localhost:3001/api/products/type/${val.target.value}`).then((res) => res.json()).then((data) => setStock(data))
    }

    let getTypeBrandCollectionSize = (val) => {
        setSize(val.target.value);
        fetch(`http://localhost:3001/api/products/${type}/${league}/${collectionName}/${val.target.value}`).then((res) => res.json()).then((data) => setStock(data))
    }

    let getCollection = (val) => {
        setLeague("")
        setModel("")
        setSize("")
        setType("");
        setAll("");
        setCollectionName(val.target.value);
        fetch(`http://localhost:3001/api/products/collection/${val.target.value}`).then((res) => res.json()).then((data) => setStock(data))
    }

    let getLeague = (val) => {
        setCollectionName("")
        setModel("")
        setType("");
        setAll("");
        setLeague(val.target.value);
        fetch(`http://localhost:3001/api/products/league/${val.target.value}`).then((res) => res.json()).then((data) => setStock(data))
    }

    let getBySize = (val) => {
        setSize(val)
        fetch(`http://localhost:3001/api/products/size/${val.target.value}`).then((res) => res.json()).then((data) => setStock(data))
    }

    let getCollectionSize = (val) => {
        console.log(val);
        console.log(sizeSelected);
        setSize(val);
        // if (collectionName === "") {
        //     fetch(`http://localhost:3001/api/products/size/${val.target.value}`).then((res) => res.json()).then((data) => setStock(data))
        // }
        // else {
        //     fetch(`http://localhost:3001/api/products/collection/${collectionName}/size/${val.target.value}`).then((res) => res.json()).then((data) => setStock(data))
        // }
    }

    let getCollectionSizeModel = (val) => {
        setModel(val.target.value);
        fetch(`http://localhost:3001/api/products/collection/${collectionName}/model/${val.target.value}`).then((res) => res.json()).then((data) => setStock(data))
    }

    let getCategories = () => {
        fetch(`http://localhost:3001/api/products/CollectionsNames`).then((res) => res.json()).then((data) => setCategories(data));
    }

    let getLeagues = () => {
        fetch(`http://localhost:3001/api/products/LeagueOrBrandNames`).then((res) => res.json()).then((data) => setLeagues(data));
    }

    let getTypes = () => {
        fetch(`http://localhost:3001/api/products/types`).then((res) => res.json()).then((data) => setTypes(data));
    }

    let getSizes = () => {
        fetch(`http://localhost:3001/api/products/sizes`).then((res) => res.json()).then((data) => setSizes(data))
    }

    let propagationNo = (event) => {
        event.stopPropagation()
        event.preventDefault();
    }

    let navigateToEdit = (item) => {
        navigate(`/adminSecret/editProduct/${item.code}`);
    }


    const deleteItem = (itemName) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:3001/api/products/delete-product/${itemName.code}`).then(res => res.json()).then(data => console.log(data))
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
            window.location.reload()
        })
    }

    const deleteAllProducts = async () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:3001/api/products/delete-products`).then(res => res.json()).then(data => console.log(data))
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
            window.location.reload()
        })
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
        getCategories();
        getLeagues();
        getTypes();
        getSizes();
    }, [])

    console.log(sizes);
    console.log(size);

    return (
        <div className='stock mt-4 overflow-hidden'>
            <Container>
                <div className="back_to_admin">
                    <NavLink to="/adminSecret" className="back_to_admin"><FontAwesomeIcon icon={faLeftLong} />Back to admin dashboard</NavLink>
                </div>
                <h2>Stock</h2>
                <div className="categories mt-5">
                    <div className="teams">
                        <button onClick={getData}>All</button>
                        <select value={typeSelected} onChange={getType} name="categories" id="categories">
                            <option value={"--Choose a Collection--"} >--Choose a Product Type--</option>
                            {
                                types.map(type =>
                                    <option key={type.type} value={type.type}>{type.type}</option>
                                )
                            }
                        </select>
                        <select value={leagueSelected} onChange={getLeague} name="league" id="league">
                            <option value={"--Choose a League--"} >--Choose a League/BrandName--</option>
                            {
                                leagues.map(league =>
                                    <option key={league.leagueOrBrand} value={league.leagueOrBrand}>{league.leagueOrBrand}</option>
                                )
                            }
                        </select>
                        <select value={categorySelected} onChange={getCollection} name="categories" id="categories">
                            <option value={"--Choose a Collection--"} >--Choose a Collection--</option>
                            {
                                categories.map(category =>
                                    <option key={category.Name} value={category.Name}>{category.Name}</option>
                                )
                            }
                        </select>
                        <select value={modelSelected} onChange={getCollectionSizeModel} name="year" id="year">
                            {
                                modelOptions.map(option =>
                                    <option key={option.text} value={option.text}>{option.text}</option>
                                )
                            }
                        </select>
                    </div>
                </div>
                <div className="delete_all text-end">
                    <button onClick={() => {
                        deleteAllProducts()
                    }}>Delete All Products</button>
                </div>
                <div className="products">
                    {
                        stock.length !== 0
                            ?
                            <>
                                {
                                    collectionName === ""
                                        ?
                                        <>
                                            {collectionName ? <h3>{collectionName}</h3> : <h3>All Products</h3>}
                                            {all === "all"
                                                ?
                                                null
                                                :
                                                type !== ""
                                                    ?
                                                    <h2>{type}</h2>
                                                    :
                                                    league === "egyptian" ? <h2 className='league'>Egyptian League</h2> : null
                                            }
                                            {model ? <p className='text-center text-white'>{model}</p> : ""}
                                            <div className="products_container mb-5">
                                                {
                                                    stock.map((item) => item.league === "egyptian"
                                                        ?
                                                        <NavLink key={item._id} className="product" to="">
                                                            <div className="image">
                                                                <img src={image1} alt="image1" />
                                                            </div>
                                                            <div className="info">
                                                                <div className="code">Product Code: <span>{item.code}</span></div>
                                                                <div className="league">Product League: <span>{item.league}</span></div>
                                                                <div className="model">Product Model: <span>{item.model}</span></div>
                                                                <div className="collectionName">Product Name: <span>{item.collectionName}</span></div>
                                                                <div className="price">Product Price: <span>{item.price}EGP</span></div>
                                                                <div className="size">Product Size: <span>{item.size}</span></div>
                                                                <div className="description">Product Description: <span>{item.description}</span></div>
                                                                <div className="quantity">Product Quantity: <span>{item.quantity} pieces</span></div>
                                                                {item.sale !== null ? <div className="sale">Product Sale: <span>{item.sale}</span></div> : null}
                                                                {item.sale !== null ? <div className="sale_price">Product Sale Price: <span>{calculateSalePrice(item)}EGP</span></div> : null}
                                                                {item.newCollection !== "" ? <div className="new_collection">New Collection: <span>{item.newCollection}</span></div> : null}
                                                                <div className="delete_item">
                                                                    <button onClick={(e) => {
                                                                        propagationNo(e)
                                                                        deleteItem(item)
                                                                    }}>Delete Product</button>
                                                                    <button onClick={(e) => {
                                                                        propagationNo(e)
                                                                        navigateToEdit(item)
                                                                    }} className='edit_product'>Edit Product</button>
                                                                </div>
                                                            </div>
                                                        </NavLink>
                                                        :
                                                        null
                                                    )
                                                }
                                            </div>
                                            {all === "all"
                                                ?
                                                null
                                                :
                                                type !== ""
                                                    ?
                                                    <h2>{type}</h2>
                                                    :
                                                    league === "serie a" ? <h2 className='league'>Serie A</h2> : null
                                            }
                                            {model ? <p className='text-center text-white'>{model}</p> : ""}
                                            <div className="products_container mb-5">
                                                {
                                                    stock.map((item) => item.league === "serie a"
                                                        ?
                                                        <NavLink key={item._id} className="product" to="">
                                                            <div className="image">
                                                                <img src={image1} alt="image1" />
                                                            </div>
                                                            <div className="info">
                                                                <div className="code">Product Code: <span>{item.code}</span></div>
                                                                <div className="league">Product League: <span>{item.league}</span></div>
                                                                <div className="model">Product Model: <span>{item.model}</span></div>
                                                                <div className="collectionName">Product Name: <span>{item.collectionName}</span></div>
                                                                <div className="price">Product Price: <span>{item.price}EGP</span></div>
                                                                <div className="size">Product Size: <span>{item.size}</span></div>
                                                                <div className="description">Product Description: <span>{item.description}</span></div>
                                                                <div className="quantity">Product Quantity: <span>{item.quantity} pieces</span></div>
                                                                {item.sale !== null ? <div className="sale">Product Sale: <span>{item.sale}</span></div> : null}
                                                                {item.sale !== null ? <div className="sale_price">Product Sale Price: <span>{calculateSalePrice(item)}EGP</span></div> : null}
                                                                {item.newCollection !== "" ? <div className="new_collection">New Collection: <span>{item.newCollection}</span></div> : null}
                                                                <div className="delete_item">
                                                                    <button onClick={(e) => {
                                                                        propagationNo(e)
                                                                        deleteItem(item)
                                                                    }}>Delete Product</button>
                                                                    <button onClick={(e) => {
                                                                        propagationNo(e)
                                                                        navigateToEdit(item)
                                                                    }} className='edit_product'>Edit Product</button>
                                                                </div>
                                                            </div>
                                                        </NavLink>
                                                        :
                                                        null
                                                    )
                                                }
                                            </div>
                                            {all === "all"
                                                ?
                                                null
                                                :
                                                type !== ""
                                                    ?
                                                    <h2>{type}</h2>
                                                    :
                                                    league === "La Liga" ? <h2 className='league'>La Liga</h2> : null
                                            }
                                            {model ? <p className='text-center text-white'>{model}</p> : ""}
                                            <div className="products_container mb-5">
                                                {
                                                    stock.map((item) => item.league === "La Liga"
                                                        ?
                                                        <NavLink key={item._id} className="product" to="">
                                                            <div className="image">
                                                                <img src={image1} alt="image1" />
                                                            </div>
                                                            <div className="info">
                                                                <div className="code">Product Code: <span>{item.code}</span></div>
                                                                <div className="league">Product League: <span>{item.league}</span></div>
                                                                <div className="model">Product Model: <span>{item.model}</span></div>
                                                                <div className="collectionName">Product Name: <span>{item.collectionName}</span></div>
                                                                <div className="price">Product Price: <span>{item.price}EGP</span></div>
                                                                <div className="size">Product Size: <span>{item.size}</span></div>
                                                                <div className="description">Product Description: <span>{item.description}</span></div>
                                                                <div className="quantity">Product Quantity: <span>{item.quantity} pieces</span></div>
                                                                {item.sale !== null ? <div className="sale">Product Sale: <span>{item.sale}</span></div> : null}
                                                                {item.sale !== null ? <div className="sale_price">Product Sale Price: <span>{calculateSalePrice(item)}EGP</span></div> : null}
                                                                {item.newCollection !== "" ? <div className="new_collection">New Collection: <span>{item.newCollection}</span></div> : null}
                                                                <div className="delete_item">
                                                                    <button onClick={(e) => {
                                                                        propagationNo(e)
                                                                        deleteItem(item)
                                                                    }}>Delete Product</button>
                                                                    <button onClick={(e) => {
                                                                        propagationNo(e)
                                                                        navigateToEdit(item)
                                                                    }} className='edit_product'>Edit Product</button>
                                                                </div>
                                                            </div>
                                                        </NavLink>
                                                        :
                                                        null
                                                    )
                                                }
                                            </div>
                                            {all === "all"
                                                ?
                                                null
                                                :
                                                type !== ""
                                                    ?
                                                    <h2>{type}</h2>
                                                    :
                                                    league === "premier" ? <h2 className='league'>Premier League</h2> : null
                                            }
                                            {model ? <p className='text-center text-white'>{model}</p> : ""}
                                            <div className="products_container mb-5">
                                                {
                                                    stock.map((item) => item.league === "premier"
                                                        ?
                                                        <NavLink key={item._id} className="product" to="">
                                                            <div className="image">
                                                                <img src={image1} alt="image1" />
                                                            </div>
                                                            <div className="info">
                                                                <div className="code">Product Code: <span>{item.code}</span></div>
                                                                <div className="league">Product League: <span>{item.league}</span></div>
                                                                <div className="model">Product Model: <span>{item.model}</span></div>
                                                                <div className="collectionName">Product Name: <span>{item.collectionName}</span></div>
                                                                <div className="price">Product Price: <span>{item.price}EGP</span></div>
                                                                <div className="size">Product Size: <span>{item.size}</span></div>
                                                                <div className="description">Product Description: <span>{item.description}</span></div>
                                                                <div className="quantity">Product Quantity: <span>{item.quantity} pieces</span></div>
                                                                {item.sale !== null ? <div className="sale">Product Sale: <span>{item.sale}</span></div> : null}
                                                                {item.sale !== null ? <div className="sale_price">Product Sale Price: <span>{calculateSalePrice(item)}EGP</span></div> : null}
                                                                {item.newCollection !== "" ? <div className="new_collection">New Collection: <span>{item.newCollection}</span></div> : null}
                                                                <div className="delete_item">
                                                                    <button onClick={(e) => {
                                                                        propagationNo(e)
                                                                        deleteItem(item)
                                                                    }}>Delete Product</button>
                                                                    <button onClick={(e) => {
                                                                        propagationNo(e)
                                                                        navigateToEdit(item)
                                                                    }} className='edit_product'>Edit Product</button>
                                                                </div>
                                                            </div>
                                                        </NavLink>
                                                        :
                                                        null
                                                    )
                                                }
                                            </div>
                                            {all === "all"
                                                ?
                                                null
                                                :
                                                type !== ""
                                                    ?
                                                    <h2>{type}</h2>
                                                    :
                                                    league === "saudi" ? <h2 className='league'>Saudi League</h2> : null
                                            }
                                            {model ? <p className='text-center text-white'>{model}</p> : ""}
                                            <div className="products_container mb-5">
                                                {
                                                    stock.map((item) => item.league === "saudi"
                                                        ?
                                                        <NavLink key={item._id} className="product" to="">
                                                            <div className="image">
                                                                <img src={image1} alt="image1" />
                                                            </div>
                                                            <div className="info">
                                                                <div className="code">Product Code: <span>{item.code}</span></div>
                                                                <div className="league">Product League: <span>{item.league}</span></div>
                                                                <div className="model">Product Model: <span>{item.model}</span></div>
                                                                <div className="collectionName">Product Name: <span>{item.collectionName}</span></div>
                                                                <div className="price">Product Price: <span>{item.price}EGP</span></div>
                                                                <div className="size">Product Size: <span>{item.size}</span></div>
                                                                <div className="description">Product Description: <span>{item.description}</span></div>
                                                                <div className="quantity">Product Quantity: <span>{item.quantity} pieces</span></div>
                                                                {item.sale !== null ? <div className="sale">Product Sale: <span>{item.sale}%</span></div> : null}
                                                                {item.sale !== null ? <div className="sale_price">Product Sale Price: <span>{calculateSalePrice(item)}EGP</span></div> : null}
                                                                {item.newCollection !== "" ? <div className="new_collection">New Collection: <span>{item.newCollection}</span></div> : null}
                                                                <div className="delete_item">
                                                                    <button onClick={(e) => {
                                                                        propagationNo(e)
                                                                        deleteItem(item)
                                                                    }}>Delete Product</button>
                                                                    <button onClick={(e) => {
                                                                        propagationNo(e)
                                                                        navigateToEdit(item)
                                                                    }} className='edit_product'>Edit Product</button>
                                                                </div>
                                                            </div>
                                                        </NavLink>
                                                        :
                                                        null
                                                    )
                                                }
                                            </div>
                                            {all === "all"
                                                ?
                                                null
                                                :
                                                type !== ""
                                                    ?
                                                    <h2>{type}</h2>
                                                    :
                                                    league === "saudi" ? <h2 className='league'>Saudi League</h2> : null
                                            }
                                            {model ? <p className='text-center text-white'>{model}</p> : ""}
                                            <div className="products_container mb-5">
                                                {
                                                    stock.map((item) => item.type === type
                                                        ?
                                                        <NavLink key={item._id} className="product" to="">
                                                            <div className="image">
                                                                <img src={image1} alt="image1" />
                                                            </div>
                                                            <div className="info">
                                                                <div className="code">Product Code: <span>{item.code}</span></div>
                                                                <div className="league">Product League: <span>{item.league}</span></div>
                                                                <div className="model">Product Model: <span>{item.model}</span></div>
                                                                <div className="collectionName">Product Name: <span>{item.collectionName}</span></div>
                                                                <div className="price">Product Price: <span>{item.price}EGP</span></div>
                                                                <div className="size">Product Size: <span>{item.size}</span></div>
                                                                <div className="description">Product Description: <span>{item.description}</span></div>
                                                                <div className="quantity">Product Quantity: <span>{item.quantity} pieces</span></div>
                                                                {item.sale !== null ? <div className="sale">Product Sale: <span>{item.sale}%</span></div> : null}
                                                                {item.sale !== null ? <div className="sale_price">Product Sale Price: <span>{calculateSalePrice(item)}EGP</span></div> : null}
                                                                {item.newCollection !== "" ? <div className="new_collection">New Collection: <span>{item.newCollection}</span></div> : null}
                                                                <div className="delete_item">
                                                                    <button onClick={(e) => {
                                                                        propagationNo(e)
                                                                        deleteItem(item)
                                                                    }}>Delete Product</button>
                                                                    <button onClick={(e) => {
                                                                        propagationNo(e)
                                                                        navigateToEdit(item)
                                                                    }} className='edit_product'>Edit Product</button>
                                                                </div>
                                                            </div>
                                                        </NavLink>
                                                        :
                                                        null
                                                    )
                                                }
                                            </div>
                                        </>
                                        :
                                        <>
                                            {collectionName ? <h3>{collectionName}</h3> : <h3>All Products</h3>}
                                            {model ? <p className='text-center text-white'>{model}</p> : ""}
                                            <div className="products_container mb-5">
                                                {
                                                    stock.map(item =>
                                                        <NavLink key={item._id} className="product" to="">
                                                            <div className="image">
                                                                <img src={image1} alt="image1" />
                                                            </div>
                                                            <div className="info">
                                                                <div className="code">Product Code: <span>{item.code}</span></div>
                                                                <div className="league">Product League: <span>{item.league}</span></div>
                                                                <div className="model">Product Model: <span>{item.model}</span></div>
                                                                <div className="collectionName">Product Name: <span>{item.collectionName}</span></div>
                                                                <div className="price">Product Price: <span>{item.price}EGP</span></div>
                                                                <div className="size">Product Size: <span>{item.size}</span></div>
                                                                <div className="description">Product Description: <span>{item.description}</span></div>
                                                                <div className="quantity">Product Quantity: <span>{item.quantity} pieces</span></div>
                                                                <div className="delete_item">
                                                                    <button onClick={(e) => {
                                                                        propagationNo(e)
                                                                        deleteItem(item)
                                                                    }}>Delete Product</button>
                                                                    <button onClick={(e) => {
                                                                        propagationNo(e)
                                                                        navigateToEdit(item)
                                                                    }} className='edit_product'>Edit Product</button>
                                                                </div>
                                                            </div>
                                                        </NavLink>
                                                    )
                                                }
                                            </div>
                                        </>
                                }
                            </>
                            :
                            <div className="empty text-center fs-1">
                                No products in the list yet!
                            </div>
                    }
                </div>
            </Container>
        </div>
    )
}
