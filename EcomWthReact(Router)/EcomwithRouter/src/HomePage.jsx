import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/Products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/Products/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setProducts(products.filter((product) => product.id !== id));
      } else {
        console.error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div>
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
      <style jsx>{`
  /* CSS Reset */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* Background Image */
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

  /* Product Grid */
  .product-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    padding: 20px;
    justify-content: center;
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

  .product-card button:hover {
    background-color: #e65050;
  }

  /* Responsive Styles */
  @media (max-width: 768px) {
    .product-list {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 480px) {
    .product-list {
      grid-template-columns: 1fr;
    }
  }
`}</style>

    </div>
  );
};

export default HomePage;
