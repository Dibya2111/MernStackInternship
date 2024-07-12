import { useState, useEffect } from "react";
import ProductForm from "./ProductForm";

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
    <div className="App">
      <style>
        {`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            /* background-image: url('https://example.com/background.jpg'); */
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

          form {
            max-width: 400px;
            margin: 20px auto;
            padding: 20px;
            background-color: #e1b0b0;
            border-radius: 5px;
            text-align: center;
            animation: fadeIn 1s ease;
          }

          @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }

          label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
          }

          input[type="text"],
          input[type="number"],
          textarea {
            width: 100%;
            padding: 8px;
            margin-bottom: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-sizing: border-box;
            transition: border-color 0.3s ease;
          }

          input[type="text"]:focus,
          input[type="number"]:focus,
          textarea:focus {
            border-color: #4CAF50;
          }
          input[type="text"],input[name="imageUrl"] {
              width: 100%;
              padding: 8px;
              margin-bottom: 10px;
              border: 1px solid #ccc;
              border-radius: 4px;
              box-sizing: border-box;
              transition: border-color 0.3s ease;
          }

          button[type="submit"] {
            background-color: #4CAF50;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }

          button[type="submit"]:hover {
            background-color: #45a049;
          }

          @media (max-width: 767px) {
            form {
              max-width: 100%;
              padding: 10px;
              margin-top: 60px;
            }
          }

          @media (min-width: 768px) and (max-width: 991px) {
            form {
              max-width: 60%;
            }
          }

          @media (min-width: 992px) {
            form {
              max-width: 400px;
            }
          }
        `}
      </style>
      <h1>E-commerce Home Page</h1>
      <ProductForm onAddProduct={addProduct} />
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
    </div>
  );
}

export default App;
