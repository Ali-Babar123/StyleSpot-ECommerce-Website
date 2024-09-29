import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { CiCircleMinus } from "react-icons/ci";
import { BsPlusCircle } from "react-icons/bs";
import { FaStar } from "react-icons/fa"; 
import { productContext } from './Context/ProductContext';

const SingleProduct = () => {
    const { selectedProduct, cartItems, setCartItems, setNewItemAdded } = useContext(productContext);
    const [quantity, setQuantity] = useState(1);

    const increaseQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    const handleAddToCart = () =>{
        const productInCart = cartItems.find(item => item.id === selectedProduct.id);
        if(productInCart){
            setCartItems(cartItems.map(item => 
                item.id === selectedProduct.id ? {...item, quantity: item.quantity + quantity} : item
            ));
        } else {
            setCartItems([...cartItems, {...selectedProduct, quantity}]);
        }
        setNewItemAdded(true);
    };

    if (!selectedProduct) {
        return <div className="w-full flex justify-center p-32 bg-slate-400 font-bold"><p className="text-3xl">No Product Selected</p></div>;
    }

    return (
        <section className="flex flex-col lg:flex-row items-start p-6 gap-8">
            <div className="lg:w-1/3 w-full mb-6 lg:mb-0">
                <img src={selectedProduct.image} alt="Product Image" className="w-full rounded-lg shadow-lg h-auto" />
            </div>

            <div className="lg:w-2/3 w-full">
                <h2 className="text-4xl lg:text-3xl md:text-2xl font-bold mb-4 text-left">{selectedProduct.title}</h2>
                <p className="text-3xl lg:text-2xl md:text-xl mb-2 text-blue-700 font-semibold font-serif">${selectedProduct.price}</p>
                <div className="flex items-center mb-2">
                    <FaStar className="text-yellow-500 mr-2" />
                    <span className="text-lg lg:text-base md:text-sm font-medium">{selectedProduct.rating?.rate}</span>
                </div>
                <p className="text-xl lg:text-lg mb-3 font-georgia font-semibold">Free Delivery</p>

                {/* Quantity Section */}
                <p className="text-3xl lg:text-2xl md:text-xl mr-4 font-georgia font-semibold mb-4">Select Quantity</p>
                <div className="flex flex-col lg:flex-row items-center mb-6">
                    <div className="flex items-center">
                        <CiCircleMinus className="text-4xl cursor-pointer lg:text-3xl md:text-2xl" onClick={decreaseQuantity} />
                        <p className="text-2xl mx-2 lg:text-xl md:text-lg">{quantity}</p>
                        <BsPlusCircle className="text-3xl cursor-pointer lg:text-2xl md:text-lg" onClick={increaseQuantity} />
                    </div>
                </div>

                {/* Product Description */}
                <div>
                    <h3 className="text-3xl lg:text-2xl md:text-xl font-semibold mb-5">Product Detail</h3>
                    <p className="text-2xl lg:text-xl md:text-lg mb-3 font-semibold font-times">Name: {selectedProduct.title}</p>
                    <p className="text-2xl lg:text-xl md:text-lg mb-3 font-semibold font-times">Category: {selectedProduct.category}</p>
                    <p className="text-lg lg:text-base md:text-sm mb-2 ">
                        {selectedProduct.description}
                    </p>
                </div>
                <button
                    className="w-full h-14 bg-black text-white rounded-full mt-4" 
                    onClick={handleAddToCart} >
                    <NavLink to="/ShoppingCart" className="block w-full h-full text-center leading-[3.5rem]">
                        Add to Cart
                    </NavLink>
                </button>
            </div>
        </section>
    );
};

export default SingleProduct;
