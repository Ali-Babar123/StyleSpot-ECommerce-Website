import { createContext, useEffect, useState } from "react";
import axios from "axios";

const productContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [mensProducts, setMensProducts] = useState([]);
  const [womensProducts, setWomensProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [newItemAdded, setNewItemAdded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(() => {
    const savedSelectedProduct = localStorage.getItem('selectedProduct');
    return savedSelectedProduct ? JSON.parse(savedSelectedProduct) : null;
  });
  const [cartItems, setCartItems] = useState(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });
  const [token, setToken] = useState(() => {
    return localStorage.getItem('token') || null;
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const login = (userToken, name) => {
    setToken(userToken);
    localStorage.setItem('name', name);
    setIsLoggedIn(true);
  };
  
  const logout = () => {
    setToken(null);
    localStorage.removeItem('name');
    setIsLoggedIn(false);
  };

  useEffect(() => {
    if (selectedProduct) {
      localStorage.setItem("selectedProduct", JSON.stringify(selectedProduct));
    }
  }, [selectedProduct]);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/products')
      .then(res => {
        const data = res.data;
        setProducts(data);
        console.log(data);

        const mens = data.filter(product => product.category === "men's clothing" || product.category === "electronics");
        const womens = data.filter(product => product.category === "women's clothing" || product.category === "jewelery");

        setMensProducts(mens);
        setWomensProducts(womens);
      })
      .catch(error => console.log("Error fetching products", error));
  }, []);

  useEffect(() => {
    const filtered = products.filter(product => product.title.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  return (
    <productContext.Provider value={{
      products, mensProducts, womensProducts, filteredProducts,
      setSearchTerm, selectedProduct, setSelectedProduct,
      cartItems, setCartItems, newItemAdded, setNewItemAdded,
      isLoggedIn, setIsLoggedIn, token, login, logout
    }}>
      {children}
    </productContext.Provider>
  );
};

export { ProductProvider, productContext };
