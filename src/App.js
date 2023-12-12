import { Route, Routes } from 'react-router';
import './App.css';
import Navigation from './components/Navigation';
import AdminView from './views/AdminView';
import ReviewsAdmin from './views/ReviewsAdmin';

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/adminSecret" element={<AdminView />} />
        <Route path="/adminSecret/reviews" element={<ReviewsAdmin />} />
      </Routes>
    </>
  );
}

export default App;
