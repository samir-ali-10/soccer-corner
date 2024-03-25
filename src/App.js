import { Route, Routes } from 'react-router';
import './App.css';
import Navigation from './components/Navigation';
import AdminView from './views/admin/AdminView';
import ReviewsAdmin from './views/admin/ReviewsAdmin';
import Home from './views/Home';
import AddProducts from './views/admin/AddProducts';
import Footer from './components/Footer';
import Products from './views/Products';
import ProductDetails from './views/ProductDetails';
import ContactUs from './views/ContactUs';
import Cart from './views/Cart';
import Stock from './views/admin/Stock';
import ProductsAll from './views/ProductsAll';
import EditProduct from './views/admin/EditProduct';
import ComplainsAdmin from "./views/admin/ComplainsAdmin"
import NewOrders from "./views/admin/NewOrders"
import Checkout from './views/Checkout';
import Shipping from './views/policies/Shipping';
import Refund from './views/policies/Refund';
import { useCallback, useEffect, useState } from 'react';
import Signup from './components/Signup';
import Signin from './components/Signin';
import New from './views/admin/New';
import Archived from './views/admin/Archived';

function App() {

  const [appearLoginSignup, setAppearLoginSignup] = useState(true),
    [appearFooter, setAppearFooter] = useState(true),
    [loggedIn, setLoggedIn] = useState(false);

  return (
    <>
      {!appearLoginSignup ? null : <Navigation />}
      <Routes>
        <Route path="/signup" element={<Signup appearLoginSignup={appearLoginSignup} setAppearLoginSignup={setAppearLoginSignup} />} />
        <Route path="/login" element={<Signin appearLoginSignup={appearLoginSignup} setAppearLoginSignup={setAppearLoginSignup} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
        <Route path="/" element={<Home appearLoginSignup={appearLoginSignup} setAppearLoginSignup={setAppearLoginSignup} />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout setAppearFooter={setAppearFooter} setAppearLoginSignup={setAppearLoginSignup} />} />
        <Route path="/products/:category" element={<Products />} />
        <Route path="/products/:category/all" element={<ProductsAll />} />
        <Route path="/products/:category/:code" element={<ProductDetails />} />
        <Route path="/adminSecret" element={<AdminView />} />
        <Route path="/adminSecret/reviews" element={<ReviewsAdmin />} />
        <Route path="/adminSecret/addProducts" element={<AddProducts />} />
        <Route path="/adminSecret/stock" element={<Stock />} />
        <Route path="/adminSecret/complains" element={<ComplainsAdmin />} />
        <Route path="/adminSecret/newOrders" element={<NewOrders />} />
        <Route path="/adminSecret/newOrders/new" element={<New />} />
        <Route path="/adminSecret/newOrders/archived" element={<Archived />} />
        <Route path="/adminSecret/editProduct/:code" element={<EditProduct />} />
        <Route path="/shippingPolicy" element={<Shipping />} />
        <Route path="/refund&exchangePolicy" element={<Refund />} />
      </Routes>
      {!appearLoginSignup || !appearFooter ? null : <Footer />}
    </>
  );
}

export default App;
