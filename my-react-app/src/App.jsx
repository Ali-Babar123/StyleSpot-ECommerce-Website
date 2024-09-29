import React from "react";
import HeroSection from "../Components/HeroSection";
import AllProducts from "../Components/AllProducts";
import Mens from "../Components/Mens";
import Womens from "../Components/Womens";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { ProductProvider } from "../Components/Context/ProductContext";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Signup from "../Components/Signup";
import SingleProduct from "../Components/SingleProduct";
import Login from "../Components/Login";
import ShoppingCart from "../Components/ShoppingCart";
import CartForm from "../Components/CartForm";
import { ToastContainer } from 'react-toastify';  // Correct import
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <ProductProvider>
      <Router>
        <MainContent />
        <ToastContainer />  {/* Include ToastContainer once in your App component */}
      </Router>
    </ProductProvider>
  );
}

function MainContent() {
  const location = useLocation();
  const isSignupOrLoginPage = location.pathname === "/" || location.pathname === "/login";

  return (
    <>
      {!isSignupOrLoginPage && <Navbar />}
      <Routes>
        <Route exact path="/checkout" element={<CartForm/>}></Route>
        <Route exact path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/SingleProduct" element={<SingleProduct />} />
        <Route path="/ShoppingCart" element={<ShoppingCart />} />
        <Route path="/home" element={<HeroSection />} />
        <Route path="/allproducts" element={<AllProducts />} />
        <Route path="/mens" element={<Mens />} />
        <Route path="/womens" element={<Womens />} />
      </Routes>
      {!isSignupOrLoginPage && <Footer />}
    </>
  );
}

export default App;
