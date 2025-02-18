import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './pages/ProductList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<ProductList />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
