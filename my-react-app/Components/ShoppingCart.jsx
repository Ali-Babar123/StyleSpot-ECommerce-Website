


import React, { useContext, useEffect } from 'react';
import { CiCircleMinus } from "react-icons/ci";
import { BsPlusCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { productContext } from './Context/ProductContext';
import "./Cart.css";
import { NavLink } from 'react-router-dom';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ShoppingCart = () => {
  const { cartItems, setCartItems, newItemAdded, setNewItemAdded } = useContext(productContext);
 

  useEffect(() => {
    if (newItemAdded && cartItems.length > 0) {
      toast.success("Item Added Successfully!");
      setNewItemAdded(false); // Reset the state after showing the alert
    }
  }, [cartItems, newItemAdded]);

  const handleDelete = (id) => {
    const updatedCartItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCartItems);
    
    // Check if cart is empty after update and show toast message immediately
    if (updatedCartItems.length === 0) {
      toast.error("Sorry, no product in the cart!"); 
    } else {
      toast.error("Item removed from cart!");
    }
  };

  const handleIncrement = (id) => {
    const updatedCartItems = cartItems.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCartItems);
    toast.success("Item quantity increased!");
  };

  const handleDecrement = (id) => {
    const updatedCartItems = cartItems.map(item =>
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCartItems(updatedCartItems);

    if (cartItems.find(item => item.id === id && item.quantity > 1)) {
      toast.info("Item quantity decreased!");
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = 0;
  const deliveryCharges = 0;
  const total = subtotal - discount + deliveryCharges;

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="w-full flex justify-center p-32 font-bold">
        <p className="text-3xl">No product in the cart</p>
        {/* Include ToastContainer here to ensure the toast shows when the cart is empty */}
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
  }

  return (
    <div className="cart-container w-full max-w-5xl mx-auto flex flex-col p-20 gap-20 relative">
      {cartItems.map((item, index) => (
        <div key={index} className="flex flex-col lg:flex-row justify-between items-start gap-6">
          <div className="left-part lg:w-1/4 w-full" style={{ border: '2px solid gray' }}>
            <img src={item.image} alt="" className="w-full py-2" />
          </div>
          <div className="detail-part lg:w-4/5 w-full flex flex-col gap-5">
            <h1 className="text-4xl uppercase font-bold">{item.title}</h1>
            <p className="text-2xl font-semibold mt-6" style={{ fontFamily: "-moz-initial" }}>Quantity: {item.quantity}</p>
            <div className="quantity flex items-center justify-between">
              <p className="price text-4xl font-sans font-semibold mt-6" style={{ fontFamily: "-moz-initial" }}>${(item.price * item.quantity).toFixed(2)}</p>
              <MdOutlineDelete className='text-3xl cursor-pointer mt-6' onClick={() => handleDelete(item.id)} />
              <div className="flex items-center gap-2 mr-40">
                <CiCircleMinus className="text-4xl cursor-pointer mt-6" onClick={() => handleDecrement(item.id)} />
                <p className="text-3xl font-semibold mt-6">{item.quantity}</p>
                <BsPlusCircle className="text-3xl cursor-pointer mt-6" onClick={() => handleIncrement(item.id)} />
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="price-container">
        <div className="price-detail-fixed bg-blue-400">
          <h3 className="text-3xl font-bold mb-4 text-black">Price Detail</h3>
          <div className="flex justify-between border-b border-black text-base font-semibold py-4">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-b border-black text-base font-semibold py-4">
            <span>Discount</span>
            <span>${discount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-b border-black text-base font-semibold py-4">
            <span>Delivery Charges</span>
            <span>${deliveryCharges.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-lg font-bold py-4">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <NavLink to='/checkout'>
            <button className='checkout mt-5'>Check out</button>
          </NavLink>
          <div className="cartview">
            View Cart
          </div>
        </div>
      </div>

      {/* ToastContainer for displaying toast messages */}
      <ToastContainer position="top-center"
        autoClose={1000}
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

export default ShoppingCart;
