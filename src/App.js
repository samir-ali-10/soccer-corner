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

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:category" element={<Products />} />
        <Route path="/products/:category/:productId" element={<ProductDetails />} />
        <Route path="/adminSecret" element={<AdminView />} />
        <Route path="/adminSecret/reviews" element={<ReviewsAdmin />} />
        <Route path="/adminSecret/addProducts" element={<AddProducts />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
