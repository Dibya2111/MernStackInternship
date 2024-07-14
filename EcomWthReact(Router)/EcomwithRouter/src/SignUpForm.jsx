import React, { useState, useEffect } from 'react';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [users, setUsers] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3000/UserData');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { username, email, password } = formData;
    if (!username || !email || !password) {
      window.alert('All fields are required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      window.alert('Invalid email format');
      return false;
    }
    if (password.length < 6) {
      window.alert('Password must be at least 6 characters long');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const userExists = users.some(
      (user) => user.username === formData.username || user.email === formData.email
    );

    if (userExists) {
      window.alert('User already exists');
    } else {
      try {
        const response = await fetch('http://localhost:3000/UserData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          window.alert('Signup successful');
          setFormData({ username: '', email: '', password: '' });
          fetchUsers();
        } else {
          throw new Error('Signup failed');
        }
      } catch (error) {
        console.error('Error signing up:', error);
        window.alert('An error occurred during signup');
      }
    }
  };

  return (
    <>
      <style>
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

          @media (max-width: 480px) {
            .container {
              max-width: 300px;
            }
          }
        `}
      </style>
      <div className="container">
        <form id="signupForm" onSubmit={handleSubmit}>
          <h2>Sign Up</h2>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </>
  );
};

export default SignUpForm;
