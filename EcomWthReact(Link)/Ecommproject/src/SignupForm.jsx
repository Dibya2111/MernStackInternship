import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!name || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/Userdata');
      const users = await response.json();

      const userExists = users.some(user => user.name === name || user.email === email);
      if (userExists) {
        setError('User with the same name or email already exists.');
        return;
      }

      await fetch('http://localhost:3000/Userdata', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      alert('Signup successful!');
      navigate('/login');
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <>
      {/* <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

          body {
            font-family: 'Poppins', sans-serif;
            margin: 0;
            padding: 0;
            background: linear-gradient(135deg, #ff9a9e, #fad0c4);
            animation: gradientAnimation 10s ease infinite;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }

          @keyframes gradientAnimation {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          .container {
            background-color: rgba(255, 255, 255, 0.8);
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
            max-width: 400px;
            width: 100%;
            position: relative;
            backdrop-filter: blur(10px);
          }

          h2 {
            text-align: center;
            margin-bottom: 30px;
            color: #333;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
          }

          input[type="text"],
          input[type="email"],
          input[type="password"] {
            width: 100%;
            padding: 15px;
            margin-bottom: 20px;
            border: none;
            border-radius: 5px;
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
            background-color: rgba(255, 255, 255, 0.8);
            color: #333;
            font-size: 16px;
            transition: box-shadow 0.3s ease;
          }

          input[type="text"]:focus,
          input[type="email"]:focus,
          input[type="password"]:focus {
            outline: none;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
          }

          button {
            background-color: #2c3e50;
            color: #fff;
            padding: 15px 30px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            width: 100%;
            font-size: 16px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
            transition: background-color 0.3s ease, font-size 0.3s ease;
          }

          button:hover {
            background-color: #e74c3c;
            font-size: 14px;
          }

          .error {
            color: #fff;
            background-color: #f44336;
            padding: 10px;
            border-radius: 5px;
            position: absolute;
            top: -50px;
            left: 50%;
            transform: translateX(-50%);
            animation: slideDown 0.5s ease-in-out;
            z-index: 1;
          }

          @keyframes slideDown {
            0% { top: -100px; opacity: 0; }
            100% { top: -50px; opacity: 1; }
          }

          nav {
            background-color: #333;
            overflow: hidden;
            position: fixed;
            top: 0;
            width: 100%;
            z-index: 1;
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
      </style> */}
      <div className="container">
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit">Signup</button>
        </form>
        {error && <div className="error">{error}</div>}
        <nav>
          <Link to="/">Home</Link>
          <Link to="/add-product">ADD PRODUCT</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup" className="active">Signup</Link>
        </nav>
      </div>
    </>
  );
};

export default SignupForm;
