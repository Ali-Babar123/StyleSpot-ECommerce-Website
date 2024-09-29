import React, { useContext, useEffect } from "react";
import shopping from '../Components/images/shopping.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { productContext } from "./Context/productContext";


const HeroSection = () => {
    const {isLoggedIn} = useContext(productContext);
    useEffect(() => {
        if (isLoggedIn) {
            toast.success('You are logged in successfully!');
        }
    }, [isLoggedIn]);

    return (
        <section className="flex flex-col lg:flex-row items-center justify-center lg:gap-10 pt-10 px-6">
            <div className="left-part lg:w-3/5 w-full flex justify-center">
                <img
                    src={shopping}
                    alt="Hero"
                    className="w-4/4 lg:w-4/4 object-cover" // Slightly smaller image
                />
            </div>

            <div className="right-part lg:w-2/5 w-full flex flex-col justify-center gap-5  lg:pt-10 items-center text-center lg:text-left">
                <h1 className="text-7xl lg:text-6xl font-BebasNeue font-bold">
                    Get up to 30% off New Arrivals
                </h1>
                <button className="w-32 lg:w-24 bg-black text-white rounded-full h-10 font-medium mb-3">
                    Shop Now
                </button>
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
        </section>
    );
};

export default HeroSection;
