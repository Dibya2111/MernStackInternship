import { useState } from "react";

function ProductForm() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [rating, setRating] = useState("");
  const [reviewCount, setReviewCount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProduct = {
      title,
      price: parseFloat(price),
      description,
      imageUrl,
      rating: parseFloat(rating),
      reviewCount: parseInt(reviewCount),
    };

    try {
      const response = await fetch('http://localhost:3000/Products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        setTitle("");
        setPrice("");
        setDescription("");
        setImageUrl("");
        setRating("");
        setReviewCount("");
        window.alert("Product added successfully!");
      } else {
        throw new Error('Failed to add product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      window.alert("Failed to add product. Please try again.");
    }
  };

  return (
    <>
      <style>
        {`
        /* Add some basic styles for the form */
        form {
            max-width: 400px;
            margin: 0 auto;
            padding: 20px;
            background-color: #e1b0b0;
            border-radius: 5px;
            margin-top: 100px;
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

        body {
            background-image: url('https://th.bing.com/th/id/R.178662aeb328ff2138591a89ec3ada45?rik=4xWJBnxvT8%2f6kg&riu=http%3a%2f%2fwallpapercave.com%2fwp%2f0dSFyjG.jpg&ehk=94nuM0RM%2bK%2fHwQGEZpmcfp33vUsw5E%2fU3Gc3p6qN8PE%3d&risl=&pid=ImgRaw&r=0');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            background-attachment: fixed;
        }

        @media (max-width: 767px) {
            nav {
                position: static;
            }

            nav a {
                float: none;
                display: block;
                text-align: left;
            }

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
      <form onSubmit={handleSubmit}>
        <h2>Add New Product</h2>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <label>
          Image URL:
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </label>
        <label>
          Rating:
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            step="0.1"
            min="0"
            max="5"
            required
          />
        </label>
        <label>
          Review Count:
          <input
            type="number"
            value={reviewCount}
            onChange={(e) => setReviewCount(e.target.value)}
            required
          />
        </label>
        <button type="submit">Add Product</button>
      </form>
    </>
  );
}

export default ProductForm;
