import React, { useState, useContext, useEffect } from "react";
import { FaWindowClose, FaSearch } from "react-icons/fa";
import { GrCart } from "react-icons/gr";
import { IoMdMenu } from "react-icons/io";
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import "./Navbar.css";
import { productContext } from "./Context/ProductContext";

const Navbar = () => {
    const location = useLocation();
    const [name, setName] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    let navigate = useNavigate();

    const { setSearchTerm, products, cartItems } = useContext(productContext);

    useEffect(() => {
        const retrievedName = localStorage.getItem('name');
        // console.log("Retrieved name from localStorage:", retrievedName);
        setName(retrievedName);
    }, []);

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchInput(value);
        setSearchTerm(value);

        if (value) {
            const filteredSuggestions = products.filter(product =>
                product.title.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchInput(suggestion.title);
        setSearchTerm(suggestion.title);
        setSuggestions([]);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        setName(null);
        navigate('/');
    };

    const isActive = (path) => location.pathname === path ? 'navbar-active' : '';

    return (
        <>
            <nav className="bg-white shadow-md">
                <div className="container mx-auto flex justify-between items-center p-4">
                    <Link to="/home" className="text-3xl font-bold text-orange-600">StyleSpot</Link>
                    <div className="hidden lg:flex space-x-6">
                        <Link to="/home" className={`text-gray-600 hover:text-gray-900 font-bold ${isActive('/home')}`}>Home</Link>
                        <Link to="/allproducts" className={`text-gray-600 hover:text-gray-900 font-bold ${isActive('/allproducts')}`}>All Products</Link>
                        <Link to="/mens" className={`text-gray-600 hover:text-gray-900 font-bold ${isActive('/mens')}`}>Mens</Link>
                        <Link to="/womens" className={`text-gray-600 hover:text-gray-900 font-bold ${isActive('/womens')}`}>Womens</Link>
                    </div>
                    <div className="relative hidden lg:block">
                        <input
                            type="text"
                            value={searchInput}
                            onChange={handleSearch}
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-gray-500"
                            placeholder="Search"
                        />
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                            <FaSearch />
                        </span>
                        {suggestions.length > 0 && (
                            <div className="absolute top-full left-0 w-full bg-white border border-gray-300 mt-1 rounded-md shadow-lg">
                                {suggestions.map(suggestion => (
                                    <div
                                        key={suggestion.id}
                                        className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                                        onClick={() => handleSuggestionClick(suggestion)}
                                    >
                                        {suggestion.title}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="flex items-center space-x-4">
                        {name && <span className="text-gray-700 font-bold">Hello, {name}</span>}
                        <NavLink to="/ShoppingCart" className="text-gray-700 hover:text-gray-900 relative" aria-label="Shopping Cart">
                            <GrCart className="h-6 w-6" />
                            {cartItems.length > 0 && (
                                <span className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center cart-badge">
                                    {cartItems.length}
                                </span>
                            )}
                        </NavLink>
                        <button onClick={handleLogout} className="bg-black text-white px-4 py-2 rounded-full">Logout</button>
                    </div>
                    <div className="lg:hidden">
                        <button onClick={toggleMenu} aria-label="Toggle menu">
                            <IoMdMenu className="h-6 w-6" />
                        </button>
                    </div>
                </div>
                <div id="mobileMenu" className={`lg:hidden ${isMenuOpen ? "block" : "hidden"}`}>
                    <div className="flex justify-between items-center p-4">
                        <span className="text-gray-700 font-bold">Menu</span>
                        <button onClick={toggleMenu} aria-label="Close menu" className="text-gray-700">
                            <FaWindowClose className="h-6 w-6" />
                        </button>
                    </div>
                    <div className="p-4">
                        <div className="relative mb-4">
                            <input
                                type="text"
                                value={searchInput}
                                onChange={handleSearch}
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-gray-500"
                                placeholder="Search"
                            />
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                <FaSearch />
                            </span>
                            {suggestions.length > 0 && (
                                <div className="absolute top-full left-0 w-full bg-white border border-gray-300 mt-1 rounded-md shadow-lg">
                                    {suggestions.map(suggestion => (
                                        <div
                                            key={suggestion.id}
                                            className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                                            onClick={() => handleSuggestionClick(suggestion)}
                                        >
                                            {suggestion.title}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <Link to="/home" className={`block px-4 py-2 text-gray-700 hover:bg-gray-200 ${isActive('/home')}`}>Home</Link>
                        <Link to="/allproducts" className={`block px-4 py-2 text-gray-700 hover:bg-gray-200 ${isActive('/allproducts')}`}>All Products</Link>
                        <Link to="/mens" className={`block px-4 py-2 text-gray-700 hover:bg-gray-200 ${isActive('/mens')}`}>Mens</Link>
                        <Link to="/womens" className={`block px-4 py-2 text-gray-700 hover:bg-gray-200 ${isActive('/womens')}`}>Womens</Link>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
