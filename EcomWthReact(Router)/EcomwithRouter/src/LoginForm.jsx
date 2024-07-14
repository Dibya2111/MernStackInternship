import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/db.json')
      .then(response => response.json())
      .then(data => setUserData(data.UserData))
      .catch(error => console.error('Error fetching user data:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!username || !email || !password) {
      window.alert('All fields are required');
      return;
    }

    if (!isValidEmail(email)) {
      window.alert('Please enter a valid email address');
      return;
    }

    const user = userData.find(user => 
      user.username === username && 
      user.email === email && 
      user.password === password
    );

    if (user) {
      window.alert('Login successful');
      navigate('/');
    } else {
      window.alert('Login failed. Please sign up.');
    }
  };

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <>
      <style>
        {`
          /* Background Animation */
          @keyframes gradient {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }

          body {
            padding-top: 60px;
            background: linear-gradient(45deg, #ff9a9e, #fad0c4, #ffd1ff);
            background-size: 400% 400%;
            animation: gradient 15s ease infinite;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: Arial, sans-serif;
          }
          nav {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1000;
            background-color: #your-navbar-color;
        }

          /* Form Styling */
          .login-form {
            background-color: rgba(255, 255, 255, 0.8);
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
            max-width: 400px;
            width: 100%;
            transition: transform 0.3s ease-in-out;
          }

          .login-form:hover {
            transform: scale(1.05);
          }

          .form-group {
            margin-bottom: 20px;
          }

          label {
            display: block;
            font-weight: bold;
            margin-bottom: 5px;
          }

          input[type="text"],
          input[type="password"],
          input[type="email"] {
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 16px;
          }

          button[type="submit"] {
            background-color: #ff9a9e;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            transition: background-color 0.3s ease-in-out;
          }

          button[type="submit"]:hover {
            background-color: #5612de;
          }

          /* Center the login button */
          .login-form form {
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .login-form h2 {
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          /* Center the signup prompt */
          #signupPrompt {
            text-align: center;
            margin-top: 20px;
          }

          /* Media queries for responsiveness */
          @media (max-width: 480px) {
            .login-form {
              padding: 20px;
              max-width: 300px;
            }
          }

          @media (max-width: 320px) {
            .login-form {
              padding: 15px;
              max-width: 250px;
            }

            input[type="text"],
            input[type="password"],
            input[type="email"] {
              font-size: 14px;
            }

            button[type="submit"] {
              font-size: 14px;
            }
          }
        `}
      </style>
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <div id="signupPrompt">
          <p>Don't have an account?</p>
          <button onClick={handleSignUp}>Sign Up</button>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
