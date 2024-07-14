import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import ProductForm from "./ProductForm";
import SignUpForm from "./SignupForm";

function ProductList({ products, deleteProduct }) {
  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <img src={product.imageUrl} alt={product.title} />
          <h2>{product.title}</h2>
          <p>Price: ${product.price}</p>
          <p>{product.description}</p>
          <p>Rating: {product.rating}</p>
          <p>Reviews: {product.reviewCount}</p>
          <button onClick={() => deleteProduct(product.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await fetch("http://localhost:3000/products");
    const data = await response.json();
    setProducts(data);
  };

  const addProduct = async (newProduct) => {
    const response = await fetch("http://localhost:3000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    const data = await response.json();
    setProducts([...products, data]);
  };

  const deleteProduct = async (id) => {
    await fetch(`http://localhost:3000/products/${id}`, {
      method: "DELETE",
    });
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <Router>
      <>
        <style>
          {`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            background-color: aquamarine;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            background-attachment: fixed;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }

          .product-list {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            padding: 20px;
            justify-content: center;
            flex-grow: 1;
          }

          .product-card {
            background-color: rgba(245, 245, 245, 0.9);
            padding: 20px;
            text-align: center;
            box-shadow: 0 10px 10px rgba(35, 152, 210, 0.826);
            transition: box-shadow 0.3s ease-in-out;
          }

          .product-card:hover {
            box-shadow: 0 0 20px rgba(203, 10, 10, 0.628);
          }

          .product-card img {
            max-width: 100%;
            height: 200px;
            object-fit: contain;
          }

          .product-card h2 {
            margin-top: 10px;
          }

          .product-card p {
            margin-top: 5px;
            font-weight: bold;
          }

          .product-card button {
            background-color: #ff6b6b;
            color: #fff;
            border: none;
            padding: 10px 20px;
            margin-top: 10px;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s ease-in-out;
          }

          .product-card button:not(:last-child) {
            margin-right: 10px;
          }

          .product-card button:hover {
            background-color: #e65050;
          }

          @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }

          nav {
            margin-bottom: 20px;
          }

          nav a {
            margin-right: 10px;
            text-decoration: none;
            color: #333;
            font-weight: bold;
          }

          nav a:hover {
            color: #4CAF50;
          }
          `}
        </style>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/add-product">Add Product</Link>
          <Link to="/signup">Sign Up</Link>
        </nav>
        <h1>E-commerce Home Page</h1>
        <Routes>
          <Route path="/" element={<ProductList products={products} deleteProduct={deleteProduct} />} />
          <Route path="/add-product" element={<ProductForm onAddProduct={addProduct} />} />
          <Route path="/signup" element={<SignUpForm />} />
        </Routes>
        </>
    </Router>
  );
}

export default App;
