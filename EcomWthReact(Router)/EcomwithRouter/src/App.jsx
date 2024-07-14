import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import ProductForm from './Productform';
import HomePage from './HomePage';
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';

const App = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from db.json
    fetch('/db.json')
      .then(response => response.json())
      .then(data => setProducts(data.products))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const addProduct = async (newProduct) => {
    setProducts(prevProducts => [...prevProducts, newProduct]);
  };

  return (
    <Router>
      <div className="App">
        <style>
          {`
            nav {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 1rem;
              background-color: black;
            }
            .site-name {
              font-size: 1.5rem;
              font-weight: bold;
              color: Red;
            }
            ul {
              list-style-type: none;
              display: flex;
              margin: 0;
              padding: 0;
            }
            li {
              margin-left: 1rem;
            }
            nav a {
              float: left;
              color: #f2f2f2;
              text-align: center;
              padding: 14px 16px;
              text-decoration: none;
              font-size: 17px;
            }
            nav a:hover {
              background-color: #ddd;
              color: black;
            }
            nav a.active {
              background-color: #4CAF50;
              color: white;
            }
          `}
        </style>
        <nav>
          <div className="site-name">D&J Services</div>
          <ul>
            <li><NavLink to="/" end>Home</NavLink></li>
            <li><NavLink to="/product-form">Add Product</NavLink></li>
            <li><NavLink to="/signup">Sign Up</NavLink></li>
            <li><NavLink to="/login">Login</NavLink></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage products={products} />} />
          <Route path="/product-form" element={<ProductForm addProduct={addProduct} />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
