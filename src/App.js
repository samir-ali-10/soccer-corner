import { Route, Routes } from 'react-router';
import './App.css';
import Navigation from './components/Navigation';
import AdminView from './views/AdminView';

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/adminSecret" element={<AdminView />} />
      </Routes>
    </>
  );
}

export default App;
