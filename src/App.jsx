import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<ProductList />}></Route>
        <Route path='/products/:id' element={<ProductDetail />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
