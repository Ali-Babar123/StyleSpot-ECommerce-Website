import React, { useContext, useState } from 'react';
import './Signup.css'; // Ensure this path is correct
import { FaFacebookF, FaGoogle, FaLinkedinIn } from 'react-icons/fa';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { productContext } from './Context/productContext';
import logo from '../Components/images/logo.png';

const Signup = () => {
  const { login, setIsLoggedIn } = useContext(productContext);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({ email: credentials.email, password: credentials.password })
      });

      const json = await response.json();
      console.log('API Response:', json); // Log the full response

      if (json.success) {
        localStorage.setItem('token', json.authtoken);
        // Pass the name to the login function
        login(json.authtoken, json.name); 
        navigate('/home');
      } else {
        toast.warn('Invalid Credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="signup-wrapper">
      <div className="container-signup">
        <div className="signin-signup">
          <div className="sign-in">
            <img src={logo} alt="logo" className='w-20'/>
            <h1 className="title text-9xl font-bold text-orange-600">StyleSpot</h1>
            <div className="social-container">
              <Link to="#" className="social"><FaFacebookF /></Link>
              <Link to="#" className="social"><FaGoogle /></Link>
              <Link to="#" className="social"><FaLinkedinIn /></Link>
            </div>
            <span>or use your account</span>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                id="email"
                onChange={onChange}
                value={credentials.email}
                placeholder="Email"
                name="email"
                required
              />
              <input
                type="password"
                id="password"
                onChange={onChange}
                value={credentials.password}
                placeholder="Password"
                name="password"
                required
              />
              <Link to="#" className="forgot-password">Forgot your password?</Link>
              <button type="submit" className="signin-btn">Login</button>
            </form>
          </div>

          <div className="sign-up">
            <h2>Hello, Friend!</h2>
            <p>Enter your personal details and start your journey with us</p>
            <NavLink to='/login' className="signup-btn">
              SIGN UP
            </NavLink>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default Signup;
