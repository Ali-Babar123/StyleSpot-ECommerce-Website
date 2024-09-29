


import React, { useState } from 'react';
import { FaFacebookF, FaGoogle, FaLinkedinIn } from 'react-icons/fa';
import "./login.css"; // Ensure this path is correct
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../Components/images/logo.png'

const Login = () => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
  const { name, email, password } = credentials;
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/auth/createuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({ name, email, password })
      });

      const json = await response.json();
      console.log(json);

      // Handle login success or failure based on the response
      if (json.success) {
        // Redirect or show success message
        localStorage.setItem('token', json.authtoken);
        navigate('/home');
      } else {
        toast.error('Invalid Credentials')
      }
    } catch (error) {
      console.error('Error during Signup:', error);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="login-wrapper">
        <div className="container-login">
          <div className="login-logup">
            <div className="log-up">
              <h1>Welcome Back!</h1>
              <p>Enter your personal details and start your journey with us</p>
              <NavLink to='/' className="logup-button">
                <button className='button'>SIGN IN</button>
              </NavLink>
            </div>
            <div className="log-in">
              {/* <h1 className='title'>Create Account</h1> */}
              <img src={logo} alt="logo" className='w-20'/>
              {/* <h2 className="title text-2xl font-bold text-orange-600">StyleSpot</h2> */}
              <div className="social-container">
                <Link to="#" className='social'><FaFacebookF /></Link>
                <Link to="#" className='social'><FaGoogle /></Link>
                <Link to="#" className='social'><FaLinkedinIn /></Link>
              </div>
              <span className='text-xl text-slate-600 font-medium' >Create an Account</span>
              <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Name' name='name' id='name' onChange={onChange} required/>
                <input type="email" placeholder="Email" name='email' id='email' onChange={onChange} required/>
                <input type="password" placeholder="Password" name='password' id='password' onChange={onChange} minLength={5} required/>
                <input type="password" placeholder="Confirm Password" name='cpassword' id='cpassword' onChange={onChange} minLength={5} required/>
                <button type="submit" className='login-button'>SIGN UP</button>
              </form>
            </div>
          </div>
        </div>
      </div>
       {/* ToastContainer for displaying toast messages */}
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

export default Login;