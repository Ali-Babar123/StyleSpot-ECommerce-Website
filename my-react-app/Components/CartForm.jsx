import React, { useContext, useState, useEffect, useRef } from 'react';
import './CartForm.css';
import Select from "react-select";
import { productContext } from './Context/ProductContext';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const countryOptions = [
  { value: 'usa', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'canada', label: 'Canada' },
  { value: 'australia', label: 'Australia' },
  { value: 'japan', label: 'Japan' },
  { value: 'france', label: 'France' },
  { value: 'germany', label: 'Germany' },
  { value: 'china', label: 'China' },
  { value: 'brazil', label: 'Brazil' },
  { value: 'india', label: 'India' },
  { value: 'pakistan', label: 'Pakistan' },
  { value: 'italy', label: 'Italy' },
  { value: 'spain', label: 'Spain' },
  { value: 'russia', label: 'Russia' },
  { value: 'south_africa', label: 'South Africa' },
];

const CartForm = () => {
  const { cartItems } = useContext(productContext); // Get cartItems from context
  const inputRef = useRef(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [formData, setFormData]  = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
    email: ''
  });

  useEffect(()=>{
    if(inputRef.current){
      inputRef.current.focus();
    }
  }, [])
  
  const handleSelectChange = (selectedCountry) => {
    setSelectedCountry(selectedCountry);
  };
  const handleChange = (e)=>{
    setFormData({...formData, [e.target.name]: e.target.value});
  }
  
  const shippingFee = 200; // Assume a fixed shipping fee of Rs 200
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal + shippingFee;

const handleSubmit = async (e) =>{
  e.preventDefault();

  // const token = localStorage.getItem('auth-token');  // Assuming token is stored in localStorage

  // if (!token) {
  //     console.error("No token found");
  //     return;
  // }

  const cartData = {
    products: cartItems.map(item => ({
      productId: item.id,
      title: item.title,
      price: item.price,
      quantity: item.quantity

    })),
    shippingAddress: {
      ...formData,
      country: selectedCountry ? selectedCountry.value : null
    },
    subtotal,
    shippingFee,
    total
  }
  try {
    const response = await axios.post('http://localhost:3000/api/cart/addcart', cartData,{
      headers: {
        'Content-Type': 'application/json',
        'auth-token': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZkYjBjMGJhMmIxYzJhZGJjNzlhMjBkIn0sImlhdCI6MTcyNTYzMTUzNH0.oHvpchl7jZaLleLr-3UjbeQv57uUBiYUKKcu1W1CXwk`
      }
    })
    toast.success('Order Submitted Successfully!')
    console.log("Order Submitted Successfully!", response.data);

    setFormData({
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      postalCode: '',
      phone: '',
      email: ''
    })
  } catch (error) {
    toast.error('Failed to submit order. Please try again.')
    console.error('Failed to submit order', error.response.data);
  }
 setFormData({
  firstName: '',
  lastName: '',
  address: '',
  city: '',
  postalCode: '',
  phone: '',
  email: ''
}) 
}
  return (

    <div className="cart-form"> 
      <div className="cart-form-left">
        <h1>Contact Details</h1>
        <input type="text" placeholder="Email or mobile phone number" className="input-field" name='email' value={formData.email} onChange={handleChange} required/>
        <div className="checkbox-container">
          <input type="checkbox" id="newsOffers" />
          <label htmlFor="newsOffers" className='ml-2'>Email me with news and offers</label>
        </div>

        <h1>Delivery</h1>
        <div className="delivery-options">
          <label>
            <input type="radio" name="delivery" defaultChecked />
            <span className='ml-1'>Ship</span>
          </label>
          <label>
            <input type="radio" name="delivery" />
            <span className='ml-1'>Pickup in store</span>
          </label>
        </div>

        <Select
          className='mb-4'
          options={countryOptions}
          value={selectedCountry}
          onChange={handleSelectChange}
          placeholder="Select Country"
          isSearchable={true}
          required
        />

        <div className="name-fields">
          <input type="text" placeholder="First name" name="firstName" className="input-field" value={formData.firstName} onChange={handleChange} required/>
          <input type="text" placeholder="Last name" name="lastName" className="input-field" value={formData.lastName} onChange={handleChange} required/>
        </div>

        <input type="text" placeholder="Address" className="input-field" name='address' value={formData.address} onChange={handleChange} required/>
        <input type="text" placeholder="Apartment, suite, etc. (optional)" name='suit' className="input-field" />
        
        

          {/* Hidden Inputs for Subtotal, Shipping, and Total */}
          <input type="hidden" name="subtotal" value={subtotal.toFixed(2)} />
          <input type="hidden" name="shippingFee" value={shippingFee.toFixed(2)} />
          <input type="hidden" name="total" value={total.toFixed(2)} />

        <div className="name-fields">
          <input type='text' placeholder='City' className='input-field' name='city' value={formData.city} onChange={handleChange} required/>
          <input type='text' placeholder='Postal Code' className='input-field'  name='postalCode' value={formData.postalCode} onChange={handleChange} required/>
        </div>
        <input type="text" placeholder='Phone' className='input-field' name='phone' value={formData.phone} onChange={handleChange} required/>
        <div className="checkbox-container">
          <input type="checkbox" id="saveInfo" />
          <label htmlFor="saveInfo" className='ml-2'>Save this information for next time</label>
        </div>
        <h1>Shipping method</h1>
        <input type="text" placeholder='200 Delivery Charges per kilogram' className='input-field font-bold' 
        ref={inputRef} readOnly/>
        <h1>Payment</h1>
        <p className='mb-3'>All transactions are secured and encrypted</p>
        <input type="text" placeholder='Cash On Delivery (COD)' className='input-field font-bold' readOnly/>
        <button className='Order mt-4 font-bold' onClick={handleSubmit}>Complete Order</button>
      </div>
      
      {/* Vertical line added here */}
      <div className="vertical-line"></div>

      <div className="cart-form-right">
        {/* Display cart items and totals here */}
        <div className="cart-summary">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <div className="image-container">
                <img src={item.image} alt={item.title} className="cart-item-image" />
                <span className="quantity-badge">{item.quantity}</span> {/* Display quantity on the image */}
              </div>
              <span className=''>{item.title}</span>
              <span className=''>${(item.price * item.quantity).toFixed(2)}</span> {/* Update the total price per item */}
            </div>
          ))}
          <div className="totals">
            <div className="total"></div>
            <div className='mb-3'><div className="total">Subtotal: <span className=''>${subtotal.toFixed(2)}</span></div></div>
            <div className='mb-3'><div className="total">Shipping: <span className=''>${shippingFee.toFixed(2)}</span></div></div>
            <div className="total font-bold">Total: <span className=''> ${total.toFixed(2)}</span></div>
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
}

export default CartForm;
