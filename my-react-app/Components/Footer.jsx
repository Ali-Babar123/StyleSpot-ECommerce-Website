import React from 'react';
import "./Footer.css"
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className=" text-white py-4 flex justify-between items-start footer-container" style={{background: 'rgba(5, 10, 50, 1)'}}>
            
            <div className='mt-2 pl-6  follow-us'>
                <h2 className="text-2xl text-center font-bold mb-4">Follow</h2>
                <div className="flex space-x-4">
                    <Link to="#" className="text-white hover:text-gray-300">
                        <FaFacebookF size={24} />
                    </Link>
                    <Link to="#" className="text-white hover:text-gray-300">
                        <FaInstagram size={24} />
                    </Link>
                    <Link to="#" className="text-white hover:text-gray-300">
                        <FaTwitter size={24} />
                    </Link>
                    <Link to="#" className="text-white hover:text-gray-300">
                        <FaYoutube size={24} />
                    </Link>
                </div>
            </div>

            {/* Right Section */}
            <div className="lg:w-3/5 p-2 flex justify-end flex-col gap-2 sm:w-screen right-section">
                <div className="lg:w-4/5 p-5 flex gap-5 justify-center sm:w-screen">
                <Link to="#" className='font-BebasNeue text-xl text-nowrap"'>NEW ARRIVALS</Link>
                <Link to="#" className="font-BebasNeue text-xl text-nowrap">DISCOUNTS</Link>
                <Link to="#" className="font-BebasNeue text-xl text-nowrap">CONTACT US</Link>
                </div>

                <h3 className="text-xl text-center font-serif">Subscribe to get the latest on sales, new releases, and more..</h3>

                <div className="my-4 flex gap-2 items-center justify-center ms-4 input-container">
                    <input type="text" className="h-14 w-2/4 text-black rounded-full ps-4 text-xl text-center font-bold font-BebasNeue" placeholder='Email' />
                    <button className="w-1/4 rounded-full h-14 bg-red-600 font-semibold hover:bg-red-700 font-serif text-base">Subscribe</button>
                </div>

                <h4 className="text-xl font-serif text-center ms-7 lg:w-3/5">StyleSpot. Powered By <span className='text-red-600'>Daraz.pk</span></h4>
            </div>
        </footer>
    );
};

export default Footer;
